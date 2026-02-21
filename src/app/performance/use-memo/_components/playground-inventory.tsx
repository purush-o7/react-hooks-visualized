"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const PIECE_COLORS = [
  { name: "Red", bg: "#DC2626", dark: "#991B1B" },
  { name: "Blue", bg: "#2563EB", dark: "#1E3A8A" },
  { name: "Yellow", bg: "#EAB308", dark: "#A16207" },
  { name: "Green", bg: "#16A34A", dark: "#14532D" },
  { name: "Orange", bg: "#EA580C", dark: "#9A3412" },
];

type Piece = { id: number; name: string; bg: string; dark: string };

function randomPiece(): Piece {
  const c = PIECE_COLORS[Math.floor(Math.random() * PIECE_COLORS.length)];
  return {
    id: Date.now() + Math.random(),
    name: c.name,
    bg: c.bg,
    dark: c.dark,
  };
}

// Deterministic initial set to avoid hydration mismatches
const INITIAL_PATTERN = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1];
const initialPieces: Piece[] = INITIAL_PATTERN.map((i, idx) => ({
  id: idx,
  name: PIECE_COLORS[i].name,
  bg: PIECE_COLORS[i].bg,
  dark: PIECE_COLORS[i].dark,
}));

const code = `const stats = useMemo(() => {
  const counts = {};
  pieces.forEach(p => {
    counts[p.name] = (counts[p.name] || 0) + 1;
  });
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]);
  return {
    total: pieces.length,
    uniqueColors: Object.keys(counts).length,
    mostCommon: sorted[0]?.[0] ?? "—",
    rarest: sorted.at(-1)?.[0] ?? "—",
  };
}, [pieces]);  // Only when pieces change

// Layout toggle? Stats stay cached!`;

export function PlaygroundInventory() {
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [counter, setCounter] = useState(0);

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    pieces.forEach((p) => {
      counts[p.name] = (counts[p.name] || 0) + 1;
    });
    const entries = Object.entries(counts);
    const sorted = [...entries].sort(
      (a, b) => (b[1] as number) - (a[1] as number)
    );
    return {
      total: pieces.length,
      uniqueColors: entries.length,
      mostCommon: sorted[0]?.[0] ?? "—",
      rarest: sorted[sorted.length - 1]?.[0] ?? "—",
    };
  }, [pieces]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">&#x1F4E6;</span>
          Parts Inventory
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Aggregated Stats
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPieces((p) => [...p, randomPiece()])}
          >
            Add Random
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPieces((p) => (p.length > 1 ? p.slice(0, -1) : p))
            }
          >
            Remove Last
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPieces(Array.from({ length: 12 }, () => randomPiece()))
            }
          >
            Randomize All
          </Button>
        </div>

        {/* Pieces display */}
        <div
          className={
            layout === "grid"
              ? "flex flex-wrap gap-1.5 p-3 rounded-lg bg-muted/50 min-h-[60px]"
              : "space-y-1 p-3 rounded-lg bg-muted/50 min-h-[60px]"
          }
        >
          {pieces.map((p) =>
            layout === "grid" ? (
              <div key={p.id} className="relative pt-1.5">
                <div
                  className="absolute top-0 left-0.5 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: p.bg,
                    boxShadow: `inset 0 -1px 0 ${p.dark}`,
                  }}
                />
                <div
                  className="absolute top-0 right-0.5 w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: p.bg,
                    boxShadow: `inset 0 -1px 0 ${p.dark}`,
                  }}
                />
                <div
                  className="rounded-sm w-7 h-5"
                  style={{
                    backgroundColor: p.bg,
                    boxShadow: `inset 0 -2px 0 ${p.dark}`,
                  }}
                />
              </div>
            ) : (
              <div key={p.id} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block w-3 h-3 rounded-sm"
                  style={{ backgroundColor: p.bg }}
                />
                <span className="font-mono">{p.name}</span>
              </div>
            )
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Total", value: stats.total },
            { label: "Colors", value: stats.uniqueColors },
            { label: "Most Common", value: stats.mostCommon },
            { label: "Rarest", value: stats.rarest },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg bg-muted/50 p-3 text-center"
            >
              <p className="text-[10px] text-muted-foreground uppercase">
                {s.label}
              </p>
              <p className="text-lg font-mono font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Unrelated controls */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setLayout((l) => (l === "grid" ? "list" : "grid"))
            }
          >
            {layout === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          {(counter > 0 || layout === "list") && (
            <span className="text-xs text-green-600">Stats cached!</span>
          )}
        </div>

        <CodeBlock code={code} filename="parts-inventory.tsx" />
      </CardContent>
    </Card>
  );
}
