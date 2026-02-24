"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { VisualPotteryCopy } from "./_components/visual-pottery-copy";
import { ExampleNestedTrap } from "./_components/example-nested-trap";

const spreadBasicCode = `// Spread = make a new pot with the same properties
const original = { color: "red", size: "large" };
const copy = { ...original };

copy.color = "blue";
console.log(original.color); // "red" — safe!
console.log(copy.color);     // "blue"`;

const spreadOverrideCode = `// Spread + override = common React pattern
const pot = { color: "red", size: "large", glaze: "matte" };

const updated = {
  ...pot,          // copy all properties
  color: "blue",   // override just this one
};
// { color: "blue", size: "large", glaze: "matte" }`;

const nestedTrapCode = `// SHALLOW copy — nested objects are still shared!
const pot = {
  color: "red",
  details: { weight: 500, origin: "Japan" },
};

const copy = { ...pot };
copy.details.weight = 300;  // MUTATES the original!

console.log(pot.details.weight); // 300 — not 500!
// The spread only copied the top level`;

const nestedFixCode = `// Deep copy of nested objects
const updated = {
  ...pot,
  details: {
    ...pot.details,    // spread the nested object too
    weight: 300,       // override nested property
  },
};
// Now pot.details.weight is still 500 ✅`;

export default function Spreading101Page() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Spreading 101</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          The spread operator creates a shallow copy — like making a mold of a
          pot. Perfect for flat objects, but watch out for nested ones.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Spread</h2>
        <p className="text-muted-foreground">
          The spread operator (<code className="text-foreground">...</code>)
          copies all properties from one object into a new one:
        </p>
        <CodeBlock code={spreadBasicCode} filename="basic-spread.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Spread + Override</h2>
        <p className="text-muted-foreground">
          The most common React pattern — spread the old state, then override
          what changed:
        </p>
        <CodeBlock code={spreadOverrideCode} filename="spread-override.js" />
        <VisualPotteryCopy />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Nested Trap</h2>
        <p className="text-muted-foreground">
          Spread only copies one level deep. Nested objects are still{" "}
          <em>shared by reference</em>:
        </p>
        <CodeBlock code={nestedTrapCode} filename="nested-trap.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See the Trap</h2>
        <p className="text-muted-foreground">
          Watch what happens when you modify a nested property through a
          shallow copy:
        </p>
        <ExampleNestedTrap />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: Spread All Levels</h2>
        <p className="text-muted-foreground">
          When updating nested state, spread at every level that contains a
          change:
        </p>
        <CodeBlock code={nestedFixCode} filename="nested-fix.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <code className="text-foreground">{`{ ...obj }`}</code> creates a
              <strong> shallow copy</strong> — new object, same nested refs
            </li>
            <li>
              <strong>Spread + override</strong> is the standard React update
              pattern
            </li>
            <li>
              Nested objects require spreading at <strong>every level</strong>
            </li>
            <li>
              For deeply nested state, consider{" "}
              <code className="text-foreground">useReducer</code> or Immer
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
