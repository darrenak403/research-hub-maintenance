"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  detail?: string;
  onRetry?: () => void;
}

function ErrorState({ className, message, detail, onRetry, ...props }: ErrorStateProps) {
  return (
    <div
      className={cn("flex min-h-screen items-center justify-center bg-muted/30", className)}
      {...props}
    >
      <Card className="mx-auto max-w-md text-center shadow-md">
        <CardContent className="p-8">
          <div className="mb-4 text-5xl text-destructive">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            {message || "Có lỗi xảy ra"}
          </h2>
          {detail && <p className="mb-2 text-muted-foreground">{detail}</p>}
          <p className="mb-6 text-muted-foreground">Không thể tải dữ liệu. Vui lòng thử lại.</p>
          <div className="flex justify-center gap-3">
            {onRetry && <Button onClick={onRetry}>Thử lại</Button>}
            <Button variant="outline" asChild>
              <Link href="/">Về trang chủ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex min-h-screen items-center justify-center bg-muted/30", className)}
      {...props}
    >
      <Card className="mx-auto w-full max-w-sm text-center shadow-md">
        <CardContent className="p-8">
          <div className="mb-4 text-6xl text-muted-foreground">🏠</div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Chưa có dữ liệu</h2>
          <p className="mb-6 text-muted-foreground">
            Thêm nội dung hoặc quay lại sau khi có dữ liệu.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingSkeleton({
  className,
  propertyCount = 3,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { propertyCount?: number }) {
  return (
    <div className={cn("min-h-screen bg-muted/30", className)} {...props}>
      <div className="container mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(propertyCount)].map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-4 p-4">
                <Skeleton className="h-40 w-full rounded" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ErrorState, EmptyState, LoadingSkeleton };
