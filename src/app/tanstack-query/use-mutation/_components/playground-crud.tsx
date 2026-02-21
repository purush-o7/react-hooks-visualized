"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import { Loader2, Trash2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
}

const code = `const queryClient = useQueryClient();

const createMutation = useMutation({
  mutationFn: (title: string) =>
    fetch("/api/posts", { method: "POST", body: JSON.stringify({ title }) })
      .then(r => r.json()),
  onSuccess: (newPost) => {
    // Update cache directly — no refetch needed!
    queryClient.setQueryData(["my-posts"], (old: Post[]) =>
      [...old, newPost]
    );
  },
});

const deleteMutation = useMutation({
  mutationFn: (id: number) =>
    fetch(\`/api/posts/\${id}\`, { method: "DELETE" }),
  onSuccess: (_, deletedId) => {
    queryClient.setQueryData(["my-posts"], (old: Post[]) =>
      old.filter(p => p.id !== deletedId)
    );
  },
});`;

export function PlaygroundCrud() {
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery<Post[]>({
    queryKey: ["my-posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=3").then((r) =>
        r.json()
      ),
    select: (data) => data.map((p) => ({ id: p.id, title: p.title })),
  });

  const createMutation = useMutation({
    mutationFn: (title: string) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, userId: 1 }),
      }).then((r) => r.json()),
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(["my-posts"], (old: Post[] | undefined) => [
        ...(old || []),
        { id: newPost.id, title: newPost.title },
      ]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["my-posts"], (old: Post[] | undefined) =>
        (old || []).filter((p) => p.id !== deletedId)
      );
    },
  });

  function handleCreate() {
    if (!input.trim()) return;
    createMutation.mutate(input.trim());
    setInput("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🗑️</span>
          CRUD Posts
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Cache Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="New post title..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <Button onClick={handleCreate} disabled={createMutation.isPending}>
            {createMutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </div>

        <div className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <span className="font-mono text-xs text-muted-foreground">
                #{post.id}
              </span>
              <span className="flex-1 text-sm">{post.title}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Create and delete update the cache directly — no refetch needed!
        </p>

        <CodeBlock code={code} filename="crud-mutations.tsx" />
      </CardContent>
    </Card>
  );
}
