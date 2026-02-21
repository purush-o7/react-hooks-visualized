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

const WORDS = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince"];

const ITEMS = Array.from({ length: 10000 }, (_, i) => {
  const word = WORDS[i % WORDS.length];
  return `${word}-${i}-${WORDS[(i * 7) % WORDS.length]}`;
});

const slowCode = `function SlowFilter() {
  const [query, setQuery] = useState("");

  // Runs on EVERY keystroke — blocks the main thread!
  const filtered = ITEMS
    .filter(item => item.includes(query))
    .sort()
    .slice(0, 200);

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} />
      {/* Input freezes because React must finish
          filtering before it can update the input */}
      {filtered.map(item => <div key={item}>{item}</div>)}
    </>
  );
}`;

export function SlowFilter() {
  const [query, setQuery] = useState("");
  const renderCount = useRef(0);
  renderCount.current += 1;

  const start = performance.now();
  const filtered = ITEMS.filter((item) => item.includes(query.toLowerCase())).sort();
  const elapsed = (performance.now() - start).toFixed(0);
  const display = filtered.slice(0, 200);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            BLOCKING
          </Badge>
          <motion.div
            key={renderCount.current}
            initial={{ scale: 1.2, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Badge variant="outline" className="font-mono text-xs">
              Filter #{renderCount.current} ({elapsed}ms)
            </Badge>
          </motion.div>
          <Badge variant="outline" className="font-mono text-xs">
            {filtered.length.toLocaleString()} results
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Try typing fast — the input can&apos;t keep up!
          </p>
          <Input
            placeholder="Filter 10,000 items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="rounded-lg bg-muted/50 p-3 max-h-[200px] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {display.map((item) => (
              <div
                key={item}
                className="text-xs font-mono text-muted-foreground truncate px-2 py-1 rounded bg-background/50"
              >
                {item}
              </div>
            ))}
          </div>
          {filtered.length > 200 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              ...and {(filtered.length - 200).toLocaleString()} more
            </p>
          )}
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the input freeze?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Every keystroke calls setState, which triggers a re-render.
                React must finish filtering and rendering all 10,000 items
                before it can update the input value. The input is &quot;blocked&quot;
                until the heavy work completes.
              </p>
              <p className="font-medium text-foreground">
                We need a way to tell React: &quot;Update the input immediately,
                but take your time with the list.&quot;
              </p>
              <CodeBlock code={slowCode} filename="slow-filter.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
