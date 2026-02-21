"use client";

import { useReducer } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

type Light = "red" | "yellow" | "green";

function trafficReducer(state: Light, action: { type: "NEXT" }): Light {
  switch (action.type) {
    case "NEXT":
      if (state === "green") return "yellow";
      if (state === "yellow") return "red";
      if (state === "red") return "green";
      return state;
    default:
      return state;
  }
}

const lightConfig: Record<Light, { color: string; label: string }> = {
  red: { color: "#ef4444", label: "STOP" },
  yellow: { color: "#eab308", label: "CAUTION" },
  green: { color: "#22c55e", label: "GO" },
};

const code = `type Light = "red" | "yellow" | "green";

function trafficReducer(state: Light, action: { type: "NEXT" }): Light {
  switch (action.type) {
    case "NEXT":
      if (state === "green") return "yellow";
      if (state === "yellow") return "red";
      if (state === "red") return "green";
      return state;  // unknown state? do nothing
  }
}

// The reducer IS the state machine:
// green → yellow → red → green → ...
// No invalid transitions possible!`;

export function PlaygroundTrafficLight() {
  const [light, dispatch] = useReducer(trafficReducer, "red" as Light);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🚦</span>
          Traffic Light
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            State Machine
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Traffic light visual */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3 inline-flex flex-col items-center">
            {(["red", "yellow", "green"] as Light[]).map((l) => (
              <div
                key={l}
                className="size-16 rounded-full transition-all duration-500"
                style={{
                  backgroundColor:
                    light === l ? lightConfig[l].color : "#27272a",
                  boxShadow:
                    light === l
                      ? `0 0 20px ${lightConfig[l].color}80`
                      : "none",
                }}
              />
            ))}
          </div>

          <div className="text-center">
            <Badge
              className="text-lg px-4 py-1"
              style={{
                backgroundColor: lightConfig[light].color + "20",
                color: lightConfig[light].color,
                border: `1px solid ${lightConfig[light].color}40`,
              }}
            >
              {lightConfig[light].label}
            </Badge>
          </div>

          <Button
            onClick={() => dispatch({ type: "NEXT" })}
            className="w-40"
          >
            Next Light
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            The reducer enforces valid transitions only.
            <br />
            green → yellow → red → green → ...
          </p>
        </div>

        <CodeBlock code={code} filename="traffic-reducer.tsx" />
      </CardContent>
    </Card>
  );
}
