import { useState, useEffect } from "react";
import Image from "next/image";
import { optimizeImage, preloadImage } from "@/lib/image-service";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
}: OptimizedImageProps) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    const optimize = async () => {
      const optimized = await optimizeImage(src, width, quality);
      setOptimizedSrc(optimized);

      if (priority) {
        preloadImage(optimized);
      }
    };

    optimize();
  }, [src, width, quality, priority]);

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={quality}
    />
  );
}
