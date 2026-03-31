"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
  onError?: () => void;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  priority,
  fallbackSrc = "/banner_website.jpg",
  onError,
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [useRegularImg, setUseRegularImg] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setUseRegularImg(false);
  }, [src]);

  const handleImageError = () => {
    onError?.();

    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      setUseRegularImg(true);
    }
  };

  const isExternalUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  };

  if (useRegularImg || (typeof window !== "undefined" && isExternalUrl(imageSrc))) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(fill ? "absolute inset-0 h-full w-full object-cover" : "", className)}
        onError={handleImageError}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      priority={priority}
      onError={handleImageError}
    />
  );
}
