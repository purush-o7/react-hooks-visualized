"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const code = `const { data: posts, isPending } = useQuery({
  queryKey: ["posts"],
  queryFn: () =>
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then(res => res.json()),
});

// Click a post → new query with different key
const { data: detail } = useQuery({
  queryKey: ["post", selectedId],
  queryFn: () => fetch(\`/posts/\${selectedId}\`).then(r => r.json()),
  enabled: !!selectedId,  // only fetch when ID is set
});`;

export function PlaygroundPosts() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: posts,
    isPending,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=5").then(
        (res) => res.json()
      ),
  });

  const { data: detail, isPending: detailPending } = useQuery<Post>({
    queryKey: ["post", selectedId],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedId}`
      ).then((res) => res.json()),
    enabled: !!selectedId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Post Viewer
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Basic Query
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4 justify-center">
            <Loader2 className="size-4 animate-spin" />
            Loading posts...
          </div>
        ) : (
          <div className="space-y-2">
            {posts?.map((post) => (
              <button
                key={post.id}
                className={`w-full text-left rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50 ${
                  selectedId === post.id ? "border-primary bg-muted/50" : ""
                }`}
                onClick={() => setSelectedId(post.id)}
              >
                <span className="font-mono text-xs text-muted-foreground mr-2">
                  #{post.id}
                </span>
                {post.title}
              </button>
            ))}
          </div>
        )}

        {selectedId && (
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            {detailPending ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Loading detail...
              </div>
            ) : (
              detail && (
                <>
                  <p className="font-medium">{detail.title}</p>
                  <p className="text-sm text-muted-foreground">{detail.body}</p>
                </>
              )
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedId(null)}
            >
              Close
            </Button>
          </div>
        )}

        <CodeBlock code={code} filename="post-viewer.tsx" />
      </CardContent>
    </Card>
  );
}
