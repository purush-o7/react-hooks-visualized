"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Check } from "lucide-react";

function RoomSketchBad() {
  return (
    <div
      className="relative h-28 rounded-md overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px)",
      }}
    >
      {/* Target zone */}
      <div
        className="absolute rounded border-2 border-dashed border-green-500/40"
        style={{ right: 16, bottom: 16, width: 48, height: 24 }}
      />
      {/* Sofa at wrong position */}
      <div
        className="absolute rounded"
        style={{
          top: 8,
          left: 8,
          width: 48,
          height: 24,
          backgroundColor: "#c2956b",
          border: "2px solid #8b6241",
        }}
      />
      {/* Teleport arrow */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 112"
        fill="none"
      >
        <path
          d="M 34 22 Q 100 -10 168 80"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          fill="none"
        />
        <polygon points="168,80 160,72 164,82" fill="#ef4444" />
      </svg>
      <span className="absolute top-1 right-1 text-[9px] text-red-400 font-mono">
        TELEPORTS!
      </span>
    </div>
  );
}

function RoomSketchGood() {
  return (
    <div
      className="relative h-28 rounded-md overflow-hidden"
      style={{
        backgroundColor: "#0f172a",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(59,130,246,0.08) 0 1px, transparent 1px 40px)",
      }}
    >
      {/* Measurement lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 112"
        fill="none"
      >
        {/* Horizontal measurement */}
        <line
          x1="0"
          y1="90"
          x2="144"
          y2="90"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <text x="60" y="86" fill="#3b82f6" fontSize="8" fontFamily="monospace">
          120px
        </text>
        {/* Vertical measurement */}
        <line
          x1="168"
          y1="0"
          x2="168"
          y2="68"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <text
          x="174"
          y="38"
          fill="#3b82f6"
          fontSize="8"
          fontFamily="monospace"
        >
          85px
        </text>
      </svg>
      {/* Sofa already at target */}
      <div
        className="absolute rounded"
        style={{
          right: 16,
          bottom: 16,
          width: 48,
          height: 24,
          backgroundColor: "#c2956b",
          border: "2px solid #8b6241",
        }}
      />
      <span className="absolute top-1 right-1 text-[9px] text-green-400 font-mono">
        MEASURED
      </span>
    </div>
  );
}

export function BlueprintLegend() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <X className="size-5" />
              <span className="text-base">
                The Impatient Way (useEffect)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoomSketchBad />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Furniture teleports while the client watches
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Visible flicker on every placement
              </li>
              <li className="flex items-start gap-2">
                <X className="size-4 text-red-500 mt-0.5 shrink-0" />
                Measures AFTER revealing the room
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-500">
              <Check className="size-5" />
              <span className="text-base">
                The Architect Way (useLayoutEffect)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoomSketchGood />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Furniture placed perfectly before the reveal
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                No visual glitch, ever
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-green-500 mt-0.5 shrink-0" />
                Measures BEFORE the client sees the room
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        useLayoutEffect is like an architect who measures the room before placing
        the furniture — not placing it, then shoving it around while the client
        watches.
      </p>
    </div>
  );
}
