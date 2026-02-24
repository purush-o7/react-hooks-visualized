"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Rule = {
  label: string;
  rank: number;
  code: string;
  output: string;
  explanation: string;
  glowColor: string;
  badgeColor: string;
};

const rules: Rule[] = [
  {
    label: "new binding",
    rank: 1,
    code: `function Shapeshifter(form) {
  this.form = form;
}
const s = new Shapeshifter("dragon");
console.log(s.form);`,
    output: '"dragon"',
    explanation:
      "new creates a brand-new object and sets this to it. Highest priority — overrides everything else.",
    glowColor: "rgba(168, 85, 247, 0.35)",
    badgeColor: "bg-purple-600 hover:bg-purple-700",
  },
  {
    label: "Explicit (call/apply/bind)",
    rank: 2,
    code: `function reveal() {
  return "I am " + this.form;
}
const wolf = { form: "wolf" };
const eagle = { form: "eagle" };

reveal.call(wolf);    // "I am wolf"
reveal.apply(eagle);  // "I am eagle"

const bound = reveal.bind(wolf);
bound();              // "I am wolf" (always)`,
    output: '"I am wolf" / "I am eagle"',
    explanation:
      "call, apply, and bind let you manually choose what this will be. bind locks it permanently.",
    glowColor: "rgba(59, 130, 246, 0.35)",
    badgeColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    label: "Implicit (method call)",
    rank: 3,
    code: `const shapeshifter = {
  form: "panther",
  reveal() {
    return "I am " + this.form;
  },
};
shapeshifter.reveal();`,
    output: '"I am panther"',
    explanation:
      "When called as a method, this is the object before the dot. The most common binding in everyday code.",
    glowColor: "rgba(34, 197, 94, 0.35)",
    badgeColor: "bg-green-600 hover:bg-green-700",
  },
  {
    label: "Default (loose call)",
    rank: 4,
    code: `function reveal() {
  return this;
}
reveal(); // window (non-strict) or undefined (strict)

// This is what happens when a method is detached:
const shapeshifter = { form: "wolf", reveal };
const fn = shapeshifter.reveal;
fn(); // window / undefined — NOT shapeshifter`,
    output: "window / undefined",
    explanation:
      "No owner, no explicit binding, no new — this falls back to the default. The lowest priority rule.",
    glowColor: "rgba(239, 68, 68, 0.35)",
    badgeColor: "bg-red-600 hover:bg-red-700",
  },
];

export function ExampleBindingRules() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const rule = activeIdx !== null ? rules[activeIdx] : null;

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor={rule?.glowColor ?? "rgba(168, 85, 247, 0.35)"}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge
            className={`text-sm px-3 py-1 ${rule?.badgeColor ?? "bg-purple-600 hover:bg-purple-700"}`}
          >
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Binding priority — from highest (#1) to lowest (#4)
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {rules.map((r, i) => (
            <Button
              key={r.label}
              variant={activeIdx === i ? "default" : "outline"}
              onClick={() => setActiveIdx(i)}
            >
              #{r.rank} {r.label}
            </Button>
          ))}
        </div>

        {rule && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm whitespace-pre">
              {rule.code}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/30 border p-4 text-sm">
                <p className="text-muted-foreground mb-1">Output:</p>
                <p className="font-mono font-medium">{rule.output}</p>
              </div>
              <div className="rounded-lg bg-muted/30 border p-4 text-sm">
                <p className="text-muted-foreground mb-1">Why?</p>
                <p>{rule.explanation}</p>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Priority: new (#1) &gt; explicit (#2) &gt; implicit (#3) &gt;
              default (#4)
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
