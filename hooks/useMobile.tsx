import * as React from "react";

/** Giống Tailwind `md:` — viewport &lt; 768px được coi là mobile. */
export const MOBILE_BREAKPOINT = 768;

const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

/** SSR / server: giả định desktop (ảnh desktop). */
function getServerSnapshot() {
  return false;
}

/**
 * `true` khi viewport &lt; MOBILE_BREAKPOINT (đồng bộ với `matchMedia`).
 * Dùng `useSyncExternalStore` để tránh lệch trạng thái khi resize.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useMobile() {
  return useIsMobile();
}
