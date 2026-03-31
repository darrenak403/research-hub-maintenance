import type { Metadata } from "next";
import { Open_Sans, Quicksand } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Maintenance RBL Client",
  description: "Maintenance RBL Client application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${openSans.variable} ${quicksand.variable} min-h-dvh antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
