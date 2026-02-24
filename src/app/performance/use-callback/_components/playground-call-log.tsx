"use client";

import { useState, useCallback, memo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { User } from "lucide-react";

const TrackedContact = memo(function TrackedContact({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
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
      <div className="flex justify-center">
        <div
          className="size-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isReRendered
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(34, 197, 94, 0.15)",
          }}
        >
          <User
            className="size-5"
            style={{
              color: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
            }}
          />
        </div>
      </div>
      <Badge
        variant="outline"
        className="font-mono text-xs"
        style={{
          borderColor: isReRendered
            ? "rgb(239, 68, 68)"
            : "rgb(34, 197, 94)",
          color: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
        }}
      >
        re-renders: {renderCount.current}
      </Badge>
      <p className="text-xs text-muted-foreground">{label}</p>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs"
        onClick={onClick}
      >
        dial
      </Button>
    </div>
  );
});

const callLogCode = `// 1. Stable — never changes
const handleStable = useCallback(() => {}, []);

// 2. Unstable — new function every render
const handleUnstable = () => {};

// 3. Dependent — changes when count changes
const handleDependent = useCallback(() => {
  console.log(count);
}, [count]);`;

export function PlaygroundCallLog() {
  const [count, setCount] = useState(0);

  const handleStable = useCallback(() => {}, []);

  const handleUnstable = () => {};

  const handleDependent = useCallback(() => {
    console.log(count);
  }, [count]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="phone">
            📞
          </span>
          Call Log
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Render Tracker
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Three contacts, three callback strategies. Hit &quot;Refresh&quot; and
          watch which contacts re-check their list.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={() => setCount((c) => c + 1)}>
            Refresh Screen
          </Button>
          <Badge variant="outline" className="font-mono">
            renders: {count + 1}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <TrackedContact
            label="Stable (useCallback [])"
            onClick={handleStable}
          />
          <TrackedContact
            label="Unstable (inline)"
            onClick={handleUnstable}
          />
          <TrackedContact
            label="Dependent ([count])"
            onClick={handleDependent}
          />
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            <span className="text-green-500">Green border</span> = rendered
            once.{" "}
            <span className="text-red-500">Red border</span> = re-rendered.
          </p>
        </div>

        <CodeBlock code={callLogCode} filename="call-log.tsx" />
      </CardContent>
    </Card>
  );
}
