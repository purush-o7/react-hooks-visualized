"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const patterns = [
  {
    code: "useEffect(fn, [])",
    title: "Set up the speakers once",
    description: "Run on mount, clean up on unmount",
    color: "#3b82f6",
    knobLabel: "POWER",
    visual: "single-knob",
  },
  {
    code: "useEffect(fn, [track])",
    title: "Switch when the playlist changes",
    description: "Run when track or BPM changes",
    color: "#a855f7",
    faderLabels: ["TRACK", "BPM"],
    visual: "two-faders",
  },
  {
    code: "useEffect(fn)",
    title: "Restart after every button press",
    description: "Run after every single render",
    color: "#f97316",
    visual: "chaos-knobs",
  },
];

function SingleKnob({ color }: { color: string }) {
  return (
    <div className="flex justify-center py-3">
      <div className="flex flex-col items-center gap-1">
        <div
          className="size-10 rounded-full border-2 relative"
          style={{ borderColor: color }}
        >
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        <span
          className="text-[10px] font-mono font-bold uppercase"
          style={{ color }}
        >
          POWER
        </span>
      </div>
    </div>
  );
}

function TwoFaders({ color, labels }: { color: string; labels: string[] }) {
  return (
    <div className="flex justify-center gap-4 py-3">
      {labels.map((label) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <div
            className="w-2 h-12 rounded-full relative"
            style={{ backgroundColor: color + "30" }}
          >
            <div
              className="absolute bottom-1 left-0 w-2 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
          <span
            className="text-[10px] font-mono font-bold uppercase"
            style={{ color }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChaosKnobs({ color }: { color: string }) {
  return (
    <div className="flex justify-center gap-2 py-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="size-7 rounded-full border-2 relative"
            style={{
              borderColor: color,
              boxShadow: `0 0 8px ${color}60`,
            }}
          >
            <div
              className="absolute w-0.5 h-2 rounded-full"
              style={{
                backgroundColor: color,
                top: "2px",
                left: "50%",
                transform: `translateX(-50%) rotate(${i * 120}deg)`,
                transformOrigin: "bottom center",
              }}
            />
          </div>
        </div>
      ))}
      <span
        className="text-[10px] font-mono font-bold uppercase self-end"
        style={{ color }}
      >
        CHAOS
      </span>
    </div>
  );
}

export function DependencyGuideDJ() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {patterns.map((p) => (
          <Card key={p.code} style={{ borderColor: p.color + "40" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <code className="font-mono text-sm" style={{ color: p.color }}>
                  {p.code}
                </code>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>

              {p.visual === "single-knob" && (
                <SingleKnob color={p.color} />
              )}
              {p.visual === "two-faders" && (
                <TwoFaders color={p.color} labels={p.faderLabels!} />
              )}
              {p.visual === "chaos-knobs" && (
                <ChaosKnobs color={p.color} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground italic">
        The dependency array is your setlist — it tells React which knob
        changes should cue the next track.
      </p>
    </div>
  );
}
