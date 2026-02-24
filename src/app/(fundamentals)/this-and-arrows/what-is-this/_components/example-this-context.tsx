"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Scenario = {
  label: string;
  code: string;
  output: string;
  explanation: string;
};

const scenarios: Scenario[] = [
  {
    label: "Method call",
    code: `const wizard = {
  name: "Merlin",
  greet() {
    return "I am " + this.name;
  },
};
wizard.greet();`,
    output: '"I am Merlin"',
    explanation:
      "this is wizard because greet was called with wizard before the dot.",
  },
  {
    label: "Nested object",
    code: `const guild = {
  name: "Arcane Order",
  leader: {
    name: "Gandalf",
    announce() {
      return this.name + " speaks!";
    },
  },
};
guild.leader.announce();`,
    output: '"Gandalf speaks!"',
    explanation:
      "this is the immediate object before the dot — leader, not guild.",
  },
  {
    label: "Callback trap",
    code: `const hero = {
  name: "Shape Shifter",
  delayedReveal() {
    setTimeout(function () {
      return this.name; // oops!
    }, 100);
  },
};
// Inside setTimeout callback...`,
    output: "undefined",
    explanation:
      "The regular function inside setTimeout loses the hero context. this falls back to window/undefined.",
  },
];

export function ExampleThisContext() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const scenario = activeIdx !== null ? scenarios[activeIdx] : null;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Try different contexts — predict what <code>this</code> will be
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {scenarios.map((s, i) => (
            <Button
              key={s.label}
              variant={activeIdx === i ? "default" : "outline"}
              onClick={() => setActiveIdx(i)}
            >
              {s.label}
            </Button>
          ))}
        </div>

        {scenario && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm whitespace-pre">
              {scenario.code}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-blue-500/10 p-4 text-sm">
                <p className="text-muted-foreground mb-1">Output:</p>
                <p className="font-mono font-medium">{scenario.output}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-sm">
                <p className="text-muted-foreground mb-1">Why?</p>
                <p>{scenario.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
