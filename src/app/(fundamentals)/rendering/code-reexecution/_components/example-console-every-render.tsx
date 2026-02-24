"use client";

import { useState, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type LogEntry = {
  render: number;
  timestamp: number;
  random: string;
};

const codeExample = `function MyComponent() {
  // ALL of this runs on every render:
  const now = Date.now();
  const rand = Math.random();
  console.log("Render!", now, rand);

  const [text, setText] = useState("");

  // Every keystroke → new render → new values
  return <input onChange={e => setText(e.target.value)} />;
}`;

export function ExampleConsoleEveryRender() {
  const [text, setText] = useState("");
  const renderCount = useRef(0);
  const logs = useRef<LogEntry[]>([]);

  renderCount.current += 1;

  // These run every render — that's the point
  const now = Date.now();
  const rand = Math.random().toFixed(6);

  // Add log entry for this render
  if (
    logs.current.length === 0 ||
    logs.current[logs.current.length - 1].render !== renderCount.current
  ) {
    logs.current.push({
      render: renderCount.current,
      timestamp: now,
      random: rand,
    });
    if (logs.current.length > 20) {
      logs.current = logs.current.slice(-20);
    }
  }

  function handleClear() {
    logs.current = [];
    setText("");
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(245, 158, 11, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-amber-600 hover:bg-amber-700">
            OBSERVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            All Code Runs Every Render
          </span>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            Type anything — each keystroke triggers a render:
          </label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing..."
          />
        </div>

        {/* Console panel */}
        <div className="rounded-lg border bg-black/90 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <span className="text-xs text-white/60 font-mono">
              Component Console
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-white/60 hover:text-white hover:bg-white/10"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
          <div className="p-3 max-h-64 overflow-y-auto font-mono text-xs space-y-1">
            {logs.current.length === 0 ? (
              <p className="text-white/30">Waiting for renders...</p>
            ) : (
              logs.current.map((entry) => (
                <div key={entry.render} className="flex gap-3 text-white/80">
                  <span className="text-green-400 shrink-0">
                    Render #{entry.render}
                  </span>
                  <span className="text-blue-400">
                    Date.now()={entry.timestamp}
                  </span>
                  <span className="text-purple-400">
                    Math.random()={entry.random}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {renderCount.current > 3 && (
          <p className="text-sm text-amber-500 font-medium">
            Notice: every Date.now() and Math.random() is different — the entire
            function body re-executes on each render.
          </p>
        )}

        <Accordion>
          <AccordionItem value="code">
            <AccordionTrigger className="text-sm font-medium">
              See the code pattern
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Everything inside your component function runs from top to
                bottom on every render. There are no &quot;skip zones&quot; —
                every variable, every calculation, every console.log.
              </p>
              <CodeBlock code={codeExample} filename="every-render.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
