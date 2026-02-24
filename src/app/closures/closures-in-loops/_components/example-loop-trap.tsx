"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleLoopTrap() {
  const [varResults, setVarResults] = useState<number[]>([]);
  const [letResults, setLetResults] = useState<number[]>([]);
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVarResults([]);
    setLetResults([]);
    setRunning(false);
  };

  const runDemo = () => {
    reset();
    setRunning(true);

    // Simulate var behavior: shared binding
    const sharedRef = { value: 0 };
    for (let i = 0; i < 3; i++) {
      sharedRef.value = i + 1;
      const captured = sharedRef;
      const t = setTimeout(() => {
        setVarResults((prev) => [...prev, captured.value]);
      }, (i + 1) * 600);
      timeoutsRef.current.push(t);
    }
    sharedRef.value = 3; // final value after loop

    // Simulate let behavior: unique binding per iteration
    for (let i = 0; i < 3; i++) {
      const uniqueValue = i;
      const t = setTimeout(() => {
        setLetResults((prev) => [...prev, uniqueValue]);
      }, (i + 1) * 600);
      timeoutsRef.current.push(t);
    }

    const t = setTimeout(() => setRunning(false), 2200);
    timeoutsRef.current.push(t);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-red-600 hover:bg-red-700">var</Badge>
            <span className="text-sm text-muted-foreground">
              Shared binding
            </span>
          </div>
          <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-sm">
            {varResults.length === 0 ? (
              <span className="text-muted-foreground">
                Waiting for callbacks...
              </span>
            ) : (
              varResults.map((v, i) => (
                <div key={i}>
                  callback {i}: i = {v}{" "}
                  <span className="text-red-400">
                    {v === 3 ? "(all the same!)" : ""}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(34, 197, 94, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-green-600 hover:bg-green-700">let</Badge>
            <span className="text-sm text-muted-foreground">
              Unique binding per iteration
            </span>
          </div>
          <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-sm">
            {letResults.length === 0 ? (
              <span className="text-muted-foreground">
                Waiting for callbacks...
              </span>
            ) : (
              letResults.map((v, i) => (
                <div key={i}>
                  callback {i}: i = {v}{" "}
                  <span className="text-green-400">&#10003;</span>
                </div>
              ))
            )}
          </div>
        </div>
      </GlowCard>

      <div className="sm:col-span-2 flex gap-3">
        <Button onClick={runDemo} disabled={running}>
          {running ? "Running..." : "Run Loop Demo"}
        </Button>
        <Button variant="outline" onClick={reset} disabled={!running && varResults.length === 0}>
          Reset
        </Button>
      </div>
    </div>
  );
}
