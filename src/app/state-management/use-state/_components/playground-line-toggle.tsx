"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const code = `const [isConnected, setIsConnected] = useState(false);

// Toggle: flip the boolean
setIsConnected(prev => !prev);`;

export function PlaygroundLineToggle() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔌</span>
          Line Toggle
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Boolean State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Visual */}
        <div
          className="rounded-xl p-8 text-center transition-all duration-500"
          style={{
            backgroundColor: isConnected
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Indicator */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="size-20 rounded-full border-2 transition-all duration-500 flex items-center justify-center"
              style={{
                backgroundColor: isConnected
                  ? "rgba(34, 197, 94, 0.2)"
                  : undefined,
                borderColor: isConnected ? "#22c55e" : "#71717a",
                boxShadow: isConnected
                  ? "0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)"
                  : "none",
              }}
            >
              <div
                className="size-10 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isConnected ? "#22c55e" : "#3f3f46",
                  boxShadow: isConnected
                    ? "0 0 12px rgba(34, 197, 94, 0.8)"
                    : "none",
                }}
              />
            </div>
            <span className="text-xs font-mono text-zinc-500 tracking-wider">
              LINE 1
            </span>
          </div>

          {/* Status text */}
          <p
            className="text-lg font-medium mt-4 transition-colors duration-500"
            style={{
              color: isConnected ? "#22c55e" : "#71717a",
            }}
          >
            {isConnected ? "CONNECTED" : "DISCONNECTED"}
          </p>
        </div>

        {/* Toggle control */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">OFF</span>
          <Switch checked={isConnected} onCheckedChange={setIsConnected} />
          <span className="text-sm text-muted-foreground">ON</span>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          The line is {isConnected ? "connected" : "disconnected"}. Toggle the
          switch to flip the boolean.
        </p>

        <CodeBlock code={code} filename="line-toggle.tsx" />
      </CardContent>
    </Card>
  );
}
