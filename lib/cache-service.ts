import { unstable_cache } from 'next/cache';

export async function getCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options = {
    revalidate: 3600, // 1 hour default
    tags: [] as string[]
  }
) {
  return unstable_cache(
    async () => {
      try {
        return await fetchFn();
      } catch (error) {
        console.error(`Cache fetch error for key ${key}:`, error);
        throw error;
      }
    },
    [key],
    {
      revalidate: options.revalidate,
      tags: options.tags
    }
  )();
}

export function createCacheKey(...parts: (string | number)[]) {
  return parts.join(':');
}
