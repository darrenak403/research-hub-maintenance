"use client";

import { cn } from "@/lib/utils";

export function NavigationProgress({
  isNavigating,
  progress,
  className,
}: {
  isNavigating: boolean;
  progress: number;
  className?: string;
}) {
  if (!isNavigating && progress === 0) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[100] h-1 bg-muted/30",
        className
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary shadow-sm transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(100, progress)}%` }}
      />
    </div>
  );
}

export function NavigationProgressAdvanced({
  isNavigating,
  className,
}: {
  isNavigating: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 right-0 top-0 z-[100] h-1 overflow-hidden bg-muted/20",
        className
      )}
    >
      <div
        className={cn(
          "h-full w-full bg-gradient-to-r from-primary via-secondary to-primary transition-opacity duration-300",
          isNavigating ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
