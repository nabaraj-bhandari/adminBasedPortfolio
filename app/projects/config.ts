import { unstable_cache } from 'next/cache';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 3600; // revalidate the data at most every hour
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export const maxDuration = 60;
