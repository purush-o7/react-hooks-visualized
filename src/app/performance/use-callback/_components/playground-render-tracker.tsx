"use client";

import { useState, useCallback, memo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const TrackedChild = memo(function TrackedChild({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="rounded-lg border p-3 text-center space-y-1">
      <p className="text-sm font-medium">{label}</p>
      <Badge
        variant="outline"
        className="font-mono text-xs"
        style={{
          borderColor:
            renderCount.current > 1
              ? "rgb(239, 68, 68)"
              : "rgb(34, 197, 94)",
        }}
      >
        renders: {renderCount.current}
      </Badge>
      <Button
        variant="ghost"
        size="xs"
        className="block mx-auto text-xs"
        onClick={onClick}
      >
        action
      </Button>
    </div>
  );
});

const code = `// Stable: won't change between renders
const stableHandler = useCallback(() => { /* ... */ }, []);

// Unstable: new function every render
const unstableHandler = () => { /* ... */ };

// Depends on state: changes when 'count' changes
const dependentHandler = useCallback(() => {
  console.log(count);
}, [count]);`;

export function PlaygroundRenderTracker() {
  const [count, setCount] = useState(0);

  // Stable handler — never changes
  const stableHandler = useCallback(() => {}, []);

  // Unstable handler — new reference every render
  const unstableHandler = () => {};

  // Dependent handler — changes when count changes
  const dependentHandler = useCallback(() => {
    console.log(count);
  }, [count]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          Render Tracker
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Visual Flash
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click the parent button and watch which children re-render.
        </p>

        <div className="text-center">
          <Button onClick={() => setCount((c) => c + 1)}>
            Parent Counter: {count}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <TrackedChild label="Stable (useCallback [])" onClick={stableHandler} />
          <TrackedChild label="Unstable (inline)" onClick={unstableHandler} />
          <TrackedChild label="Dependent ([count])" onClick={dependentHandler} />
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            <span className="text-green-500">Green border</span> = rendered once.{" "}
            <span className="text-red-500">Red border</span> = re-rendered.
          </p>
        </div>

        <CodeBlock code={code} filename="render-tracker.tsx" />
      </CardContent>
    </Card>
  );
}
