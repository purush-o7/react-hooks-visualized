"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function ExtraEffectMode() {
  const [first, setFirst] = useState("John");
  const [last, setLast] = useState("Doe");
  const [fullName, setFullName] = useState("");
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    setFullName(first + " " + last);
  }, [first, last]);

  return (
    <div
      className="rounded-lg border p-4 space-y-3"
      style={{ borderColor: "rgba(239, 68, 68, 0.4)" }}
    >
      <p className="text-sm font-medium text-center">Extra Effect</p>
      <div className="space-y-2">
        <Input
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First name"
          className="text-sm"
        />
        <Input
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Last name"
          className="text-sm"
        />
      </div>
      <div className="rounded-lg bg-muted/50 p-3 text-center">
        <p className="text-xs text-muted-foreground mb-1">Full Name:</p>
        <p className="font-medium">{fullName}</p>
      </div>
      <Badge
        variant="outline"
        className="font-mono text-xs w-full justify-center"
        style={{ borderColor: "rgb(239, 68, 68)", color: "rgb(239, 68, 68)" }}
      >
        renders: {renderCount.current}
      </Badge>
      <p className="text-xs text-center text-red-400">
        2 renders per keystroke!
      </p>
    </div>
  );
}

function DirectMixMode() {
  const [first, setFirst] = useState("John");
  const [last, setLast] = useState("Doe");
  const renderCount = useRef(0);
  renderCount.current += 1;

  const fullName = first + " " + last;

  return (
    <div
      className="rounded-lg border p-4 space-y-3"
      style={{ borderColor: "rgba(34, 197, 94, 0.4)" }}
    >
      <p className="text-sm font-medium text-center">Direct Mix</p>
      <div className="space-y-2">
        <Input
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="First name"
          className="text-sm"
        />
        <Input
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder="Last name"
          className="text-sm"
        />
      </div>
      <div className="rounded-lg bg-muted/50 p-3 text-center">
        <p className="text-xs text-muted-foreground mb-1">Full Name:</p>
        <p className="font-medium">{fullName}</p>
      </div>
      <Badge
        variant="outline"
        className="font-mono text-xs w-full justify-center"
        style={{ borderColor: "rgb(34, 197, 94)", color: "rgb(34, 197, 94)" }}
      >
        renders: {renderCount.current}
      </Badge>
      <p className="text-xs text-center text-green-400">
        1 render per keystroke!
      </p>
    </div>
  );
}

const derivedCode = `// Bad: extra effect → double render per keystroke
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last); // triggers extra render!
}, [first, last]);

// Good: derive during render — zero overhead
const fullName = first + " " + last;`;

export function PlaygroundDerivedState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="mixer">
            🎛️
          </span>
          Skip the Remix
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Best Practice
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Some tracks don&apos;t need the mixing board — they play themselves.
          If state can be computed from other state, just derive it inline
          instead of syncing with an effect.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ExtraEffectMode />
          <DirectMixMode />
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <p>
            Type in either side. <span className="text-red-500">Red</span> =
            extra renders from effect.{" "}
            <span className="text-green-500">Green</span> = minimal renders.
          </p>
        </div>

        <CodeBlock code={derivedCode} filename="derived-state.tsx" />
      </CardContent>
    </Card>
  );
}
