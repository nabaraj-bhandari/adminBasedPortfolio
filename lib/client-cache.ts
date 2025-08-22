import { useEffect, useState } from 'react';

interface CacheConfig {
  key: string;
  maxAge?: number; // in seconds, default 1 hour
}

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export class ClientCache {
  static set<T>(key: string, data: T, maxAge: number = 3600): void {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  static get<T>(key: string, maxAge: number = 3600): T | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const age = (Date.now() - cacheData.timestamp) / 1000;

      if (age > maxAge) {
        localStorage.removeItem(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      return null;
    }
  }

  static invalidate(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }

  static invalidatePattern(pattern: RegExp): void {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && pattern.test(key)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error invalidating cache pattern:', error);
    }
  }
}

// Custom hook for using cached data
export function useCachedData<T>(config: CacheConfig, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get from cache first
        const cached = ClientCache.get<T>(config.key, config.maxAge);
        if (cached) {
          setData(cached);
          setLoading(false);
          
          // Revalidate in background
          try {
            const fresh = await fetcher();
            if (JSON.stringify(fresh) !== JSON.stringify(cached)) {
              ClientCache.set(config.key, fresh, config.maxAge);
              setData(fresh);
            }
          } catch (error) {
            console.error('Background revalidation failed:', error);
          }
        } else {
          // Nothing in cache, fetch fresh data
          const fresh = await fetcher();
          ClientCache.set(config.key, fresh, config.maxAge);
          setData(fresh);
          setLoading(false);
        }
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [config.key, config.maxAge]);

  return { data, loading, error };
}
