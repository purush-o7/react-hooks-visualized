"use client";

import { useQuery } from "@tanstack/react-query";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Loader2 } from "lucide-react";

const queryCode = `const { data, isPending, isError, error, refetch } = useQuery({
  queryKey: ["post", 1],
  queryFn: () =>
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => res.json()),
});

// That's it! Loading, error, caching, refetching — all handled.
// Navigate away and come back? Data is cached. Instant.`;

export function QueryFetch() {
  const { data, isPending, isError, error, refetch, isFetching, isStale } =
    useQuery({
      queryKey: ["post", 1],
      queryFn: () =>
        fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
          res.json()
        ),
    });

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            ELEGANT
          </Badge>
          <Badge variant="outline" className="text-xs">
            {isStale ? "Stale" : "Fresh"}
          </Badge>
          {isFetching && (
            <Badge variant="outline" className="text-xs">
              <Loader2 className="size-3 animate-spin mr-1" />
              Fetching
            </Badge>
          )}
        </div>

        <div className="rounded-lg bg-muted/30 p-4 space-y-2 min-h-[100px]">
          {isPending && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading...
            </div>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              Error: {(error as Error).message}
            </p>
          )}
          {data && (
            <div>
              <p className="font-medium text-sm">{data.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {data.body.slice(0, 100)}...
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
          >
            Refetch (built-in!)
          </Button>
        </div>

        <p className="text-center text-sm text-green-600 dark:text-green-400">
          One hook. Auto caching, loading states, error handling, and
          background refetching — all built in.
        </p>

        <CodeBlock code={queryCode} filename="query-fetch.tsx" />
      </div>
    </GlowCard>
  );
}
