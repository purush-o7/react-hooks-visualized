import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-5 rounded-full" />
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-16 ml-auto rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function SkeletonCodeBlock() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden my-4">
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="size-5 rounded" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-3.5 w-5/6" />
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3.5 w-3/5" />
      </div>
    </div>
  );
}

function SkeletonPage() {
  return (
    <div className="max-w-3xl space-y-12 animate-pulse">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <SkeletonCodeBlock />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonCodeBlock, SkeletonPage };
