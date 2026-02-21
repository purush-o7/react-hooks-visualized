"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

const code = `const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

useEffect(() => {
  function handleResize() {
    setSize({ w: window.innerWidth, h: window.innerHeight });
  }

  window.addEventListener("resize", handleResize);

  // Cleanup: remove the listener when component unmounts
  return () => window.removeEventListener("resize", handleResize);
}, []);  // Empty array = run once on mount`;

export function PlaygroundWindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function handleResize() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ratio = size.w > 0 ? (size.w / size.h).toFixed(2) : "—";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📐</span>
          Window Size Tracker
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Event Listener
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Resize your browser window and watch the values update live.
        </p>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground mb-1">Width</p>
            <p className="text-2xl font-mono font-bold">{size.w}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground mb-1">Height</p>
            <p className="text-2xl font-mono font-bold">{size.h}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground mb-1">Ratio</p>
            <p className="text-2xl font-mono font-bold">{ratio}</p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
            style={{ width: `${Math.min((size.w / 1920) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Width relative to 1920px
        </p>

        <CodeBlock code={code} filename="window-size.tsx" />
      </CardContent>
    </Card>
  );
}
