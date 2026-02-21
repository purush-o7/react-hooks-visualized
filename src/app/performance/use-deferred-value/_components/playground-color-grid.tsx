"use client";

import { useState, useDeferredValue } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateColorGrid(color: string, size: number): string[] {
  const colors: string[] = [];
  const base = hashCode(color);
  for (let i = 0; i < size * size; i++) {
    const h = (base + i * 7) % 360;
    const s = 50 + (hashCode(color + i) % 40);
    const l = 35 + (hashCode(color + "l" + i) % 35);
    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return colors;
}

const code = `const deferredColor = useDeferredValue(color);
const grid = generateColorGrid(deferredColor, gridSize);
const isStale = color !== deferredColor;

// Grid dims when stale, snaps to new color when caught up`;

export function PlaygroundColorGrid() {
  const [color, setColor] = useState("#3b82f6");
  const [gridSize, setGridSize] = useState(30);
  const [counter, setCounter] = useState(0);

  const deferredColor = useDeferredValue(color);
  const grid = generateColorGrid(deferredColor, gridSize);
  const isStale = color !== deferredColor;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Color Grid Generator
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {gridSize}x{gridSize} Grid
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Color</label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-9 p-1 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <label className="text-sm font-medium">Size ({gridSize})</label>
            <input
              type="range"
              min={10}
              max={50}
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>

        {isStale && (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600 font-mono text-xs animate-pulse">
            Grid updating...
          </Badge>
        )}

        <div
          className="rounded-lg bg-muted/50 p-2 transition-opacity duration-200"
          style={{ opacity: isStale ? 0.6 : 1 }}
        >
          <div
            className="grid gap-px"
            style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
          >
            {grid.map((c, i) => (
              <div
                key={i}
                className="aspect-square rounded-[1px]"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          <span className="text-xs text-muted-foreground">
            Counter stays responsive while the grid updates
          </span>
        </div>

        <CodeBlock code={code} filename="color-grid.tsx" />
      </CardContent>
    </Card>
  );
}
