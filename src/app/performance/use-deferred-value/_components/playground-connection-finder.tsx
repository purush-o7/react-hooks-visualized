"use client";

import { useState, useDeferredValue } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const DEPARTURES = Array.from({ length: 20000 }, (_, i) => {
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

const connectionCode = `const deferredQuery = useDeferredValue(query);
const departures = DEPARTURES
  .slice(0, datasetSize)
  .filter(d => d.includes(deferredQuery));
const isStale = query !== deferredQuery;
// Adjust the slider — more departures = more lag without deferral`;

export function PlaygroundConnectionFinder() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [datasetSize, setDatasetSize] = useState(10000);
  const [counter, setCounter] = useState(0);

  const filtered = DEPARTURES.slice(0, datasetSize)
    .filter((d) => d.toLowerCase().includes(deferredQuery.toLowerCase()))
    .sort((a, b) => {
      const timeA = a.match(/(\d{2}):(\d{2})/);
      const timeB = b.match(/(\d{2}):(\d{2})/);
      if (timeA && timeB) {
        const minsA = parseInt(timeA[1]) * 60 + parseInt(timeA[2]);
        const minsB = parseInt(timeB[1]) * 60 + parseInt(timeB[2]);
        if (minsA !== minsB) return minsA - minsB;
      }
      return a.localeCompare(b);
    });
  const display = filtered.slice(0, 200).map((d, i) => ({
    text: d,
    delay: computeDelay(d, i),
  }));

  const isStale = query !== deferredQuery;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="train">
            🚂
          </span>
          Connection Finder
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Adjustable Load
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Search departures and adjust the dataset size — watch the lag scale
          up.
        </p>

        <Input
          placeholder="Search by destination, train, or platform..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">
              Dataset size
            </label>
            <span className="text-sm font-mono">
              {datasetSize.toLocaleString()} departures
            </span>
          </div>
          <input
            type="range"
            min={5000}
            max={20000}
            step={1000}
            value={datasetSize}
            onChange={(e) => setDatasetSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="font-mono text-xs">
            {filtered.length.toLocaleString()} results
          </Badge>
          {isStale && (
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-500 font-mono text-xs animate-pulse"
            >
              Searching timetable...
            </Badge>
          )}
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[250px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isStale ? 0.5 : 1 }}
        >
          {filtered.length === 0 && deferredQuery.length > 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No departures found
            </p>
          ) : (
            <>
              <div className="space-y-0.5">
                {display.map((item) => {
                  const status = parseStatus(item.text);
                  return (
                    <div
                      key={item.text}
                      className="flex items-center justify-between px-3 py-1.5 rounded bg-background/50 text-xs font-mono"
                    >
                      <span className="truncate text-muted-foreground">
                        {item.text}
                      </span>
                      <span
                        className={`shrink-0 ml-2 ${getStatusColor(status)}`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
              {filtered.length > 200 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ...and {(filtered.length - 200).toLocaleString()} more
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Buy Ticket: {counter}
          </Button>
          <span className="text-xs text-muted-foreground">
            {counter > 0
              ? "Still responsive during search!"
              : "Click during a search to test responsiveness"}
          </span>
        </div>

        <CodeBlock code={connectionCode} filename="connection-finder.tsx" />
      </CardContent>
    </Card>
  );
}
