"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const operations = [
  { label: "getUser()", delay: 800 },
  { label: "getOrders()", delay: 600 },
  { label: "getDetails()", delay: 700 },
  { label: "getShipping()", delay: 500 },
];

export function ExampleCallbackHell() {
  const [callbackLog, setCallbackLog] = useState<string[]>([]);
  const [promiseLog, setPromiseLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setCallbackLog([]);
    setPromiseLog([]);
    setRunning(false);
  };

  const run = () => {
    reset();
    setRunning(true);

    let elapsed = 0;
    operations.forEach((op, i) => {
      elapsed += op.delay;
      const indent = "  ".repeat(i);
      const t = setTimeout(() => {
        setCallbackLog((prev) => [
          ...prev,
          `${indent}${op.label} done (${elapsed}ms)`,
        ]);
        setPromiseLog((prev) => [
          ...prev,
          `.then(${op.label}) done`,
        ]);
      }, elapsed);
      timeoutsRef.current.push(t);
    });

    const t = setTimeout(() => setRunning(false), elapsed + 100);
    timeoutsRef.current.push(t);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 hover:bg-red-700">CALLBACKS</Badge>
            <span className="text-sm text-muted-foreground">Nested</span>
          </div>
          <div className="min-h-[100px] rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1">
            {callbackLog.length === 0 ? (
              <span className="text-muted-foreground">
                Click &quot;Run&quot; to start...
              </span>
            ) : (
              callbackLog.map((line, i) => (
                <div key={i} className="whitespace-pre">
                  {line}
                </div>
              ))
            )}
          </div>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(34, 197, 94, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-700">PROMISES</Badge>
            <span className="text-sm text-muted-foreground">Flat chain</span>
          </div>
          <div className="min-h-[100px] rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1">
            {promiseLog.length === 0 ? (
              <span className="text-muted-foreground">
                Click &quot;Run&quot; to start...
              </span>
            ) : (
              promiseLog.map((line, i) => (
                <div key={i}>{line}</div>
              ))
            )}
          </div>
        </div>
      </GlowCard>

      <div className="sm:col-span-2 flex gap-3">
        <Button onClick={run} disabled={running}>
          {running ? "Running..." : "Run Sequence"}
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
