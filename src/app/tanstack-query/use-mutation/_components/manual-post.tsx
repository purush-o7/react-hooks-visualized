"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

const manualCode = `async function handleSubmit() {
  setIsLoading(true);
  setError(null);
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    setResult(data);
    setIsLoading(false);
    // Don't forget to invalidate any cached lists!
    // ...but how? We'd need to manage that ourselves.
  } catch (err) {
    setError(err.message);
    setIsLoading(false);
    // No retry. No rollback. No nothing.
  }
}`;

export function ManualPost() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: number; title: string } | null>(null);

  async function handleSubmit() {
    if (!title.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: "Demo post", userId: 1 }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      const data = await res.json();
      setResult(data);
      setTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            MESSY
          </Badge>
          <span className="text-sm text-muted-foreground">
            Manual loading, error, success state
          </span>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500">Error: {error}</p>
        )}
        {result && (
          <div className="rounded-lg bg-muted/30 p-3 text-sm">
            Created post #{result.id}: {result.title}
          </div>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              What&apos;s wrong with this approach?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                We manually manage loading, error, and success states. There&apos;s
                no retry on failure, no cache invalidation, and no way to
                handle optimistic updates.
              </p>
              <p className="font-medium text-foreground">
                What if mutations were as elegant as queries?
              </p>
              <CodeBlock code={manualCode} filename="manual-post.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
