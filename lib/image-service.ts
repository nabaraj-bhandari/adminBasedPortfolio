import { ImageResponse } from 'next/server';

export const optimizeImage = async (src: string, width: number, quality = 75) => {
  try {
    const params = new URLSearchParams({
      w: width.toString(),
      q: quality.toString(),
      url: src,
    });

    return `/_next/image?${params.toString()}`;
  } catch (error) {
    console.error('Image optimization error:', error);
    return src;
  }
};

export const preloadImage = (src: string) => {
  if (typeof window !== 'undefined') {
    const img = new Image();
    img.src = src;
  }
};
