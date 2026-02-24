"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ExampleNestedTrap() {
  const [log, setLog] = useState<{ text: string; highlight?: boolean }[]>([]);

  const runShallow = () => {
    const pot = {
      color: "red",
      details: { weight: 500, origin: "Japan" },
    };
    const copy = { ...pot };
    copy.details.weight = 300;

    setLog([
      { text: `pot.details.weight → ${pot.details.weight}`, highlight: true },
      { text: `copy.details.weight → ${copy.details.weight}` },
      {
        text: `pot.details === copy.details → ${pot.details === copy.details}`,
        highlight: true,
      },
      { text: `Shallow spread shares nested objects!` },
    ]);
  };

  const runDeep = () => {
    const pot = {
      color: "red",
      details: { weight: 500, origin: "Japan" },
    };
    const copy = { ...pot, details: { ...pot.details, weight: 300 } };

    setLog([
      { text: `pot.details.weight → ${pot.details.weight}` },
      { text: `copy.details.weight → ${copy.details.weight}` },
      {
        text: `pot.details === copy.details → ${pot.details === copy.details}`,
      },
      { text: `Deep spread creates independent copies!`, highlight: true },
    ]);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GlowCard className="p-6" glowColor="rgba(239, 68, 68, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 hover:bg-red-700">SHALLOW</Badge>
            <span className="text-sm text-muted-foreground">
              Nested mutation leaks
            </span>
          </div>
          <Button variant="outline" onClick={runShallow} className="w-full">
            Run shallow copy
          </Button>
        </div>
      </GlowCard>

      <GlowCard className="p-6" glowColor="rgba(34, 197, 94, 0.35)">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 hover:bg-green-700">DEEP</Badge>
            <span className="text-sm text-muted-foreground">
              Nested spread is safe
            </span>
          </div>
          <Button variant="outline" onClick={runDeep} className="w-full">
            Run deep copy
          </Button>
        </div>
      </GlowCard>

      {log.length > 0 && (
        <div className="sm:col-span-2 rounded-lg bg-muted/50 p-4 font-mono text-sm space-y-1">
          {log.map((entry, i) => (
            <div
              key={i}
              className={
                entry.highlight
                  ? "text-orange-400 font-medium"
                  : "text-muted-foreground"
              }
            >
              {entry.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
