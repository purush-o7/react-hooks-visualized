"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const LEGO_COLORS = [
  { name: "Red", bg: "#DC2626", dark: "#991B1B" },
  { name: "Blue", bg: "#2563EB", dark: "#1E3A8A" },
  { name: "Yellow", bg: "#EAB308", dark: "#A16207" },
  { name: "Green", bg: "#16A34A", dark: "#14532D" },
  { name: "Orange", bg: "#EA580C", dark: "#9A3412" },
];

type Block = { id: string; bg: string; dark: string };

// Genuinely expensive work — time grows exponentially with input
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function generateBlocks(height: number, colorName: string): Block[] {
  // Real computation: fib(28)…fib(35) — taller tower = harder math
  fibonacci(27 + height);

  const color = LEGO_COLORS.find((c) => c.name === colorName) || LEGO_COLORS[0];
  const blocks: Block[] = [];
  for (let row = height - 1; row >= 0; row--) {
    for (let col = 0; col < 3; col++) {
      blocks.push({ id: `${row}-${col}`, bg: color.bg, dark: color.dark });
    }
  }
  return blocks;
}

function LegoBlock({ bg, dark }: { bg: string; dark: string }) {
  return (
    <div className="relative pt-2">
      <div
        className="absolute top-0 left-1 w-2 h-2 rounded-full"
        style={{
          backgroundColor: bg,
          boxShadow: `inset 0 -2px 0 ${dark}`,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      <div
        className="absolute top-0 right-1 w-2 h-2 rounded-full"
        style={{
          backgroundColor: bg,
          boxShadow: `inset 0 -2px 0 ${dark}`,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      <div
        className="rounded-sm h-8 w-12"
        style={{
          backgroundColor: bg,
          boxShadow: `inset 0 -3px 0 ${dark}`,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </div>
  );
}

const fastCode = `const blocks = useMemo(() => {
  return generateBlocks(height, color);
}, [height, color]);
// ↑ Only rebuilds when height or color change!

// Builder name changes? useMemo returns the cached tower.
// No rebuild. Instant.`;

export function FastBuilder() {
  const [height, setHeight] = useState(4);
  const [color, setColor] = useState("Red");
  const [builderName, setBuilderName] = useState("");
  const [showCached, setShowCached] = useState(false);

  // Proper reactive build info: ref captures timing inside useMemo,
  // useEffect syncs it to state so the UI updates correctly.
  const buildInfoRef = useRef({ time: "—", count: 0 });
  const [buildInfo, setBuildInfo] = useState({ time: "—", count: 0 });

  const blocks = useMemo(() => {
    const start = performance.now();
    const result = generateBlocks(height, color);
    buildInfoRef.current = {
      time: (performance.now() - start).toFixed(0),
      count: buildInfoRef.current.count + 1,
    };
    return result;
  }, [height, color]);

  // Sync ref → state after useMemo recomputes.
  // Safe: blocks reference only changes when deps change,
  // so this won't loop (next render returns cached blocks).
  useEffect(() => {
    setBuildInfo({ ...buildInfoRef.current });
  }, [blocks]);

  function handleNameChange(value: string) {
    setBuilderName(value);
    setShowCached(true);
    setTimeout(() => setShowCached(false), 1500);
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        {/* Header badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SMART
          </Badge>
          <motion.div
            key={buildInfo.count}
            initial={{ scale: 1.2, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Badge variant="outline" className="font-mono text-xs">
              Build #{buildInfo.count} ({buildInfo.time}ms)
            </Badge>
          </motion.div>
          <AnimatePresence>
            {showCached && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-600 font-mono text-xs"
                >
                  Cached! (0ms)
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lego Tower — individual blocks animate in/out smoothly */}
        <div className="flex justify-center py-4">
          <div className="grid grid-cols-3 gap-1">
            <AnimatePresence>
              {blocks.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, scale: 0.6, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  layout
                >
                  <LegoBlock bg={block.bg} dark={block.dark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls: Height + Color */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-24">
              Height ({height})
            </label>
            <input
              type="range"
              min={1}
              max={8}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-24">Color</label>
            <div className="flex gap-2">
              {LEGO_COLORS.map((c) => (
                <button
                  key={c.name}
                  className="size-8 rounded-full transition-all"
                  style={{
                    backgroundColor: c.bg,
                    outline: color === c.name ? `3px solid ${c.bg}` : "none",
                    outlineOffset: "2px",
                  }}
                  onClick={() => setColor(c.name)}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Unrelated state: Builder Name */}
        <div className="rounded-lg bg-green-500/10 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Type a name — the tower stays put! No rebuild needed.
          </p>
          <Input
            placeholder="Builder name..."
            value={builderName}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        <CodeBlock code={fastCode} filename="smart-builder.tsx" />
      </div>
    </GlowCard>
  );
}
