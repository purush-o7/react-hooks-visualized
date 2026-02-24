"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Comparison = {
  label: string;
  regularCode: string;
  regularResult: string;
  arrowCode: string;
  arrowResult: string;
  explanation: string;
};

const comparisons: Comparison[] = [
  {
    label: "Method in object",
    regularCode: `const hero = {
  form: "wolf",
  reveal() {
    return this.form;
  },
};
hero.reveal();`,
    regularResult: '"wolf" -- this = hero',
    arrowCode: `const hero = {
  form: "wolf",
  reveal: () => {
    return this.form;
  },
};
hero.reveal();`,
    arrowResult: "undefined -- this = outer scope (window)",
    explanation:
      "Arrow functions don't get their own this. They inherit from wherever they were defined — here, the module scope.",
  },
  {
    label: "Inside setTimeout",
    regularCode: `const hero = {
  form: "eagle",
  delayedReveal() {
    setTimeout(function () {
      console.log(this.form);
    }, 100);
  },
};
hero.delayedReveal();`,
    regularResult: "undefined -- this = window",
    arrowCode: `const hero = {
  form: "eagle",
  delayedReveal() {
    setTimeout(() => {
      console.log(this.form);
    }, 100);
  },
};
hero.delayedReveal();`,
    arrowResult: '"eagle" -- this = hero (frozen!)',
    explanation:
      "The arrow function freezes this from delayedReveal's scope. The regular function creates its own this and loses the object context.",
  },
  {
    label: "Event handler",
    regularCode: `class App {
  name = "MyApp";
  handleClick() {
    console.log(this.name);
  }
}
const app = new App();
button.onclick = app.handleClick;`,
    regularResult: "undefined -- this = button element",
    arrowCode: `class App {
  name = "MyApp";
  handleClick = () => {
    console.log(this.name);
  };
}
const app = new App();
button.onclick = app.handleClick;`,
    arrowResult: '"MyApp" -- this = app instance (frozen!)',
    explanation:
      "Arrow class fields freeze this to the instance at creation time. Regular methods lose context when passed as callbacks.",
  },
];

export function VisualFrozenShape() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const comparison = activeIdx !== null ? comparisons[activeIdx] : null;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(59, 130, 246, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Frozen Shape — regular vs arrow function{" "}
            <code>this</code>
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {comparisons.map((c, i) => (
            <Button
              key={c.label}
              variant={activeIdx === i ? "default" : "outline"}
              onClick={() => setActiveIdx(i)}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {comparison && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Badge variant="outline" className="text-red-500 border-red-500/30">
                  Regular function
                </Badge>
                <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs whitespace-pre">
                  {comparison.regularCode}
                </div>
                <div className="rounded-lg bg-red-500/10 p-3 text-sm">
                  <p className="font-mono text-xs">{comparison.regularResult}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  Arrow function
                </Badge>
                <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs whitespace-pre">
                  {comparison.arrowCode}
                </div>
                <div className="rounded-lg bg-green-500/10 p-3 text-sm">
                  <p className="font-mono text-xs">{comparison.arrowResult}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-muted/30 border p-4 text-sm">
              <p>{comparison.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
