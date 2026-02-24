"use client";

import { useState, useCallback, memo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const TrackedChild = memo(function TrackedChild({
  label,
  onIncrement,
}: {
  label: string;
  onIncrement: () => void;
}) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const isReRendered = renderCount.current > 1;

  return (
    <div
      className="rounded-lg border p-4 text-center space-y-3"
      style={{
        borderColor: isReRendered
          ? "rgba(239, 68, 68, 0.4)"
          : "rgba(34, 197, 94, 0.4)",
      }}
    >
      <p className="text-sm font-medium">{label}</p>
      <Badge
        variant="outline"
        className="font-mono text-xs"
        style={{
          borderColor: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
          color: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
        }}
      >
        child renders: {renderCount.current}
      </Badge>
      <div>
        <Button variant="ghost" size="sm" className="text-xs" onClick={onIncrement}>
          Increment
        </Button>
      </div>
    </div>
  );
});

const functionalUpdateCode = `// Unstable: recreates when count changes
const increment = useCallback(
  () => setCount(count + 1),
  [count] // new callback every count change
);

// Stable: functional update, no dependency
const increment = useCallback(
  () => setCount(c => c + 1),
  [] // stable forever
);`;

export function PlaygroundFunctionalUpdate() {
  const [unstableCount, setUnstableCount] = useState(0);
  const [stableCount, setStableCount] = useState(0);

  // Unstable: depends on count — new identity every time count changes
  const incrementUnstable = useCallback(
    () => setUnstableCount(unstableCount + 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unstableCount]
  );

  // Stable: functional update — no dependency on state
  const incrementStable = useCallback(
    () => setStableCount((c) => c + 1),
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="cycle">
            🔄
          </span>
          Stable Dialer
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Best Practice
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Why re-program speed dial every time the call count changes? Use
          functional setState to keep callbacks stable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="text-center">
              <Badge variant="outline" className="font-mono text-xs">
                count: {unstableCount}
              </Badge>
            </div>
            <TrackedChild
              label="Unstable ([count] dep)"
              onIncrement={incrementUnstable}
            />
          </div>
          <div className="space-y-3">
            <div className="text-center">
              <Badge variant="outline" className="font-mono text-xs">
                count: {stableCount}
              </Badge>
            </div>
            <TrackedChild
              label="Stable ([] dep)"
              onIncrement={incrementStable}
            />
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            <span className="text-green-500">Green border</span> = rendered
            once.{" "}
            <span className="text-red-500">Red border</span> = re-rendered.
          </p>
          <p>
            Click both &quot;Increment&quot; buttons a few times and compare child
            render counts.
          </p>
        </div>

        <CodeBlock code={functionalUpdateCode} filename="functional-update.tsx" />
      </CardContent>
    </Card>
  );
}
