"use client";

import { useState, useEffect, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleStaleEffect() {
  const [count, setCount] = useState(0);
  const [staleLog, setStaleLog] = useState<number[]>([]);
  const [freshLog, setFreshLog] = useState<number[]>([]);
  const [running, setRunning] = useState(false);

  const staleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const freshRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setRunning(true);
    setStaleLog([]);
    setFreshLog([]);
  };

  const stop = () => {
    setRunning(false);
    if (staleRef.current) clearInterval(staleRef.current);
    if (freshRef.current) clearInterval(freshRef.current);
  };

  // Stale: empty deps — captures count from first render
  useEffect(() => {
    if (!running) return;
    staleRef.current = setInterval(() => {
      setStaleLog((prev) => [...prev, count]);
    }, 1000);
    return () => {
      if (staleRef.current) clearInterval(staleRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]); // missing 'count' dependency!

  // Fresh: includes count in deps — re-creates closure on each change
  useEffect(() => {
    if (!running) return;
    freshRef.current = setInterval(() => {
      setFreshLog((prev) => [...prev, count]);
    }, 1000);
    return () => {
      if (freshRef.current) clearInterval(freshRef.current);
    };
  }, [running, count]); // correct dependencies

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <Button onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </Button>
        <Button variant="secondary" onClick={running ? stop : start}>
          {running ? "Stop intervals" : "Start intervals"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            stop();
            setCount(0);
            setStaleLog([]);
            setFreshLog([]);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlowCard className="p-4" glowColor="rgba(239, 68, 68, 0.35)">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 hover:bg-red-700">STALE</Badge>
              <span className="text-xs text-muted-foreground">
                Missing dependency
              </span>
            </div>
            <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs">
              {staleLog.length === 0 ? (
                <span className="text-muted-foreground">
                  Start intervals, then increment count...
                </span>
              ) : (
                <span>
                  Reads: [{staleLog.join(", ")}]
                  <span className="text-red-400 block mt-1">
                    Always reads the initial value!
                  </span>
                </span>
              )}
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-4" glowColor="rgba(34, 197, 94, 0.35)">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 hover:bg-green-700">FRESH</Badge>
              <span className="text-xs text-muted-foreground">
                Correct dependencies
              </span>
            </div>
            <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs">
              {freshLog.length === 0 ? (
                <span className="text-muted-foreground">
                  Start intervals, then increment count...
                </span>
              ) : (
                <span>
                  Reads: [{freshLog.join(", ")}]
                  <span className="text-green-400 block mt-1">
                    Always reads the latest value!
                  </span>
                </span>
              )}
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
