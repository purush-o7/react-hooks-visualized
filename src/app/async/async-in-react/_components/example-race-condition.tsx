"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const queries = ["a", "ab", "abc"];
const results: Record<string, { data: string; delay: number }> = {
  a: { data: 'Results for "a": [Apple, Avocado, Artichoke]', delay: 1500 },
  ab: { data: 'Results for "ab": [Abstract, Absorb]', delay: 800 },
  abc: { data: 'Results for "abc": [ABCNews, Abacus]', delay: 400 },
};

export function ExampleRaceCondition() {
  const [unsafeResult, setUnsafeResult] = useState("");
  const [safeResult, setSafeResult] = useState("");
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setUnsafeResult("");
    setSafeResult("");
    setRunning(false);
  };

  const runDemo = () => {
    reset();
    setRunning(true);
    setUnsafeResult("Typing: a -> ab -> abc...");
    setSafeResult("Typing: a -> ab -> abc...");

    // Simulate rapid typing — each query triggers a fetch
    let latestQuery = "";

    queries.forEach((query, i) => {
      const triggerDelay = i * 200; // type every 200ms
      const { data, delay } = results[query];

      // Trigger fetch
      const t1 = setTimeout(() => {
        latestQuery = query;

        // Unsafe: always updates state
        const t2 = setTimeout(() => {
          setUnsafeResult(data);
        }, delay);
        timeoutsRef.current.push(t2);

        // Safe: only updates if still the latest query
        const currentQuery = query;
        const t3 = setTimeout(() => {
          if (currentQuery === latestQuery) {
            setSafeResult(data);
          }
        }, delay);
        timeoutsRef.current.push(t3);
      }, triggerDelay);
      timeoutsRef.current.push(t1);
    });

    const t = setTimeout(() => setRunning(false), 2500);
    timeoutsRef.current.push(t);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 hover:bg-red-700">UNSAFE</Badge>
            <span className="text-xs text-muted-foreground">No cancellation</span>
          </div>
          <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs">
            {unsafeResult || (
              <span className="text-muted-foreground">
                Slow responses overwrite fast ones...
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            The slowest fetch (&quot;a&quot; at 1500ms) arrives last and
            overwrites the correct result.
          </p>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(34, 197, 94, 0.35)">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-700">SAFE</Badge>
            <span className="text-xs text-muted-foreground">
              Cancelled flag
            </span>
          </div>
          <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs">
            {safeResult || (
              <span className="text-muted-foreground">
                Only the latest query updates state...
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Stale responses are ignored — only the latest query&apos;s result
            is displayed.
          </p>
        </div>
      </GlowCard>

      <div className="sm:col-span-2 flex gap-3">
        <Button onClick={runDemo} disabled={running}>
          {running ? "Simulating..." : "Simulate rapid typing"}
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
