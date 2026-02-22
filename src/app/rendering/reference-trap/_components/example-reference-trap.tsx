"use client";

import { useState, useRef, useEffect } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const trapCode = `function MyComponent() {
  // New object created every render!
  const style = { color: "red", fontSize: 16 };

  // Even though values are identical,
  // { color: "red" } !== { color: "red" }
  // because they're different objects in memory.

  // This matters for:
  // - useEffect dependencies
  // - React.memo comparisons
  // - useCallback dependencies
}`;

const fixCode = `function MyComponent() {
  // Stable reference — only recalculates if deps change
  const style = useMemo(
    () => ({ color: "red", fontSize: 16 }),
    [] // empty deps = same object every render
  );
}`;

export function ExampleReferenceTrap() {
  const [, forceRender] = useState(0);
  const renderCount = useRef(0);
  const prevStyle = useRef<{ color: string; size: number } | null>(null);

  renderCount.current += 1;

  // New object every render — that's the trap
  const currentStyle = { color: "red", size: 16 };

  const refEqual = prevStyle.current === currentStyle;
  const jsonEqual =
    prevStyle.current !== null &&
    JSON.stringify(prevStyle.current) === JSON.stringify(currentStyle);

  useEffect(() => {
    prevStyle.current = currentStyle;
  });

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(249, 115, 22, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-orange-600 hover:bg-orange-700">
            TRAP
          </Badge>
          <span className="text-sm text-muted-foreground">
            Object Reference Trap
          </span>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => forceRender((n) => n + 1)}
          >
            Force Re-render (#{renderCount.current})
          </Button>
        </div>

        {renderCount.current > 1 && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono">
                  prevStyle === currentStyle
                </code>
                <Badge
                  variant={refEqual ? "default" : "destructive"}
                  className="font-mono"
                >
                  {String(refEqual)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono">
                  JSON.stringify(prev) === JSON.stringify(current)
                </code>
                <Badge className="font-mono bg-green-600 hover:bg-green-700">
                  {String(jsonEqual)}
                </Badge>
              </div>
            </div>

            <div className="rounded-lg bg-orange-500/10 p-4 text-sm space-y-2">
              <p className="font-medium text-orange-500">
                Same values, different references!
              </p>
              <p className="text-muted-foreground">
                Every render creates a <em>new</em> object in memory.{" "}
                <code className="text-foreground">
                  {"{ color: \"red\" } !== { color: \"red\" }"}
                </code>{" "}
                because JavaScript compares objects by reference, not by value.
              </p>
            </div>
          </div>
        )}

        <Accordion>
          <AccordionItem value="fix">
            <AccordionTrigger className="text-sm font-medium">
              Why this matters & how to fix it
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                This is a trap because hooks like{" "}
                <code className="text-foreground">useEffect</code> and{" "}
                <code className="text-foreground">React.memo</code> use{" "}
                <code className="text-foreground">===</code> to check if
                dependencies changed. A new object always fails that check.
              </p>
              <p>The trap:</p>
              <CodeBlock code={trapCode} filename="reference-trap.tsx" />
              <p>
                The fix — use{" "}
                <code className="text-foreground">useMemo</code> or{" "}
                <code className="text-foreground">useCallback</code> to keep a
                stable reference:
              </p>
              <CodeBlock code={fixCode} filename="stable-reference.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
