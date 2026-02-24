"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type QueueItem = { text: string; type: "sync" | "microtask" | "macrotask" };

const steps: { description: string; callStack: string[]; webApis: string[]; microtask: string[]; macrotask: string[]; output: string[] }[] = [
  {
    description: "console.log(\"1: Take order\") — pushed to call stack",
    callStack: ["console.log(\"1\")"],
    webApis: [],
    microtask: [],
    macrotask: [],
    output: ["1: Take order"],
  },
  {
    description: "setTimeout callback — sent to Web API (kitchen)",
    callStack: [],
    webApis: ["setTimeout(cb, 0)"],
    microtask: [],
    macrotask: [],
    output: ["1: Take order"],
  },
  {
    description: "Promise.then — queued as microtask (priority pass)",
    callStack: [],
    webApis: ["setTimeout(cb, 0)"],
    microtask: ["Promise.then(cb)"],
    macrotask: [],
    output: ["1: Take order"],
  },
  {
    description: "console.log(\"4: Greet new guest\") — pushed to call stack",
    callStack: ["console.log(\"4\")"],
    webApis: [],
    microtask: ["Promise.then(cb)"],
    macrotask: ["setTimeout cb"],
    output: ["1: Take order", "4: Greet new guest"],
  },
  {
    description: "Call stack empty → microtask runs first (Promise)",
    callStack: ["Promise callback"],
    webApis: [],
    microtask: [],
    macrotask: ["setTimeout cb"],
    output: ["1: Take order", "4: Greet new guest", "3: Check on table"],
  },
  {
    description: "Microtasks done → macrotask runs (setTimeout)",
    callStack: ["setTimeout callback"],
    webApis: [],
    microtask: [],
    macrotask: [],
    output: ["1: Take order", "4: Greet new guest", "3: Check on table", "2: Food ready"],
  },
];

export function VisualRestaurantFloor() {
  const [stepIndex, setStepIndex] = useState(0);
  const current = steps[stepIndex];

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Event Loop — step through execution
          </span>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-sm">
          <p className="font-medium">
            Step {stepIndex + 1}/{steps.length}: {current.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium text-yellow-400">
              Call Stack (waiter)
            </p>
            {current.callStack.length === 0 ? (
              <p className="text-xs text-muted-foreground">(empty)</p>
            ) : (
              current.callStack.map((item, i) => (
                <div
                  key={i}
                  className="rounded bg-yellow-500/10 px-2 py-1 text-xs font-mono"
                >
                  {item}
                </div>
              ))
            )}
          </div>
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium text-blue-400">
              Web APIs (kitchen)
            </p>
            {current.webApis.length === 0 ? (
              <p className="text-xs text-muted-foreground">(empty)</p>
            ) : (
              current.webApis.map((item, i) => (
                <div
                  key={i}
                  className="rounded bg-blue-500/10 px-2 py-1 text-xs font-mono"
                >
                  {item}
                </div>
              ))
            )}
          </div>
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium text-green-400">
              Microtask Queue (priority)
            </p>
            {current.microtask.length === 0 ? (
              <p className="text-xs text-muted-foreground">(empty)</p>
            ) : (
              current.microtask.map((item, i) => (
                <div
                  key={i}
                  className="rounded bg-green-500/10 px-2 py-1 text-xs font-mono"
                >
                  {item}
                </div>
              ))
            )}
          </div>
          <div className="rounded-lg border p-3 space-y-2">
            <p className="text-xs font-medium text-orange-400">
              Macrotask Queue (callback)
            </p>
            {current.macrotask.length === 0 ? (
              <p className="text-xs text-muted-foreground">(empty)</p>
            ) : (
              current.macrotask.map((item, i) => (
                <div
                  key={i}
                  className="rounded bg-orange-500/10 px-2 py-1 text-xs font-mono"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Console Output
          </p>
          <div className="font-mono text-sm space-y-0.5">
            {current.output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
            disabled={stepIndex === 0}
          >
            Previous
          </Button>
          <Button
            size="sm"
            onClick={() => setStepIndex((s) => Math.min(steps.length - 1, s + 1))}
            disabled={stepIndex === steps.length - 1}
          >
            Next Step
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setStepIndex(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    </GlowCard>
  );
}
