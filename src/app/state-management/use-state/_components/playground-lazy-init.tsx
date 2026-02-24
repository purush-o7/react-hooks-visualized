"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

function heavyComputation() {
  return Array.from({ length: 50000 }, (_, i) => i).reduce((a, b) => a + b, 0);
}

function EagerPanel() {
  const computeCount = useRef(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  computeCount.current += 1;
  const [total] = useState(heavyComputation());

  return (
    <div
      className="rounded-lg border p-4 space-y-3"
      style={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
    >
      <p className="text-sm font-medium text-center">Eager Wiring</p>
      <code className="block text-xs text-center text-muted-foreground font-mono">
        useState(heavyComputation())
      </code>
      <div className="flex justify-center gap-3">
        <Badge
          variant="outline"
          className="font-mono text-xs"
          style={{ borderColor: "rgb(239, 68, 68)", color: "rgb(239, 68, 68)" }}
        >
          computations: {computeCount.current}
        </Badge>
        <Badge variant="outline" className="font-mono text-xs">
          renders: {renderCount.current}
        </Badge>
      </div>
      <p className="text-xs text-center text-red-400">
        Computation runs every render!
      </p>
      <p className="text-xs text-center text-muted-foreground">
        total = {total.toLocaleString()}
      </p>
    </div>
  );
}

function LazyPanel() {
  const computeCount = useRef(0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  const [total] = useState(() => {
    computeCount.current += 1;
    return heavyComputation();
  });

  return (
    <div
      className="rounded-lg border p-4 space-y-3"
      style={{ borderColor: "rgba(34, 197, 94, 0.4)" }}
    >
      <p className="text-sm font-medium text-center">Lazy Wiring</p>
      <code className="block text-xs text-center text-muted-foreground font-mono">
        {"useState(() => heavyComputation())"}
      </code>
      <div className="flex justify-center gap-3">
        <Badge
          variant="outline"
          className="font-mono text-xs"
          style={{ borderColor: "rgb(34, 197, 94)", color: "rgb(34, 197, 94)" }}
        >
          computations: {computeCount.current}
        </Badge>
        <Badge variant="outline" className="font-mono text-xs">
          renders: {renderCount.current}
        </Badge>
      </div>
      <p className="text-xs text-center text-green-400">
        Computation runs only once!
      </p>
      <p className="text-xs text-center text-muted-foreground">
        total = {total.toLocaleString()}
      </p>
    </div>
  );
}

const lazyInitCode = `// Eager: runs EVERY render (slow!)
const [total, setTotal] = useState(
  heavyComputation() // called on each render
);

// Lazy: runs ONLY on first render
const [total, setTotal] = useState(
  () => heavyComputation() // called once
);`;

export function PlaygroundLazyInit() {
  const [, forceRender] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="lightning">
            ⚡
          </span>
          Lazy Wiring
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Best Practice
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Pass a <strong>function</strong> to useState for expensive initial
          values. Otherwise the computation runs on every render — even though
          React throws the result away after the first.
        </p>

        <div className="text-center">
          <Button onClick={() => forceRender((n) => n + 1)}>
            Force Re-render
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EagerPanel />
          <LazyPanel />
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            <span className="text-red-500">Red</span> = computation runs every
            render.{" "}
            <span className="text-green-500">Green</span> = runs once.
          </p>
        </div>

        <CodeBlock code={lazyInitCode} filename="lazy-init.tsx" />
      </CardContent>
    </Card>
  );
}
