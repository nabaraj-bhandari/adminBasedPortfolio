import useSWR from 'swr';
import { ClientCache } from '@/lib/client-cache';
import { apiService } from '@/lib/api-service';
import { PersonalInfo, Project, BlogPost, Skill } from '@/types';

// Cache configuration for different data types
const cacheConfig = {
  personalInfo: { maxAge: 3600 },      // 1 hour
  projects: { maxAge: 1800 },          // 30 minutes
  blogPosts: { maxAge: 300 },          // 5 minutes
  skills: { maxAge: 3600 },            // 1 hour
  featuredProjects: { maxAge: 1800 },  // 30 minutes
};

// SWR configuration
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
};

// Custom fetcher that uses cache
const createCachedFetcher = <T>(key: string, maxAge: number, apiFn: () => Promise<T>) => {
  return async () => {
    // Try to get from cache first
    const cached = ClientCache.get<T>(key, maxAge);
    if (cached) return cached;

    // If not in cache or expired, fetch fresh data
    const data = await apiFn();
    ClientCache.set(key, data, maxAge);
    return data;
  };
};

// Custom hooks for each data type
export function usePersonalInfo() {
  const { data, error, isLoading, mutate } = useSWR(
    'personalInfo',
    createCachedFetcher(
      'personalInfo',
      cacheConfig.personalInfo.maxAge,
      apiService.getPersonalInfo
    ),
    swrConfig
  );

  return {
    personalInfo: data as PersonalInfo | null,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useProjects() {
  const { data, error, isLoading, mutate } = useSWR(
    'projects',
    createCachedFetcher(
      'projects',
      cacheConfig.projects.maxAge,
      apiService.getProjects
    ),
    swrConfig
  );

  return {
    projects: data as Project[] | null,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useBlogPosts() {
  const { data, error, isLoading, mutate } = useSWR(
    'blogPosts',
    createCachedFetcher(
      'blogPosts',
      cacheConfig.blogPosts.maxAge,
      apiService.getBlogPosts
    ),
    swrConfig
  );

  return {
    blogPosts: data as BlogPost[] | null,
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useSkills() {
  const { data, error, isLoading, mutate } = useSWR(
    'skills',
    createCachedFetcher(
      'skills',
      cacheConfig.skills.maxAge,
      apiService.getSkills
    ),
    swrConfig
  );

  return {
    skills: data as Skill[] | null,
    isLoading,
    error,
    refresh: mutate,
  };
}

// Utility function to invalidate specific cache entries
export const invalidateCache = {
  all: () => {
    ClientCache.invalidatePattern(/^(personalInfo|projects|blogPosts|skills)/);
  },
  personalInfo: () => ClientCache.invalidate('personalInfo'),
  projects: () => ClientCache.invalidate('projects'),
  blogPosts: () => ClientCache.invalidate('blogPosts'),
  skills: () => ClientCache.invalidate('skills'),
};
