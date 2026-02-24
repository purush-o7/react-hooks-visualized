"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
}

const TOTAL_PAGES = 20;

const code = `const [page, setPage] = useState(1);

const { data, isPlaceholderData, isFetching } = useQuery({
  queryKey: ["posts", "paginated", page],
  queryFn: () =>
    fetch(\`https://jsonplaceholder.typicode.com/posts?_page=\${page}&_limit=5\`)
      .then(res => res.json()),
  placeholderData: keepPreviousData,
  // Keeps the old page visible while the new page loads
  // Each page number = unique cache entry
});`;

export function PlaygroundPagination() {
  const [page, setPage] = useState(1);

  const { data, isPending, isPlaceholderData, isFetching } = useQuery<Post[]>({
    queryKey: ["posts", "paginated", page],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
      ).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          Paginated Posts
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Pagination
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Each page is a separate cache entry. Navigate back to a visited page
          — it loads instantly from cache.
        </p>

        {isPending ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
            <Loader2 className="size-4 animate-spin" />
            Loading posts...
          </div>
        ) : (
          <div
            className={`space-y-2 transition-opacity ${
              isPlaceholderData ? "opacity-50" : "opacity-100"
            }`}
          >
            {data?.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border p-3 text-sm"
              >
                <span className="font-mono text-xs text-muted-foreground mr-2">
                  #{post.id}
                </span>
                {post.title}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Prev
          </Button>
          <span className="text-sm text-muted-foreground font-mono">
            Page {page} of {TOTAL_PAGES}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={isPlaceholderData || page === TOTAL_PAGES}
          >
            Next →
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          {isFetching ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <div className="size-2 rounded-full bg-green-500" />
              From cache
            </>
          )}
        </div>

        <CodeBlock code={code} filename="paginated-posts.tsx" />
      </CardContent>
    </Card>
  );
}
