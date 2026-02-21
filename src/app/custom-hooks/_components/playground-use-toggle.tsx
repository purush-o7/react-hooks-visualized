"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

const code = `function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}

// Usage:
const darkMode = useToggle(false);
const notifications = useToggle(true);
const sound = useToggle(true);`;

export function PlaygroundUseToggle() {
  const darkMode = useToggle(false);
  const notifications = useToggle(true);
  const sound = useToggle(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔄</span>
          useToggle
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Boolean Helper
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {[
            { label: "Dark Mode", icon: darkMode.value ? "🌙" : "☀️", hook: darkMode },
            { label: "Notifications", icon: notifications.value ? "🔔" : "🔕", hook: notifications },
            { label: "Sound", icon: sound.value ? "🔊" : "🔇", hook: sound },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.hook.value}
                  onCheckedChange={item.hook.toggle}
                />
                <Badge variant={item.hook.value ? "default" : "outline"} className="w-10 justify-center text-xs">
                  {item.hook.value ? "ON" : "OFF"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              darkMode.setFalse();
              notifications.setTrue();
              sound.setTrue();
            }}
          >
            Reset All
          </Button>
        </div>

        <CodeBlock code={code} filename="use-toggle.tsx" />
      </CardContent>
    </Card>
  );
}
