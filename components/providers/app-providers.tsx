"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AppBackground } from "@/components/providers/app-background";
import {
  NavigationProgressProvider,
  useNavigationProgressContext,
} from "@/components/providers/navigation-progress-provider";
import { NavigationProgress } from "@/components/ui/navigation-progress";

function NavigationProgressBar() {
  const { isNavigating, progress } = useNavigationProgressContext();
  return <NavigationProgress isNavigating={isNavigating} progress={progress} />;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NavigationProgressProvider>
        <AppBackground />
        <NavigationProgressBar />
        {children}
        <Toaster closeButton position="bottom-center" />
      </NavigationProgressProvider>
    </ThemeProvider>
  );
}
