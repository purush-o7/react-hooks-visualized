"use client";

import { useState, useEffect } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const manualCode = `function ManualFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // 3 useState + useEffect + error handling + loading
  // And we haven't even handled: caching, refetching,
  // stale data, race conditions...
}`;

export function ManualFetch() {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((post) => {
        setData(post);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  function handleRefetch() {
    setError(null);
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((post) => {
        setData(post);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            PAINFUL
          </Badge>
          <span className="text-sm text-muted-foreground">
            3 useState + useEffect + manual error handling
          </span>
        </div>

        <div className="rounded-lg bg-muted/30 p-4 space-y-2 min-h-[100px]">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading...
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500">Error: {error}</p>
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
          <Button variant="outline" size="sm" onClick={handleRefetch}>
            Refetch (duplicate code!)
          </Button>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              What&apos;s missing from this approach?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                This works... but there&apos;s no caching (navigating away and
                back fetches again), no automatic refetching, no stale data
                handling, and refetch logic is duplicated.
              </p>
              <p className="font-medium text-foreground">
                What if one hook handled all of that?
              </p>
              <CodeBlock code={manualCode} filename="manual-fetch.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
