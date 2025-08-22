import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

// Configure which paths to apply rate limiting to
const RATE_LIMIT_PATHS = [
  '/api/projects',
  '/api/blog',
  '/api/contact',
  '/api/skills',
  '/api/personal-info',
];

// Different rate limit configs for different paths
const pathConfigs = {
  '/api/contact': { interval: 60, limit: 5 },    // 5 requests per minute for contact form
  '/api/blog': { interval: 60, limit: 30 },      // 30 requests per minute for blog
  '/api/projects': { interval: 60, limit: 60 },  // 60 requests per minute for projects
  default: { interval: 60, limit: 100 }          // default rate limit
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only apply rate limiting to API routes
  if (!path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip rate limiting for certain paths if needed
  if (path.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  try {
    // Get appropriate rate limit config for the path
    const config = pathConfigs[path as keyof typeof pathConfigs] || pathConfigs.default;
    
    // Apply rate limiting
    const rateLimitResult = await rateLimit(request, config);
    
    // If rate limit response returned, rate limit was exceeded
    if (rateLimitResult instanceof NextResponse) {
      return rateLimitResult;
    }

    // Add rate limit headers to the response
    const response = NextResponse.next();
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // Allow request through if middleware fails
    return NextResponse.next();
  }
}

export const config = {
  matcher: RATE_LIMIT_PATHS
};
