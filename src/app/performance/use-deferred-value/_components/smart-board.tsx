"use client";

import { useState, useDeferredValue } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

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

const smartBoardCode = `function SmartBoard() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  //                     ↑ "last schedule" the board shows

  // Board uses DEFERRED query — lags behind the desk
  const departures = DEPARTURES.filter(d =>
    d.includes(deferredQuery)
  );
  const isStale = query !== deferredQuery;

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        {departures.map(d => <div key={d}>{d}</div>)}
      </div>
    </>
  );
}`;

export function SmartBoard() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = DEPARTURES.filter((d) =>
    d.toLowerCase().includes(deferredQuery.toLowerCase())
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

  const isStale = query !== deferredQuery;

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SMART BOARD
          </Badge>
          <span className="text-sm text-muted-foreground">
            Desk stays open while the board catches up
          </span>
        </div>

        <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-5 space-y-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Information Desk
            </p>
            <Input
              placeholder="Search 15,000 departures by destination, train, or platform..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-zinc-800 border-green-500/20"
            />
            <p className="text-xs text-muted-foreground">
              Type fast — the desk stays responsive!
            </p>
          </div>

          <div className="flex gap-3 text-xs font-mono flex-wrap">
            <div className="rounded bg-muted px-2 py-1">
              <span className="text-muted-foreground">query: </span>
              <span className="text-foreground">&quot;{query}&quot;</span>
            </div>
            <div className="rounded bg-muted px-2 py-1">
              <span className="text-muted-foreground">deferredQuery: </span>
              <span className={isStale ? "text-amber-500" : "text-green-500"}>
                &quot;{deferredQuery}&quot;
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <AnimatePresence mode="wait">
              {isStale ? (
                <motion.div
                  key="stale"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-500 font-mono text-xs animate-pulse"
                  >
                    Board Updating...
                  </Badge>
                </motion.div>
              ) : (
                <motion.div
                  key="synced"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-500 font-mono text-xs"
                  >
                    On Schedule
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            <Badge variant="outline" className="font-mono text-xs">
              {filtered.length.toLocaleString()} departures
            </Badge>
          </div>

          <div
            className="rounded-lg bg-zinc-800/50 p-3 max-h-[200px] overflow-y-auto transition-opacity duration-200"
            style={{ opacity: isStale ? 0.6 : 1 }}
          >
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
          <p className="text-center text-sm text-green-600 dark:text-green-400">
            The desk stayed open! The board showed the last schedule while fresh
            data loaded in the background.
          </p>
        )}

        <CodeBlock code={smartBoardCode} filename="smart-board.tsx" />
      </div>
    </GlowCard>
  );
}
