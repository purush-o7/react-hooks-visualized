"use client";

import { useState, memo, useRef } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

// --- Inline default child: new {} every call ---
const InlineDefaultChild = memo(function InlineDefaultChild({
  style = {},
}: {
  style?: React.CSSProperties;
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
        ...style,
      }}
    >
      <p className="text-sm font-medium">Inline Default</p>
      <code className="block text-xs text-muted-foreground font-mono">
        {"style = {}"}
      </code>
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
      <p
        className="text-xs"
        style={{
          color: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
        }}
      >
        {isReRendered
          ? "Re-renders every time! (new {} each call)"
          : "Rendered once"}
      </p>
    </div>
  );
});

// --- Hoisted default child: stable reference ---
const DEFAULT_STYLE: React.CSSProperties = {};

const HoistedDefaultChild = memo(function HoistedDefaultChild({
  style = DEFAULT_STYLE,
}: {
  style?: React.CSSProperties;
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
        ...style,
      }}
    >
      <p className="text-sm font-medium">Hoisted Default</p>
      <code className="block text-xs text-muted-foreground font-mono">
        {"style = DEFAULT_STYLE"}
      </code>
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
      <p
        className="text-xs"
        style={{
          color: isReRendered ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)",
        }}
      >
        {isReRendered ? "Re-rendered" : "Rendered once — skips re-renders!"}
      </p>
    </div>
  );
});

const hoistedCode = `// Inline default: new {} every render
function Card({ style = {} }) { ... }
// memo'd child re-renders every time!

// Hoisted: same reference forever
const DEFAULT_STYLE = {};
function Card({ style = DEFAULT_STYLE }) { ... }
// memo'd child correctly skips re-render ✓`;

export function ExampleHoistedDefaults() {
  const [, forceRender] = useState(0);
  const parentRenderCount = useRef(0);
  parentRenderCount.current += 1;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(249, 115, 22, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">
            FIX
          </Badge>
          <span className="text-sm text-muted-foreground">
            Hoist default non-primitive props
          </span>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => forceRender((n) => n + 1)}
          >
            Force Parent Re-render (#{parentRenderCount.current})
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Neither side passes an explicit style prop — both rely on defaults */}
          <InlineDefaultChild />
          <HoistedDefaultChild />
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>
            <span className="text-green-500">Green</span> = rendered once.{" "}
            <span className="text-red-500">Red</span> = re-rendered needlessly.
          </p>
          <p>
            Neither side receives an explicit <code>style</code> prop — both
            rely on their default parameter.
          </p>
        </div>

        <CodeBlock code={hoistedCode} filename="hoisted-defaults.tsx" />
      </div>
    </GlowCard>
  );
}
