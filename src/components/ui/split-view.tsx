"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SplitViewProps {
  before: {
    label?: string;
    children: React.ReactNode;
  };
  after: {
    label?: string;
    children: React.ReactNode;
  };
  className?: string;
}

export function SplitView({ before, after, className }: SplitViewProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <div className="space-y-2">
        <Badge
          variant="outline"
          className="text-red-500 border-red-500/30 bg-red-500/5"
        >
          {before.label || "Before"}
        </Badge>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          {before.children}
        </div>
      </div>
      <div className="space-y-2">
        <Badge
          variant="outline"
          className="text-green-500 border-green-500/30 bg-green-500/5"
        >
          {after.label || "After"}
        </Badge>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          {after.children}
        </div>
      </div>
    </div>
  );
}
