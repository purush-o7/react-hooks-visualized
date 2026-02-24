"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Scenario = "concise" | "no-arguments" | "no-bind" | "gotcha";

const scenarios: {
  id: Scenario;
  label: string;
  code: string;
  note: string;
}[] = [
  {
    id: "concise",
    label: "Concise syntax",
    code: `// Regular
const double = function (x) {
  return x * 2;
};

// Arrow — implicit return
const double = (x) => x * 2;

// Arrow — single param, no parens needed
const double = x => x * 2;`,
    note: "Arrow functions shine for short callbacks: .map(x => x * 2), .filter(n => n > 0)",
  },
  {
    id: "no-arguments",
    label: "No arguments object",
    code: `// Regular function has 'arguments'
function sum() {
  return [...arguments].reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

// Arrow function does NOT have 'arguments'
const sum = () => {
  console.log(arguments); // ReferenceError!
};

// Use rest params instead
const sum = (...args) => args.reduce((a, b) => a + b, 0);`,
    note: "Arrow functions don't have their own arguments object. Use rest parameters (...args) instead.",
  },
  {
    id: "no-bind",
    label: "Can't rebind this",
    code: `const arrow = () => this;

const obj = { name: "test" };

// These all do NOTHING to an arrow function's this:
arrow.call(obj);   // still outer this
arrow.apply(obj);  // still outer this
arrow.bind(obj)(); // still outer this

// The shape is frozen forever!`,
    note: "call, apply, and bind are ignored by arrow functions. Their this is permanently locked to where they were created.",
  },
  {
    id: "gotcha",
    label: "Object method gotcha",
    code: `// DON'T use arrow functions as object methods!
const counter = {
  count: 0,
  // Bad: arrow doesn't get its own this
  increment: () => {
    this.count++; // this is NOT counter!
  },
  // Good: regular method works
  decrement() {
    this.count--; // this IS counter
  },
};`,
    note: "Arrow functions in object literals inherit this from the module scope — not the object. Use regular methods instead.",
  },
];

export function ExampleArrowVsRegular() {
  const [active, setActive] = useState<Scenario | null>(null);

  const scenario = active
    ? scenarios.find((s) => s.id === active)
    : null;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(34, 197, 94, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">
            INTERACTIVE
          </Badge>
          <span className="text-sm text-muted-foreground">
            Arrow function traits — what makes them different
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {scenarios.map((s) => (
            <Button
              key={s.id}
              variant={active === s.id ? "default" : "outline"}
              onClick={() => setActive(s.id)}
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
            <div className="rounded-lg bg-green-500/10 p-4 text-sm">
              <p>{scenario.note}</p>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
