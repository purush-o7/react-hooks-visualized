"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleStaleCounter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  countRef.current = count;

  const [staleLogs, setStaleLogs] = useState<string[]>([]);
  const [fixedLogs, setFixedLogs] = useState<string[]>([]);

  const logStale = () => {
    const capturedCount = count; // captured at click time
    setTimeout(() => {
      setStaleLogs((prev) => [
        ...prev,
        `Read count = ${capturedCount} (captured at click time)`,
      ]);
    }, 2000);
  };

  const logFixed = () => {
    setTimeout(() => {
      setFixedLogs((prev) => [
        ...prev,
        `Read countRef.current = ${countRef.current} (always latest)`,
      ]);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </Button>
        <Button variant="outline" onClick={logStale}>
          Log stale (2s delay)
        </Button>
        <Button variant="outline" onClick={logFixed}>
          Log fixed (2s delay)
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <GlowCard className="p-4" glowColor="rgba(239, 68, 68, 0.35)">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 hover:bg-red-700">STALE</Badge>
              <span className="text-xs text-muted-foreground">
                Captured value
              </span>
            </div>
            <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1">
              {staleLogs.length === 0 ? (
                <span className="text-muted-foreground">
                  Click &quot;Log stale&quot; then increment...
                </span>
              ) : (
                staleLogs.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-4" glowColor="rgba(34, 197, 94, 0.35)">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 hover:bg-green-700">FIXED</Badge>
              <span className="text-xs text-muted-foreground">
                Ref-based value
              </span>
            </div>
            <div className="min-h-[60px] rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1">
              {fixedLogs.length === 0 ? (
                <span className="text-muted-foreground">
                  Click &quot;Log fixed&quot; then increment...
                </span>
              ) : (
                fixedLogs.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </div>
        </GlowCard>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setCount(0);
          countRef.current = 0;
          setStaleLogs([]);
          setFixedLogs([]);
        }}
      >
        Reset all
      </Button>
    </div>
  );
}
