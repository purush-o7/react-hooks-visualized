"use client";

import { useState, useRef } from "react";
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

function expensiveSort(size: number): number[] {
  const arr = Array.from({ length: size }, () => Math.random());
  arr.sort((a, b) => a - b);
  return arr;
}

const beforeCode = `function ProductList({ items }) {
  const [search, setSearch] = useState("");

  // Runs on EVERY render — even when only search changes
  const sorted = expensiveSort(items);

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <List items={sorted} />
    </>
  );
}`;

const afterCode = `function ProductList({ items }) {
  const [search, setSearch] = useState("");

  // Only re-sorts when items actually change
  const sorted = useMemo(
    () => expensiveSort(items),
    [items]
  );

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      <List items={sorted} />
    </>
  );
}`;

export function ExampleExpensiveCalculation() {
  const [text, setText] = useState("");
  const [listSize, setListSize] = useState(5000);
  const sortCount = useRef(0);

  sortCount.current += 1;

  const start = performance.now();
  expensiveSort(listSize);
  const elapsed = (performance.now() - start).toFixed(1);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(245, 158, 11, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="text-sm px-3 py-1 bg-amber-600 hover:bg-amber-700">
            EXPENSIVE
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Sort #{sortCount.current} took {elapsed}ms
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Type anything (unrelated to the sort):
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium w-32 shrink-0">
              List size: {listSize.toLocaleString()}
            </label>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={listSize}
              onChange={(e) => setListSize(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>

        {/* Timer display */}
        <div className="rounded-lg bg-muted/50 p-4 text-center space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Sort duration
          </p>
          <p
            className={`text-4xl font-mono font-bold ${
              Number(elapsed) > 10 ? "text-red-500" : "text-amber-500"
            }`}
          >
            {elapsed}ms
          </p>
          <p className="text-xs text-muted-foreground">
            sorting {listSize.toLocaleString()} items
          </p>
        </div>

        {sortCount.current > 3 && text.length > 0 && (
          <div className="rounded-lg bg-amber-500/10 p-4 text-sm space-y-2">
            <p className="font-medium text-amber-500">
              You typed text, but the sort ran {sortCount.current} times!
            </p>
            <p className="text-muted-foreground">
              The sort has nothing to do with your text input, but it re-runs on
              every render. This is exactly why{" "}
              <code className="text-foreground">useMemo</code> exists.
            </p>
          </div>
        )}

        <Accordion>
          <AccordionItem value="fix">
            <AccordionTrigger className="text-sm font-medium">
              How useMemo fixes this
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>Without useMemo — sorts on every render:</p>
              <CodeBlock code={beforeCode} filename="before.tsx" />
              <p>With useMemo — only sorts when items change:</p>
              <CodeBlock code={afterCode} filename="after.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
