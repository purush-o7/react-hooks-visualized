"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const code = `const [isOn, setIsOn] = useState(false);

// Toggle: flip the boolean
setIsOn(prev => !prev);

// In JSX — conditional rendering:
{isOn ? "Let there be light!" : "It's dark in here..."}`;

export function PlaygroundLightSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Light Switch
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Boolean Toggle
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div
          className="rounded-xl p-8 text-center transition-all duration-500"
          style={{
            backgroundColor: isOn
              ? "rgba(250, 204, 21, 0.15)"
              : "rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Bulb */}
          <div
            className="text-7xl transition-all duration-500 mb-4"
            style={{
              filter: isOn ? "brightness(1.2)" : "brightness(0.4)",
            }}
          >
            💡
          </div>

          {/* Message */}
          <p
            className="text-lg font-medium transition-colors duration-500"
            style={{
              color: isOn
                ? "rgb(250, 204, 21)"
                : "rgb(156, 163, 175)",
            }}
          >
            {isOn ? "Let there be light!" : "It's dark in here..."}
          </p>
        </div>

        {/* Toggle control */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">OFF</span>
          <Switch checked={isOn} onCheckedChange={setIsOn} />
          <span className="text-sm text-muted-foreground">ON</span>
        </div>

        <CodeBlock code={code} filename="light-switch.tsx" />
      </CardContent>
    </Card>
  );
}
