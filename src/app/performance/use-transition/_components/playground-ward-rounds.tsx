"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

function generateWardRecords(ward: string) {
  return Array.from({ length: 3000 }, (_, i) => `${ward}-patient-${i}`);
}

const WARDS = [
  { id: "emergency", label: "Emergency" },
  { id: "icu", label: "ICU" },
  { id: "general", label: "General" },
];

const wardCode = `const [isPending, startTransition] = useTransition();
const [activeWard, setActiveWard] = useState("emergency");

function switchWard(ward: string) {
  if (triageMode) {
    startTransition(() => setActiveWard(ward));
  } else {
    setActiveWard(ward);  // blocks until records render
  }
}`;

export function PlaygroundWardRounds() {
  const [activeWard, setActiveWard] = useState("emergency");
  const [triageMode, setTriageMode] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(0);

  const records = generateWardRecords(activeWard);

  function switchWard(ward: string) {
    if (triageMode) {
      startTransition(() => setActiveWard(ward));
    } else {
      setActiveWard(ward);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="hospital">
            🏥
          </span>
          Ward Rounds
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Tab Switcher
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Three wards, 3,000 records each. Toggle triage mode and switch wards
          — feel the difference.
        </p>

        <div className="flex items-center gap-3">
          <Switch checked={triageMode} onCheckedChange={setTriageMode} />
          <span className="text-sm">Triage Mode</span>
        </div>

        <div className="flex gap-2">
          {WARDS.map((ward) => (
            <Button
              key={ward.id}
              variant={activeWard === ward.id ? "default" : "outline"}
              size="sm"
              onClick={() => switchWard(ward.id)}
            >
              {ward.label}
            </Button>
          ))}
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[200px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          {isPending && (
            <p className="text-xs text-amber-500 mb-2 animate-pulse">
              Switching ward...
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            {records.slice(0, 300).map((record) => (
              <div
                key={record}
                className="text-xs font-mono text-muted-foreground truncate px-2 py-1 rounded bg-background/50"
              >
                {record}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Check Vitals: {counter}
          </Button>
          <span className="text-xs text-muted-foreground">
            {counter > 0
              ? "Still responsive during ward switch!"
              : "Click during a ward switch to test responsiveness"}
          </span>
        </div>

        <CodeBlock code={wardCode} filename="ward-rounds.tsx" />
      </CardContent>
    </Card>
  );
}
