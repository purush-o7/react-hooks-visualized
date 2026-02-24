"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleHooksSolution() {
  const [count, setCount] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(34, 197, 94, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">
            HOOKS
          </Badge>
          <span className="text-sm text-muted-foreground">
            No <code>this</code> needed — hooks + arrow functions just work
          </span>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm whitespace-pre">{`function Counter() {
  const [count, setCount] = useState(0);

  // No this, no bind, no class — just a function
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}`}</div>

          <div className="flex items-center gap-4">
            <Button onClick={() => setCount(count + 1)}>
              Count: {count}
            </Button>
            <span className="text-sm text-muted-foreground">
              No <code>this</code> anywhere!
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide" : "Show"} class vs hooks comparison
          </Button>

          {showComparison && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-500/30"
                >
                  Class component
                </Badge>
                <div className="rounded-lg bg-red-500/10 p-3 text-sm space-y-1">
                  <p className="font-mono text-xs">
                    this.state, this.setState
                  </p>
                  <p className="font-mono text-xs">
                    this.handleClick.bind(this)
                  </p>
                  <p className="font-mono text-xs">
                    constructor, render, lifecycle methods
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Must track <code>this</code> everywhere. Easy to forget
                    binding.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="text-green-500 border-green-500/30"
                >
                  Function + Hooks
                </Badge>
                <div className="rounded-lg bg-green-500/10 p-3 text-sm space-y-1">
                  <p className="font-mono text-xs">
                    const [state, setState] = useState()
                  </p>
                  <p className="font-mono text-xs">
                    {"const handleClick = () => { ... }"}
                  </p>
                  <p className="font-mono text-xs">
                    Just a function — closures do the work
                  </p>
                  <p className="text-muted-foreground mt-2">
                    No <code>this</code>. Closures capture state naturally.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
