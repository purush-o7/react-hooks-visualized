"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const SYMPTOMS = [
  "Fever",
  "Cough",
  "Fracture",
  "Burn",
  "Allergy",
  "Migraine",
  "Sprain",
  "Rash",
  "Nausea",
  "Fatigue",
];
const FIRST_NAMES = [
  "James",
  "Maria",
  "Chen",
  "Aisha",
  "Erik",
  "Priya",
  "Omar",
  "Sofia",
  "Kai",
  "Luna",
];
const LAST_NAMES = [
  "Smith",
  "Garcia",
  "Kim",
  "Patel",
  "Johnson",
  "Li",
  "Brown",
  "Wilson",
  "Davis",
  "Moore",
];

const PATIENTS = Array.from({ length: 10000 }, (_, i) => {
  const last = LAST_NAMES[i % LAST_NAMES.length];
  const first = FIRST_NAMES[(i * 3) % FIRST_NAMES.length];
  const symptom = SYMPTOMS[(i * 7) % SYMPTOMS.length];
  return `${last}, ${first} — ${symptom}`;
});

const triageCode = `function TriageSystem() {
  const [query, setQuery] = useState("");
  const [triageQuery, setTriageQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCall(value: string) {
    setQuery(value);           // Urgent: update hotline immediately
    startTransition(() => {
      setTriageQuery(value);   // Non-urgent: route to waiting room
    });
  }

  const records = PATIENTS.filter(p => p.includes(triageQuery));

  return (
    <>
      <input value={query} onChange={e => handleCall(e.target.value)} />
      <div style={{ opacity: isPending ? 0.6 : 1 }}>
        {records.map(p => <div key={p}>{p}</div>)}
      </div>
    </>
  );
}`;

export function TriageSystem() {
  const [query, setQuery] = useState("");
  const [triageQuery, setTriageQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCall(value: string) {
    setQuery(value);
    startTransition(() => {
      setTriageQuery(value);
    });
  }

  const filtered = PATIENTS.filter((p) =>
    p.toLowerCase().includes(triageQuery.toLowerCase())
  ).sort();
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
            TRIAGE SYSTEM
          </Badge>
          <span className="text-sm text-muted-foreground">
            Hotline stays open while records process
          </span>
        </div>

        <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-5 space-y-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Emergency Hotline
            </p>
            <Input
              placeholder="Search 10,000 patient records..."
              value={query}
              onChange={(e) => handleCall(e.target.value)}
              className="bg-zinc-800 border-green-500/20"
            />
            <p className="text-xs text-muted-foreground">
              Type fast — the hotline stays responsive!
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div
                  key="pending"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-500 font-mono text-xs animate-pulse"
                  >
                    In Queue...
                  </Badge>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500 font-mono text-xs"
                  >
                    Clear
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <Badge variant="outline" className="font-mono text-xs">
              {filtered.length.toLocaleString()} records
            </Badge>
          </div>

          <div
            className="rounded-lg bg-zinc-800/50 p-3 max-h-[200px] overflow-y-auto transition-opacity duration-200"
            style={{ opacity: isPending ? 0.6 : 1 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {display.map((patient) => (
                <div
                  key={patient}
                  className="text-xs font-mono text-muted-foreground truncate px-2 py-1 rounded bg-background/50"
                >
                  {patient}
                </div>
              ))}
            </div>
            {filtered.length > 200 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                ...and {(filtered.length - 200).toLocaleString()} more
              </p>
            )}
          </div>
        </div>

        {query.length >= 3 && (
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            The hotline stayed open! Triage routed the heavy records to a
            waiting room while the input stayed responsive.
          </p>
        )}

        <CodeBlock code={triageCode} filename="triage-system.tsx" />
      </div>
    </GlowCard>
  );
}
