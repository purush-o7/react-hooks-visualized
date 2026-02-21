"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const BRICK_OPTIONS = [
  { name: "Red", bg: "#DC2626", dark: "#991B1B", cost: 3 },
  { name: "Blue", bg: "#2563EB", dark: "#1E3A8A", cost: 2 },
  { name: "Yellow", bg: "#EAB308", dark: "#A16207", cost: 4 },
  { name: "Green", bg: "#16A34A", dark: "#14532D", cost: 1 },
  { name: "Orange", bg: "#EA580C", dark: "#9A3412", cost: 5 },
];

type Brick = {
  id: number;
  name: string;
  bg: string;
  dark: string;
  cost: number;
};

const code = `const stats = useMemo(() => {
  const total = bricks.reduce((s, b) => s + b.cost, 0);
  const counts = {};
  bricks.forEach(b => {
    counts[b.name] = (counts[b.name] || 0) + 1;
  });
  return { total, count: bricks.length, counts };
}, [bricks]);  // Only when bricks change

// Toggle "Show Names"? Counter click? Stats stay cached!`;

export function PlaygroundTower() {
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [showNames, setShowNames] = useState(false);
  const [counter, setCounter] = useState(0);

  const stats = useMemo(() => {
    const total = bricks.reduce((s, b) => s + b.cost, 0);
    const counts: Record<string, number> = {};
    bricks.forEach((b) => {
      counts[b.name] = (counts[b.name] || 0) + 1;
    });
    return { total, count: bricks.length, counts };
  }, [bricks]);

  function addBrick(option: (typeof BRICK_OPTIONS)[0]) {
    setBricks((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        name: option.name,
        bg: option.bg,
        dark: option.dark,
        cost: option.cost,
      },
    ]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">&#x1F9F1;</span>
          Tower Builder
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Memoized Stats
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Brick picker */}
        <div className="flex flex-wrap gap-2">
          {BRICK_OPTIONS.map((opt) => (
            <Button
              key={opt.name}
              variant="outline"
              size="sm"
              onClick={() => addBrick(opt)}
              className="gap-1.5"
            >
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: opt.bg }}
              />
              {opt.name} (${opt.cost})
            </Button>
          ))}
        </div>

        {/* Brick display */}
        {bricks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-muted/50 min-h-[60px]">
            {bricks.map((b) => (
              <div key={b.id} className="relative pt-1.5">
                <div
                  className="absolute top-0 left-0.5 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: b.bg,
                    boxShadow: `inset 0 -1px 0 ${b.dark}`,
                  }}
                />
                <div
                  className="absolute top-0 right-0.5 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: b.bg,
                    boxShadow: `inset 0 -1px 0 ${b.dark}`,
                  }}
                />
                <div
                  className="rounded-sm w-7 h-5"
                  style={{
                    backgroundColor: b.bg,
                    boxShadow: `inset 0 -2px 0 ${b.dark}`,
                  }}
                >
                  {showNames && (
                    <span className="text-[8px] text-white font-bold flex items-center justify-center h-full">
                      {b.name[0]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">
              Bricks
            </p>
            <p className="text-lg font-mono font-bold">{stats.count}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">
              Total Cost
            </p>
            <p className="text-lg font-mono font-bold">${stats.total}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase">
              Colors Used
            </p>
            <p className="text-lg font-mono font-bold">
              {Object.keys(stats.counts).length}
            </p>
          </div>
        </div>

        {/* Color breakdown */}
        {Object.keys(stats.counts).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.counts).map(([name, count]) => {
              const opt = BRICK_OPTIONS.find((o) => o.name === name);
              return (
                <Badge
                  key={name}
                  variant="outline"
                  className="gap-1.5 font-mono"
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: opt?.bg }}
                  />
                  {name}: {count}
                </Badge>
              );
            })}
          </div>
        )}

        {/* Unrelated controls */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNames(!showNames)}
          >
            {showNames ? "Hide" : "Show"} Names
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          {(counter > 0 || showNames) && bricks.length > 0 && (
            <span className="text-xs text-green-600">Stats cached!</span>
          )}
        </div>

        {bricks.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBricks([])}
            className="text-muted-foreground"
          >
            Clear all bricks
          </Button>
        )}

        <CodeBlock code={code} filename="tower-builder.tsx" />
      </CardContent>
    </Card>
  );
}
