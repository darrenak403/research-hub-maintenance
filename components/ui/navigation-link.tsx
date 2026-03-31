"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { useNavigationProgressContext } from "@/components/providers/navigation-progress-provider";

export type NavigationLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: React.ReactNode;
    showProgress?: boolean;
    progressDelay?: number;
  };

export function NavigationLink({
  href,
  children,
  showProgress = true,
  progressDelay = 0,
  onClick,
  ...props
}: NavigationLinkProps) {
  const { startNavigation } = useNavigationProgressContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !showProgress) return;
    if (progressDelay > 0) {
      window.setTimeout(() => startNavigation(), progressDelay);
    } else {
      startNavigation();
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export type EnhancedNavigationLinkProps = NavigationLinkProps & {
  onNavigationStart?: () => void;
  onNavigationComplete?: () => void;
  progressType?: "immediate" | "delayed" | "on-hover";
};

export function EnhancedNavigationLink({
  onNavigationStart,
  onNavigationComplete,
  progressType = "immediate",
  progressDelay = 0,
  onClick,
  onMouseEnter,
  ...props
}: EnhancedNavigationLinkProps) {
  const { startNavigation, completeNavigation } = useNavigationProgressContext();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    onNavigationStart?.();
    if (progressType === "immediate") {
      startNavigation();
    } else if (progressType === "delayed") {
      window.setTimeout(() => startNavigation(), progressDelay);
    }
    onNavigationComplete?.();
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(e);
    if (progressType === "on-hover") {
      startNavigation();
    }
  };

  return <Link {...props} onClick={handleClick} onMouseEnter={handleMouseEnter} />;
}
