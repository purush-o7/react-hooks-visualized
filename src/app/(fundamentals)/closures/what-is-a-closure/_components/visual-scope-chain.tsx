"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const scopes = [
  { level: "Global Scope", variable: "app = 'MyApp'", color: "text-red-400" },
  {
    level: "outer() Scope",
    variable: "name = 'Alice'",
    color: "text-yellow-400",
  },
  {
    level: "inner() Scope",
    variable: "greeting = 'Hello'",
    color: "text-green-400",
  },
];

export function VisualScopeChain() {
  const [highlightLevel, setHighlightLevel] = useState<number | null>(null);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Scope Chain — how JavaScript looks up variables
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          When <code className="text-foreground">inner()</code> needs a
          variable, JavaScript walks up the scope chain until it finds it.
          Click a scope level to highlight it:
        </p>

        <div className="space-y-2">
          {scopes.map((scope, i) => (
            <button
              key={scope.level}
              onClick={() => setHighlightLevel(i)}
              className={`w-full text-left rounded-lg border p-3 transition-all ${
                highlightLevel === i
                  ? "border-purple-500/50 bg-purple-500/10"
                  : "border-border hover:border-purple-500/30"
              }`}
              style={{ marginLeft: `${i * 24}px`, width: `calc(100% - ${i * 24}px)` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{scope.level}</span>
                <code className={`text-sm font-mono ${scope.color}`}>
                  {scope.variable}
                </code>
              </div>
            </button>
          ))}
        </div>

        {highlightLevel !== null && (
          <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-1">
            <p className="text-muted-foreground">
              {highlightLevel === 2 &&
                "inner() checks its own scope first — found 'greeting' here."}
              {highlightLevel === 1 &&
                "If not in inner(), JavaScript looks up one level — found 'name' in outer()."}
              {highlightLevel === 0 &&
                "If not found in any function scope, JavaScript reaches global scope — found 'app' here."}
            </p>
            <p className="text-muted-foreground mt-2">
              A closure preserves this entire chain, so inner() can always
              access variables from outer scopes.
            </p>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setHighlightLevel(null)}
          disabled={highlightLevel === null}
        >
          Reset
        </Button>
      </div>
    </GlowCard>
  );
}
