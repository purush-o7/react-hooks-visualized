"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const code = `const textRef = useRef<HTMLSpanElement>(null);
const [width, setWidth] = useState(0);

useLayoutEffect(() => {
  if (textRef.current) {
    const rect = textRef.current.getBoundingClientRect();
    setWidth(rect.width + 24); // padding
  }
}, [text]);

// Badge width is set BEFORE paint — no flicker!`;

export function PlaygroundDynamicWidth() {
  const [text, setText] = useState("Hello World");
  const textRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setWidth(rect.width + 24);
    }
  }, [text]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Dynamic Width Badge
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Measured Before Paint
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Type to resize the badge..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex flex-col items-center gap-4 py-4">
          <div
            className="rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium transition-all duration-150 overflow-hidden whitespace-nowrap"
            style={{ width: width > 0 ? width : "auto" }}
          >
            {text || "..."}
          </div>

          <div className="flex gap-3 text-xs font-mono text-muted-foreground">
            <span>Characters: {text.length}</span>
            <span>Badge width: {width.toFixed(0)}px</span>
          </div>
        </div>

        {/* Hidden measurement span */}
        <span
          ref={textRef}
          className="absolute opacity-0 pointer-events-none text-sm font-medium whitespace-nowrap"
          aria-hidden="true"
        >
          {text || "..."}
        </span>

        <CodeBlock code={code} filename="dynamic-width.tsx" />
      </CardContent>
    </Card>
  );
}
