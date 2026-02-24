"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const code = `const portraitRef = useRef<HTMLInputElement>(null);
const landscapeRef = useRef<HTMLInputElement>(null);

// Point the lens at a subject:
portraitRef.current?.focus();

// In JSX:
<input ref={portraitRef} />`;

export function PlaygroundSubjectFocus() {
  const portraitRef = useRef<HTMLInputElement>(null);
  const landscapeRef = useRef<HTMLInputElement>(null);
  const macroRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<string | null>(null);

  function pointLens(
    ref: React.RefObject<HTMLInputElement | null>,
    name: string
  ) {
    ref.current?.focus();
    setActive(name);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📸</span>
          Subject Focus
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            DOM Ref
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Point the camera lens at different subjects — useRef gives you direct
          access to DOM elements.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div
              className="size-2 rounded-full shrink-0 transition-colors"
              style={{
                backgroundColor:
                  active === "portrait" ? "#3b82f6" : "rgba(255,255,255,0.1)",
                boxShadow:
                  active === "portrait"
                    ? "0 0 6px rgba(59,130,246,0.5)"
                    : "none",
              }}
            />
            <Input
              ref={portraitRef}
              placeholder="Name the portrait subject..."
              onFocus={() => setActive("portrait")}
              onBlur={() => setActive(null)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="size-2 rounded-full shrink-0 transition-colors"
              style={{
                backgroundColor:
                  active === "landscape"
                    ? "#3b82f6"
                    : "rgba(255,255,255,0.1)",
                boxShadow:
                  active === "landscape"
                    ? "0 0 6px rgba(59,130,246,0.5)"
                    : "none",
              }}
            />
            <Input
              ref={landscapeRef}
              placeholder="Describe the landscape..."
              onFocus={() => setActive("landscape")}
              onBlur={() => setActive(null)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className="size-2 rounded-full shrink-0 transition-colors"
              style={{
                backgroundColor:
                  active === "macro" ? "#3b82f6" : "rgba(255,255,255,0.1)",
                boxShadow:
                  active === "macro"
                    ? "0 0 6px rgba(59,130,246,0.5)"
                    : "none",
              }}
            />
            <Input
              ref={macroRef}
              placeholder="Macro detail..."
              onFocus={() => setActive("macro")}
              onBlur={() => setActive(null)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => pointLens(portraitRef, "portrait")}
          >
            Point Lens At Portrait
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pointLens(landscapeRef, "landscape")}
          >
            Point Lens At Landscape
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => pointLens(macroRef, "macro")}
          >
            Point Lens At Macro
          </Button>
        </div>

        <CodeBlock code={code} filename="subject-focus.tsx" />
      </CardContent>
    </Card>
  );
}
