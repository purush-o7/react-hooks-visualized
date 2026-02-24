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

const DESTINATIONS = [
  "London Paddington",
  "Manchester Piccadilly",
  "Edinburgh Waverley",
  "Birmingham New St",
  "Leeds Central",
  "Bristol Temple Meads",
  "Glasgow Central",
  "Liverpool Lime St",
  "Newcastle Central",
  "Oxford",
  "Cambridge",
  "Brighton",
  "Cardiff Central",
  "York",
  "Bath Spa",
];
const STATUSES = ["On Time", "Delayed", "Cancelled", "Boarding", "Departed"];
const TRAIN_PREFIXES = [
  "IC",
  "XC",
  "GW",
  "AV",
  "SE",
  "TL",
  "EM",
  "NR",
  "SW",
  "TP",
];

const DEPARTURES = Array.from({ length: 15000 }, (_, i) => {
  const dest = DESTINATIONS[i % DESTINATIONS.length];
  const prefix = TRAIN_PREFIXES[(i * 3) % TRAIN_PREFIXES.length];
  const num = String(i % 10000).padStart(4, "0");
  const hour = 5 + (i % 19);
  const minute = (i * 7) % 60;
  const platform = (i % 12) + 1;
  const status = STATUSES[(i * 11) % STATUSES.length];
  return `${prefix}-${num}  ${dest}  ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}  Plt ${platform}  ${status}`;
});

function computeDelay(record: string, index: number): number {
  let hash = 0;
  for (let pass = 0; pass < 100; pass++) {
    for (let i = 0; i < record.length; i++) {
      hash = (hash << 5) - hash + record.charCodeAt(i) + pass;
      hash |= 0;
    }
  }
  return Math.abs(hash) % 30;
}

function getStatusColor(status: string): string {
  if (status === "On Time") return "text-green-500";
  if (status === "Delayed" || status === "Cancelled") return "text-red-500";
  if (status === "Boarding") return "text-amber-500";
  return "text-muted-foreground";
}

function parseStatus(departure: string): string {
  const parts = departure.split("  ");
  return parts[parts.length - 1] || "";
}

const overloadedCode = `function OverloadedBoard() {
  const [query, setQuery] = useState("");

  // Runs on EVERY keystroke — blocks the main thread!
  const departures = DEPARTURES
    .filter(d => d.includes(query))
    .sort()
    .slice(0, 300);

  return (
    <>
      <input onChange={e => setQuery(e.target.value)} />
      {/* Desk freezes because React must finish
          filtering before it can update the input */}
      {departures.map(d => <div key={d}>{d}</div>)}
    </>
  );
}`;

export function OverloadedBoard() {
  const [query, setQuery] = useState("");
  const renderCount = useRef(0);
  renderCount.current += 1;

  const start = performance.now();
  const filtered = DEPARTURES.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    const timeA = a.match(/(\d{2}):(\d{2})/);
    const timeB = b.match(/(\d{2}):(\d{2})/);
    if (timeA && timeB) {
      const minsA = parseInt(timeA[1]) * 60 + parseInt(timeA[2]);
      const minsB = parseInt(timeB[1]) * 60 + parseInt(timeB[2]);
      if (minsA !== minsB) return minsA - minsB;
    }
    return a.localeCompare(b);
  });
  const display = filtered.slice(0, 300).map((d, i) => ({
    text: d,
    delay: computeDelay(d, i),
  }));
  const elapsed = (performance.now() - start).toFixed(0);

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            OVERLOADED BOARD
          </Badge>
          <span className="text-sm text-muted-foreground">
            Every search freezes the information desk
          </span>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-5 space-y-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Information Desk
            </p>
            <Input
              placeholder="Search 15,000 departures by destination, train, or platform..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-800 border-white/10"
            />
            <p className="text-xs text-muted-foreground">
              Try typing fast — the desk can&apos;t keep up!
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
              {filtered.length.toLocaleString()} departures
            </Badge>
          </div>

          <div className="rounded-lg bg-zinc-800/50 p-3 max-h-[200px] overflow-y-auto">
            <div className="space-y-0.5">
              {display.map((item) => {
                const status = parseStatus(item.text);
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-background/50"
                  >
                    <span className="text-muted-foreground truncate flex-1">
                      {item.text}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-semibold ${getStatusColor(status)}`}
                    >
                      {item.delay > 15 ? `+${item.delay}m` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
            {filtered.length > 300 && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                ...and {(filtered.length - 300).toLocaleString()} more
              </p>
            )}
          </div>
        </div>

        {query.length >= 3 && (
          <p className="text-center text-sm text-red-500">
            The information desk is frozen! Every keystroke waits for 15,000
            departures to filter before the input can update.
          </p>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why does the desk freeze?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Every keystroke calls <code>setState</code>, which triggers a
                re-render. React must finish filtering and sorting all 15,000
                departure records before it can update the input value. The
                information desk is &quot;blocked&quot; until the heavy work
                completes.
              </p>
              <p className="font-medium text-foreground">
                We need a smart board — one that shows the last schedule while
                the new one loads: &quot;Update the desk immediately, but take
                your time with the departures.&quot;
              </p>
              <CodeBlock code={overloadedCode} filename="overloaded-board.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
