"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { VisualClayVsGlaze } from "./_components/visual-clay-vs-glaze";
import { ExampleReferenceSurprise } from "./_components/example-reference-surprise";

const valueCode = `// Primitives: copied by VALUE (like mixing fresh glaze)
let a = 5;
let b = a;  // b gets a COPY of 5
b = 10;
console.log(a); // 5 — unchanged!
console.log(b); // 10`;

const referenceCode = `// Objects: shared by REFERENCE (pointing to the same pot)
let pot1 = { color: "red", size: "large" };
let pot2 = pot1;  // pot2 points to the SAME object
pot2.color = "blue";
console.log(pot1.color); // "blue" — pot1 changed too!
// Both variables point to the same object in memory`;

export default function ValueVsReferencePage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Value vs Reference</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Primitives are copied like mixing a new batch of glaze. Objects are
          shared like pointing two labels at the same pot on the shelf.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Value Types (The Glaze)</h2>
        <p className="text-muted-foreground">
          Numbers, strings, booleans, null, undefined, and symbols are{" "}
          <strong>primitives</strong>. When you assign one to another variable,
          you get an independent copy:
        </p>
        <CodeBlock code={valueCode} filename="value-types.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Reference Types (The Pot)</h2>
        <p className="text-muted-foreground">
          Objects, arrays, and functions are <strong>reference types</strong>.
          When you assign one to another variable, both point to the same
          object in memory:
        </p>
        <CodeBlock code={referenceCode} filename="reference-types.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See the Difference</h2>
        <p className="text-muted-foreground">
          Drag the glaze slider and the pot color to see how values and
          references behave differently:
        </p>
        <VisualClayVsGlaze />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Reference Surprise</h2>
        <p className="text-muted-foreground">
          This is the foundation of why mutation is dangerous in React. If two
          variables point to the same object, changing one changes the other:
        </p>
        <ExampleReferenceSurprise />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <strong>Primitives</strong> (numbers, strings, booleans) are
              copied by value — independent copies
            </li>
            <li>
              <strong>Objects &amp; arrays</strong> are shared by reference —
              same object in memory
            </li>
            <li>
              Modifying a referenced object affects all variables pointing to it
            </li>
            <li>
              This is why React needs <strong>new objects</strong> to detect
              state changes
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
