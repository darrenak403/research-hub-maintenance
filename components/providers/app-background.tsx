"use client";

import * as React from "react";
import { useMobile } from "@/hooks/useMobile";

const DESKTOP = 'url("/background.png")';
const MOBILE = 'url("/mobile-background.png")';

/**
 * Đồng bộ `--app-background-image` trên <html> với {@link useMobile}.
 * CSS trong globals.css có @media cùng breakpoint để giảm flash trước khi hydrate.
 */
export function AppBackground() {
  const isMobile = useMobile();

  React.useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--app-background-image",
      isMobile ? MOBILE : DESKTOP
    );
  }, [isMobile]);

  return null;
}
