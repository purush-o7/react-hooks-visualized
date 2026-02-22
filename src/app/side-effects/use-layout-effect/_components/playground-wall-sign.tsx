"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const code = `// useLayoutEffect — measure & resize BEFORE paint
useLayoutEffect(() => {
  if (!spanRef.current) return;
  const rect = spanRef.current.getBoundingClientRect();
  setWidth(rect.width + 32);
}, [text]);
// Beam resizes instantly — no flicker!

// useEffect — measure & resize AFTER paint
useEffect(() => {
  // Reset to minimum width first (user sees the shrink)
  setWidth(MIN_WIDTH);
  setTimeout(() => {
    const rect = spanRef.current.getBoundingClientRect();
    setWidth(rect.width + 32);
  }, 50);
}, [text]);
// Beam flashes at min width then expands — visible jump!`;

const PILLAR_WIDTH = 16;
const PILLAR_HEIGHT = 120;
const MIN_BEAM_WIDTH = 80;

export function PlaygroundWallSign() {
  const [text, setText] = useState("Living Room");
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(0);
  const [useLayout, setUseLayout] = useState(true);

  const measure = useCallback(() => {
    if (!spanRef.current) return;
    const rect = spanRef.current.getBoundingClientRect();
    setWidth(Math.max(rect.width + 32, MIN_BEAM_WIDTH));
  }, []);

  // useLayoutEffect path — measures BEFORE paint, no flicker
  useLayoutEffect(() => {
    if (useLayout) {
      measure();
    }
  }, [text, useLayout, measure]);

  // useEffect path — measures AFTER paint, beam flashes at min width first
  useEffect(() => {
    if (!useLayout) {
      setWidth(MIN_BEAM_WIDTH);
      const timeout = setTimeout(measure, 50);
      return () => clearTimeout(timeout);
    }
  }, [text, useLayout, measure]);

  const beamWidth = width > 0 ? width : MIN_BEAM_WIDTH;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Custom Doorframe
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {useLayout ? "useLayoutEffect" : "useEffect"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={useLayout} onCheckedChange={setUseLayout} />
          <span className="text-sm">
            {useLayout
              ? "useLayoutEffect (beam resizes instantly)"
              : "useEffect (watch the beam jump!)"}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          Type a long name — with useEffect the beam snaps to minimum width
          first, then expands to fit the text.
        </p>

        <Input
          placeholder="Type a room name..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Doorframe visual */}
        <div className="flex flex-col items-center py-4">
          <div className="flex items-start">
            {/* Left pillar */}
            <div
              style={{
                width: PILLAR_WIDTH,
                height: PILLAR_HEIGHT,
                backgroundColor: "#8b6241",
                borderRadius: "2px 0 0 2px",
              }}
            />

            {/* Center column: beam + opening */}
            <div className="flex flex-col items-center">
              {/* Beam (lintel) */}
              <div
                className="flex items-center justify-center overflow-hidden whitespace-nowrap"
                style={{
                  width: beamWidth,
                  height: 28,
                  backgroundColor: "#c2956b",
                  borderTop: "3px solid #8b6241",
                  borderBottom: "2px solid #8b6241",
                  transition: useLayout ? "width 0.15s ease-out" : "none",
                }}
              >
                <span className="text-xs font-mono font-medium text-white/90 px-2 truncate">
                  {text || "..."}
                </span>
              </div>

              {/* Door opening */}
              <div
                className="border-l border-r border-b border-dashed"
                style={{
                  width: beamWidth,
                  height: PILLAR_HEIGHT - 28,
                  borderColor: "rgba(59, 130, 246, 0.2)",
                  backgroundColor: "rgba(15, 23, 42, 0.3)",
                  transition: useLayout ? "width 0.15s ease-out" : "none",
                }}
              />
            </div>

            {/* Right pillar */}
            <div
              style={{
                width: PILLAR_WIDTH,
                height: PILLAR_HEIGHT,
                backgroundColor: "#8b6241",
                borderRadius: "0 2px 2px 0",
              }}
            />
          </div>

          {/* Dimension annotation */}
          <div className="mt-2 flex flex-col items-center">
            <svg width={beamWidth + PILLAR_WIDTH * 2} height="20" className="overflow-visible">
              <line
                x1={PILLAR_WIDTH}
                y1="8"
                x2={PILLAR_WIDTH + beamWidth}
                y2="8"
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <line
                x1={PILLAR_WIDTH}
                y1="4"
                x2={PILLAR_WIDTH}
                y2="12"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              <line
                x1={PILLAR_WIDTH + beamWidth}
                y1="4"
                x2={PILLAR_WIDTH + beamWidth}
                y2="12"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              <text
                x={PILLAR_WIDTH + beamWidth / 2}
                y="18"
                fill="#3b82f6"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {beamWidth.toFixed(0)}px
              </text>
            </svg>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 text-xs font-mono text-muted-foreground justify-center flex-wrap">
          <span>Characters: {text.length}</span>
          <span>Beam width: {beamWidth.toFixed(0)}px</span>
        </div>

        {/* Hidden measurement span */}
        <span
          ref={spanRef}
          className="absolute opacity-0 pointer-events-none text-xs font-mono font-medium whitespace-nowrap"
          aria-hidden="true"
        >
          {text || "..."}
        </span>

        <CodeBlock code={code} filename="doorframe.tsx" />
      </CardContent>
    </Card>
  );
}
