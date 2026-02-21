"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

const code = `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);  // cleanup on value change
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 500);
// debouncedQuery updates 500ms after you stop typing`;

export function PlaygroundUseDebounce() {
  const [query, setQuery] = useState("");
  const [delay, setDelay] = useState(500);
  const debouncedQuery = useDebounce(query, delay);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">⏳</span>
          useDebounce
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Delayed Value
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Type fast — the debounced value waits until you stop.
        </p>

        <Input
          placeholder="Type something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-red-500/10 p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase mb-1">
              Raw (instant)
            </p>
            <p className="font-mono text-sm font-bold break-all">
              {query || "..."}
            </p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3 text-center">
            <p className="text-[10px] text-muted-foreground uppercase mb-1">
              Debounced ({delay}ms)
            </p>
            <p className="font-mono text-sm font-bold break-all">
              {debouncedQuery || "..."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium w-16">Delay</label>
          <input
            type="range"
            min={100}
            max={2000}
            step={100}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="flex-1"
          />
          <span className="font-mono text-sm w-16 text-right">{delay}ms</span>
        </div>

        <CodeBlock code={code} filename="use-debounce.tsx" />
      </CardContent>
    </Card>
  );
}
