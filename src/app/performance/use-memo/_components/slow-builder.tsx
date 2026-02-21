"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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
        style={{ backgroundColor: bg, boxShadow: `inset 0 -2px 0 ${dark}` }}
      />
      <div
        className="absolute top-0 right-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: bg, boxShadow: `inset 0 -2px 0 ${dark}` }}
      />
      <div
        className="rounded-sm h-8 w-12"
        style={{ backgroundColor: bg, boxShadow: `inset 0 -3px 0 ${dark}` }}
      />
    </div>
  );
}

const slowCode = `function SlowBuilder({ height, color }) {
  // Runs on EVERY render — even when name changes!
  const blocks = generateBlocks(height, color);
  //  ↑ expensive! fibonacci grows with height

  const [builderName, setBuilderName] = useState("");
  // Typing a name re-renders → blocks regenerate!

  return <LegoTower blocks={blocks} />;
}`;

export function SlowBuilder() {
  const [height, setHeight] = useState(4);
  const [color, setColor] = useState("Red");
  const [builderName, setBuilderName] = useState("");
  const [unrelatedCount, setUnrelatedCount] = useState(0);
  const renderCount = useRef(0);
  const buildCount = useRef(0);

  renderCount.current += 1;
  buildCount.current += 1;

  const start = performance.now();
  const blocks = generateBlocks(height, color);
  const elapsed = (performance.now() - start).toFixed(0);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        {/* Header badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            FORGETFUL
          </Badge>
          <motion.div
            key={buildCount.current}
            initial={{ scale: 1.2, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Badge variant="outline" className="font-mono text-xs">
              Build #{buildCount.current} ({elapsed}ms)
            </Badge>
          </motion.div>
        </div>

        {/* Lego Tower */}
        <div className="flex justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={renderCount.current}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, staggerDirection: -1 },
                },
              }}
              className="grid grid-cols-3 gap-1"
            >
              {blocks.map((block) => (
                <motion.div
                  key={block.id}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.6 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <LegoBlock bg={block.bg} dark={block.dark} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
        <div className="rounded-lg bg-red-500/10 p-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Type a name — watch the tower rebuild every keystroke!
          </p>
          <Input
            placeholder="Builder name..."
            value={builderName}
            onChange={(e) => {
              setBuilderName(e.target.value);
              setUnrelatedCount((c) => c + 1);
            }}
          />
          {unrelatedCount >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-500"
            >
              You rebuilt the SAME tower {unrelatedCount} times! The name
              doesn&apos;t even affect the blocks...
            </motion.p>
          )}
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the name cause a rebuild?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Any state change re-renders the component. When it re-renders,
                ALL code runs again — including the expensive block generation.
                The builder name is unrelated, but React doesn&apos;t know that.
              </p>
              <p className="font-medium text-foreground">
                We need to tell React: &quot;Only rebuild blocks when height or
                color changes, not on every render.&quot;
              </p>
              <CodeBlock code={slowCode} filename="slow-builder.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
