"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import { Loader2 } from "lucide-react";

const mutationCode = `const mutation = useMutation({
  mutationFn: (title: string) =>
    fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title }),
    }).then(res => res.json()),
  onSuccess: (data) => {
    console.log("Created!", data);
    // queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
  onError: (error) => {
    console.error("Failed:", error);
  },
});

// Usage: mutation.mutate("My new post");
// Built-in: isPending, isError, isSuccess, data, error`;

export function MutationPost() {
  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: (newTitle: string) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, body: "Demo post", userId: 1 }),
      }).then((res) => res.json()),
  });

  function handleSubmit() {
    if (!title.trim()) return;
    mutation.mutate(title.trim());
    setTitle("");
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            CLEAN
          </Badge>
          <Badge variant="outline" className="text-xs font-mono">
            {mutation.status}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>

        {mutation.isError && (
          <p className="text-sm text-red-500">
            Error: {mutation.error.message}
          </p>
        )}
        {mutation.isSuccess && (
          <div className="rounded-lg bg-green-500/10 p-3 text-sm">
            Created post #{mutation.data.id}: {mutation.data.title}
          </div>
        )}

        <p className="text-center text-sm text-green-600 dark:text-green-400">
          One hook. Status tracking, callbacks, error handling — all built in.
        </p>

        <CodeBlock code={mutationCode} filename="mutation-post.tsx" />
      </div>
    </GlowCard>
  );
}
