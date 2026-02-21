"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const code = `const renderCount = useRef(0);

useEffect(() => {
  renderCount.current += 1;
  // This runs after every render,
  // but updating the ref does NOT cause another render!
});

// To display it, you need a state change to trigger a re-render:
const [, forceRender] = useState(0);`;

export function PlaygroundRenderCounter() {
  const renderCount = useRef(0);
  const [value, setValue] = useState("");
  const [, forceRender] = useState(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Render Counter
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Track Renders
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Track how many times this component rendered — without causing extra
          renders.
        </p>

        <div className="text-center rounded-lg bg-muted/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">
            renderCount.current
          </p>
          <p className="text-4xl font-mono font-bold">
            {renderCount.current}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">
              Type to trigger re-renders:
            </label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              placeholder="Each keystroke = 1 render"
            />
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => forceRender((c) => c + 1)}
          >
            Force Re-render
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          The ref count increments on every render, but incrementing it
          doesn&apos;t cause a new render — no infinite loop!
        </p>

        <CodeBlock code={code} filename="render-counter.tsx" />
      </CardContent>
    </Card>
  );
}
