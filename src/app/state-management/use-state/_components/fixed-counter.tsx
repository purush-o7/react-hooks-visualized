"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const fixedCode = `function FixedCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // Tell React: "Hey, the count changed!"
    setCount(c => c + 1);  // React re-renders with new value
  }

  return <span>{count}</span>; // updates every time!
}`;

export function FixedCounter() {
  const [count, setCount] = useState(0);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            WORKS!
          </Badge>
          <span className="text-sm text-muted-foreground">
            Using useState
          </span>
        </div>

        {/* The animated counter */}
        <div className="text-center space-y-2">
          <AnimatedNumber
            value={count}
            className="text-7xl font-mono font-bold"
            springOptions={{ stiffness: 200, damping: 15 }}
          />
          <p className="text-sm text-muted-foreground">
            Display value — updates instantly
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => setCount((c) => c + 1)}
            className="bg-green-600 hover:bg-green-700"
          >
            Add +1
          </Button>
          {count > 0 && (
            <Button variant="outline" onClick={() => setCount(0)}>
              Reset
            </Button>
          )}
        </div>

        {count > 0 && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            React knows the state changed and re-renders the component!
          </p>
        )}

        {/* Code */}
        <CodeBlock code={fixedCode} filename="fixed-counter.tsx" />
      </div>
    </GlowCard>
  );
}
