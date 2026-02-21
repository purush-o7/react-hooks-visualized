"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
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

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateGrid(text: string): string[] {
  const colors: string[] = [];
  for (let i = 0; i < 2000; i++) {
    const h = hashCode(text + i.toString()) % 360;
    const s = 60 + (hashCode(text + "s" + i) % 30);
    const l = 40 + (hashCode(text + "l" + i) % 30);
    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return colors;
}

const slowCode = `function InstantPreview() {
  const [text, setText] = useState("");

  // Regenerates 2,000 cells on EVERY keystroke
  const grid = generateGrid(text);

  return (
    <>
      <input onChange={e => setText(e.target.value)} />
      {/* Input lags because grid must finish first */}
      <div className="grid">
        {grid.map((color, i) => (
          <div key={i} style={{ backgroundColor: color }} />
        ))}
      </div>
    </>
  );
}`;

export function InstantPreview() {
  const [text, setText] = useState("hello");
  const renderCount = useRef(0);
  renderCount.current += 1;

  const start = performance.now();
  const grid = generateGrid(text);
  const elapsed = (performance.now() - start).toFixed(0);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            JANKY
          </Badge>
          <motion.div
            key={renderCount.current}
            initial={{ scale: 1.2, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Badge variant="outline" className="font-mono text-xs">
              Render #{renderCount.current} ({elapsed}ms)
            </Badge>
          </motion.div>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Type fast — the input lags because the grid regenerates on every keystroke!
          </p>
          <Input
            placeholder="Type to generate colors..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="rounded-lg bg-muted/50 p-2">
          <div className="grid grid-cols-[repeat(50,1fr)] gap-px">
            {grid.map((color, i) => (
              <div
                key={i}
                className="aspect-square rounded-[1px]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does typing feel slow?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Every keystroke changes state, which triggers a re-render.
                React must generate all 2,000 grid cells before it can update
                the input. The entire render is one atomic operation.
              </p>
              <p className="font-medium text-foreground">
                We need the grid to &quot;lag behind&quot; the input — showing a
                slightly stale version while the fresh one computes.
              </p>
              <CodeBlock code={slowCode} filename="instant-preview.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
