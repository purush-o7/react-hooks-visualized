"use client";

import { useState, useDeferredValue } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function generateGrid(text: string): string[] {
  const colors: string[] = [];
  for (let i = 0; i < 2000; i++) {
    const h = hashCode(text + i.toString()) % 360;
    const s = 60 + (hashCode(text + "s" + i) % 30);
    const l = 40 + (hashCode(text + "l" + i) % 30);
    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return colors;
}

const deferredCode = `function DeferredPreview() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  //                    ↑ "echo" of the real value

  // Grid uses the DEFERRED text — lags behind input
  const grid = generateGrid(deferredText);
  const isStale = text !== deferredText;

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        {grid.map((color, i) => (
          <div key={i} style={{ backgroundColor: color }} />
        ))}
      </div>
    </>
  );
}`;

export function DeferredPreview() {
  const [text, setText] = useState("hello");
  const deferredText = useDeferredValue(text);

  const grid = generateGrid(deferredText);
  const isStale = text !== deferredText;

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            SMOOTH
          </Badge>
          {isStale && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-600 font-mono text-xs animate-pulse">
              Echo catching up...
            </Badge>
          )}
          {!isStale && deferredText && (
            <Badge variant="outline" className="border-green-500 text-green-600 font-mono text-xs">
              In sync
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Type fast — the input is instant, the grid follows a moment later!
          </p>
          <Input
            placeholder="Type to generate colors..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex gap-3 text-xs font-mono">
          <div className="rounded bg-muted px-2 py-1">
            <span className="text-muted-foreground">text: </span>
            <span className="text-foreground">&quot;{text}&quot;</span>
          </div>
          <div className="rounded bg-muted px-2 py-1">
            <span className="text-muted-foreground">deferredText: </span>
            <span className={isStale ? "text-yellow-600" : "text-green-600"}>
              &quot;{deferredText}&quot;
            </span>
          </div>
        </div>

        <div
          className="rounded-lg bg-muted/50 p-2 transition-opacity duration-200"
          style={{ opacity: isStale ? 0.6 : 1 }}
        >
          <div className="grid grid-cols-[repeat(50,1fr)] gap-px">
            {grid.map((color, i) => (
              <div
                key={i}
                className="aspect-square rounded-[1px]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <CodeBlock code={deferredCode} filename="deferred-preview.tsx" />
      </div>
    </GlowCard>
  );
}
