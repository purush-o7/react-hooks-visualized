"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Context = "global" | "object" | "function";

const contexts: {
  id: Context;
  label: string;
  caller: string;
  thisValue: string;
  code: string;
  color: string;
}[] = [
  {
    id: "global",
    label: "Global Context",
    caller: "Nobody (loose call)",
    thisValue: "window (or undefined in strict mode)",
    code: `function whoAmI() {\n  console.log(this);\n}\nwhoAmI(); // window / undefined`,
    color: "text-yellow-500",
  },
  {
    id: "object",
    label: "Object Method",
    caller: "The object before the dot",
    thisValue: "The object that owns the method",
    code: `const hero = {\n  name: "Shape Shifter",\n  reveal() {\n    console.log(this.name);\n  },\n};\nhero.reveal(); // "Shape Shifter"`,
    color: "text-green-500",
  },
  {
    id: "function",
    label: "Detached Method",
    caller: "Nobody (reference was copied)",
    thisValue: "window / undefined — identity lost!",
    code: `const hero = {\n  name: "Shape Shifter",\n  reveal() {\n    console.log(this.name);\n  },\n};\nconst fn = hero.reveal;\nfn(); // undefined — this is no longer hero!`,
    color: "text-red-500",
  },
];

export function VisualShapeShifter() {
  const [active, setActive] = useState<Context | null>(null);

  const ctx = active ? contexts.find((c) => c.id === active) : null;

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(168, 85, 247, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-purple-600 hover:bg-purple-700">
            VISUAL
          </Badge>
          <span className="text-sm text-muted-foreground">
            Shape Shifter — see how <code>this</code> changes identity
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          Click a context to see what <code>this</code> becomes. The shape
          shifter takes on a different identity depending on who summons it:
        </p>

        <div className="flex gap-3 flex-wrap">
          {contexts.map((c) => (
            <Button
              key={c.id}
              variant={active === c.id ? "default" : "outline"}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </Button>
          ))}
        </div>

        {ctx && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm whitespace-pre">
              {ctx.code}
            </div>
            <div className="rounded-lg bg-purple-500/10 p-4 text-sm space-y-2">
              <p>
                <span className="text-muted-foreground">Caller:</span>{" "}
                <strong>{ctx.caller}</strong>
              </p>
              <p>
                <span className="text-muted-foreground">
                  <code>this</code> becomes:
                </span>{" "}
                <strong className={ctx.color}>{ctx.thisValue}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
