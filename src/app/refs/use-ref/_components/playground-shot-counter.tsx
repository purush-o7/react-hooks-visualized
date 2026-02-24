"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const code = `const shotCount = useRef(0);

useEffect(() => {
  shotCount.current += 1;
  // Runs after every render,
  // but updating the ref does NOT cause another render!
});`;

export function PlaygroundShotCounter() {
  const shotCount = useRef(0);
  const [value, setValue] = useState("");
  const [, forceRender] = useState(0);

  useEffect(() => {
    shotCount.current += 1;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎞️</span>
          Shot Counter
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Track Renders
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Track how many shots (renders) this component has taken — without
          causing extra renders.
        </p>

        {/* Film Frame Counter */}
        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
            shotCount.current
          </p>
          <p className="text-4xl font-mono font-bold" style={{ color: "#d97706" }}>
            {shotCount.current}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">
              Adjust camera settings to trigger re-renders:
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
            Force Shutter
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          The shot count increments after every render, but incrementing it
          doesn&apos;t cause a new render — no infinite loop!
        </p>

        <CodeBlock code={code} filename="shot-counter.tsx" />
      </CardContent>
    </Card>
  );
}
