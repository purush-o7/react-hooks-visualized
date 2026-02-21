"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const WORDS = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince"];

const ITEMS = Array.from({ length: 10000 }, (_, i) => {
  const word = WORDS[i % WORDS.length];
  return `${word}-${i}-${WORDS[(i * 7) % WORDS.length]}`;
});

const smoothCode = `function SmoothFilter() {
  const [query, setQuery] = useState("");
  const [filteredQuery, setFilteredQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    // Urgent: update input immediately
    setQuery(value);
    // Non-urgent: defer the expensive filter
    startTransition(() => {
      setFilteredQuery(value);
    });
  }

  const filtered = ITEMS.filter(item =>
    item.includes(filteredQuery)
  );

  return (
    <>
      <input value={query} onChange={e => handleChange(e.target.value)} />
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        {filtered.map(item => <div key={item}>{item}</div>)}
      </div>
    </>
  );
}`;

export function SmoothFilter() {
  const [query, setQuery] = useState("");
  const [filteredQuery, setFilteredQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setQuery(value);
    startTransition(() => {
      setFilteredQuery(value);
    });
  }

  const filtered = ITEMS.filter((item) => item.includes(filteredQuery.toLowerCase())).sort();
  const display = filtered.slice(0, 200);

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            NON-BLOCKING
          </Badge>
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="pending"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="outline" className="border-yellow-500 text-yellow-600 font-mono text-xs animate-pulse">
                  Pending...
                </Badge>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge variant="outline" className="border-green-500 text-green-600 font-mono text-xs">
                  Done
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
          <Badge variant="outline" className="font-mono text-xs">
            {filtered.length.toLocaleString()} results
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Type fast — the input stays snappy while the list catches up!
          </p>
          <Input
            placeholder="Filter 10,000 items..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[200px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isPending ? 0.6 : 1 }}
        >
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

        <CodeBlock code={smoothCode} filename="smooth-filter.tsx" />
      </div>
    </GlowCard>
  );
}
