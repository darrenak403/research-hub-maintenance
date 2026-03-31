"use client";

import { useServerCheck } from "@/hooks/useServerCheck";

export default function MaintenancePage() {
  useServerCheck();

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-12 text-center">
    </main>
  );
}
