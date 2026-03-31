"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

type NavigationProgressContextValue = {
  isNavigating: boolean;
  progress: number;
  startNavigation: () => void;
  completeNavigation: () => void;
};

const NavigationProgressContext = React.createContext<NavigationProgressContextValue | null>(
  null
);

export function useNavigationProgressContext() {
  const ctx = React.useContext(NavigationProgressContext);
  if (!ctx) {
    return {
      isNavigating: false,
      progress: 0,
      startNavigation: () => {},
      completeNavigation: () => {},
    };
  }
  return ctx;
}

export function NavigationProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstPath = React.useRef(true);

  const clearTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const completeNavigation = React.useCallback(() => {
    clearTimer();
    setProgress(100);
    window.setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 200);
  }, [clearTimer]);

  React.useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    completeNavigation();
  }, [pathname, completeNavigation]);

  const startNavigation = React.useCallback(() => {
    clearTimer();
    setIsNavigating(true);
    setProgress(15);
    intervalRef.current = setInterval(() => {
      setProgress((p) => (p < 88 ? p + Math.random() * 12 : p));
    }, 180);
  }, [clearTimer]);

  React.useEffect(() => () => clearTimer(), [clearTimer]);

  const value = React.useMemo(
    () => ({
      isNavigating,
      progress,
      startNavigation,
      completeNavigation,
    }),
    [isNavigating, progress, startNavigation, completeNavigation]
  );

  return (
    <NavigationProgressContext.Provider value={value}>{children}</NavigationProgressContext.Provider>
  );
}
