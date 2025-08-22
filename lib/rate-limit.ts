import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface RateLimitConfig {
  interval: number; // in seconds
  limit: number;
}

const defaultConfig: RateLimitConfig = {
  interval: 60, // 1 minute
  limit: 60 // 60 requests per minute
};

// In-memory store for rate limiting
// In production, you might want to use Redis or another persistent store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const store = rateLimitStore.get(ip);
  
  if (!store || store.resetTime <= now) {
    return { count: 0, resetTime: now + (defaultConfig.interval * 1000) };
  }
  
  return store;
}

export async function rateLimit(
  req: NextRequest,
  config: RateLimitConfig = defaultConfig
) {
  try {
    // Get client IP
    const ip = req.ip || 'anonymous';
    const now = Date.now();
    
    let clientRateLimit = rateLimitStore.get(ip);
    
    // Reset rate limit if interval has passed
    if (!clientRateLimit || clientRateLimit.resetTime <= now) {
      clientRateLimit = {
        count: 0,
        resetTime: now + (config.interval * 1000)
      };
    }
    
    // Increment request count
    clientRateLimit.count++;
    rateLimitStore.set(ip, clientRateLimit);
    
    // Check if rate limit exceeded
    if (clientRateLimit.count > config.limit) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: {
            'Retry-After': `${Math.ceil((clientRateLimit.resetTime - now) / 1000)}`,
            'X-RateLimit-Limit': `${config.limit}`,
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': `${Math.ceil(clientRateLimit.resetTime / 1000)}`,
          },
        }
      );
    }
    
    // Return rate limit headers
    return {
      headers: {
        'X-RateLimit-Limit': `${config.limit}`,
        'X-RateLimit-Remaining': `${config.limit - clientRateLimit.count}`,
        'X-RateLimit-Reset': `${Math.ceil(clientRateLimit.resetTime / 1000)}`,
      },
    };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Allow request through if rate limiting fails
    return { headers: {} };
  }
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  Array.from(rateLimitStore.keys()).forEach(ip => {
    const data = rateLimitStore.get(ip);
    if (data && data.resetTime <= now) {
      rateLimitStore.delete(ip);
    }
  });
}, 60000); // Clean up every minute
