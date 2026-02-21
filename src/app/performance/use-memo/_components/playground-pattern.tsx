"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const COLOR_PRESETS = [
  { name: "Red", bg: "#DC2626" },
  { name: "Blue", bg: "#2563EB" },
  { name: "Yellow", bg: "#EAB308" },
  { name: "Green", bg: "#16A34A" },
  { name: "Orange", bg: "#EA580C" },
  { name: "Purple", bg: "#9333EA" },
];

const PATTERNS = ["Stripes", "Checkerboard", "Diagonal"] as const;
type PatternType = (typeof PATTERNS)[number];

function generateGrid(
  color1: string,
  color2: string,
  pattern: PatternType
): string[][] {
  const grid: string[][] = [];
  for (let row = 0; row < 6; row++) {
    const gridRow: string[] = [];
    for (let col = 0; col < 6; col++) {
      let useFirst: boolean;
      switch (pattern) {
        case "Stripes":
          useFirst = row % 2 === 0;
          break;
        case "Checkerboard":
          useFirst = (row + col) % 2 === 0;
          break;
        case "Diagonal":
          useFirst = (row + col) % 3 !== 0;
          break;
      }
      gridRow.push(useFirst ? color1 : color2);
    }
    grid.push(gridRow);
  }
  return grid;
}

const code = `const grid = useMemo(() => {
  return generateGrid(color1, color2, pattern);
}, [color1, color2, pattern]);

// Frame color changes? Grid stays cached!`;

export function PlaygroundPattern() {
  const [color1, setColor1] = useState("#DC2626");
  const [color2, setColor2] = useState("#2563EB");
  const [pattern, setPattern] = useState<PatternType>("Checkerboard");
  const [frameColor, setFrameColor] = useState("#1e1e1e");
  const [counter, setCounter] = useState(0);

  const grid = useMemo(() => {
    return generateGrid(color1, color2, pattern);
  }, [color1, color2, pattern]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">&#x1F3A8;</span>
          Pattern Designer
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Computed Grid
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pattern selector */}
        <div className="flex gap-2">
          {PATTERNS.map((p) => (
            <Button
              key={p}
              variant={pattern === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPattern(p)}
            >
              {p}
            </Button>
          ))}
        </div>

        {/* Color pickers */}
        <div className="flex gap-6">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Color 1</label>
            <div className="flex gap-1.5">
              {COLOR_PRESETS.slice(0, 3).map((c) => (
                <button
                  key={c.name}
                  className="size-6 rounded-full transition-all"
                  style={{
                    backgroundColor: c.bg,
                    outline: color1 === c.bg ? `2px solid ${c.bg}` : "none",
                    outlineOffset: "2px",
                  }}
                  onClick={() => setColor1(c.bg)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Color 2</label>
            <div className="flex gap-1.5">
              {COLOR_PRESETS.slice(3).map((c) => (
                <button
                  key={c.name}
                  className="size-6 rounded-full transition-all"
                  style={{
                    backgroundColor: c.bg,
                    outline: color2 === c.bg ? `2px solid ${c.bg}` : "none",
                    outlineOffset: "2px",
                  }}
                  onClick={() => setColor2(c.bg)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className="p-3 rounded-lg inline-block"
          style={{ backgroundColor: frameColor }}
        >
          <div className="grid grid-cols-6 gap-1">
            {grid.flat().map((color, i) => (
              <div key={i} className="relative pt-1">
                <div
                  className="absolute top-0 left-0.5 w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: color,
                    filter: "brightness(0.8)",
                  }}
                />
                <div
                  className="absolute top-0 right-0.5 w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: color,
                    filter: "brightness(0.8)",
                  }}
                />
                <div
                  className="rounded-sm w-6 h-4"
                  style={{
                    backgroundColor: color,
                    boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Unrelated: Frame color + counter */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium">Frame Color</label>
          <input
            type="color"
            value={frameColor}
            onChange={(e) => setFrameColor(e.target.value)}
            className="size-8 rounded cursor-pointer"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          {(counter > 0 || frameColor !== "#1e1e1e") && (
            <span className="text-xs text-green-600">Grid cached!</span>
          )}
        </div>

        <CodeBlock code={code} filename="pattern-designer.tsx" />
      </CardContent>
    </Card>
  );
}
