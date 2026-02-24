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

const overwhelmedCode = `function OverwhelmedER() {
  const [query, setQuery] = useState("");

  // Runs on EVERY keystroke — blocks the main thread!
  const records = PATIENTS
    .filter(p => p.includes(query))
    .sort()
    .slice(0, 200);

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} />
      {/* Hotline freezes because React must finish
          filtering before it can update the input */}
      {records.map(p => <div key={p}>{p}</div>)}
    </>
  );
}`;

export function OverwhelmedER() {
  const [query, setQuery] = useState("");
  const renderCount = useRef(0);
  renderCount.current += 1;

  const start = performance.now();
  const filtered = PATIENTS.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  ).sort();
  const elapsed = (performance.now() - start).toFixed(0);
  const display = filtered.slice(0, 200);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            OVERWHELMED ER
          </Badge>
          <span className="text-sm text-muted-foreground">
            Every patient blocks the hotline
          </span>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5 space-y-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Emergency Hotline
            </p>
            <Input
              placeholder="Search 10,000 patient records..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-800 border-white/10"
            />
            <p className="text-xs text-muted-foreground">
              Try typing fast — the hotline can&apos;t keep up!
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <motion.div
              key={renderCount.current}
              initial={{ scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Badge variant="outline" className="font-mono text-xs">
                Render #{renderCount.current}
              </Badge>
            </motion.div>
            <Badge variant="outline" className="font-mono text-xs">
              {elapsed}ms
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              {filtered.length.toLocaleString()} records
            </Badge>
          </div>

          <div className="rounded-lg bg-zinc-800/50 p-3 max-h-[200px] overflow-y-auto">
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
          <p className="text-center text-sm text-red-500">
            The hotline is jammed! Every keystroke waits for 10,000 records to
            filter before the input can update.
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the hotline freeze?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Every keystroke calls <code>setState</code>, which triggers a
                re-render. React must finish filtering and rendering all 10,000
                patient records before it can update the input value. The hotline
                is &quot;blocked&quot; until the heavy work completes.
              </p>
              <p className="font-medium text-foreground">
                We need a triage nurse — someone to tell React: &quot;Update the
                hotline immediately, but take your time with the records.&quot;
              </p>
              <CodeBlock code={overwhelmedCode} filename="overwhelmed-er.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
