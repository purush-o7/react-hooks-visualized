"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { VisualShapeShifter } from "./_components/visual-shape-shifter";
import { ExampleThisContext } from "./_components/example-this-context";

const globalCode = `// In a browser (non-strict mode)
console.log(this); // window

function showThis() {
  console.log(this);
}
showThis(); // window (loose call — no owner)`;

const strictCode = `"use strict";

function showThis() {
  console.log(this);
}
showThis(); // undefined — strict mode doesn't default to window`;

const objectCode = `const shapeshifter = {
  form: "wolf",
  reveal() {
    console.log("I am a " + this.form);
  },
};

shapeshifter.reveal(); // "I am a wolf"
// this = shapeshifter (the object before the dot)`;

const detachedCode = `const shapeshifter = {
  form: "wolf",
  reveal() {
    console.log("I am a " + this.form);
  },
};

const detached = shapeshifter.reveal;
detached(); // "I am a undefined" — identity lost!
// The function was copied without its context`;

export default function WhatIsThisPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">What is this?</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          this is a shape shifter — it becomes whatever called it. In global
          scope it&apos;s the window, in a method it&apos;s the object, and when
          detached it loses its identity entirely.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Shape Shifter</h2>
          <p className="text-muted-foreground">
            Unlike most variables, <code className="text-foreground">this</code>{" "}
            isn&apos;t determined by where a function is written — it&apos;s
            determined by <strong>how the function is called</strong>. The caller
            decides the shape.
          </p>
          <VisualShapeShifter />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Global Context</h2>
          <p className="text-muted-foreground">
            When a function is called without any owner (a &quot;loose call&quot;),{" "}
            <code className="text-foreground">this</code> defaults to the global
            object — <code className="text-foreground">window</code> in browsers:
          </p>
          <CodeBlock code={globalCode} filename="global-this.js" />
          <p className="text-muted-foreground">
            In strict mode, loose calls give{" "}
            <code className="text-foreground">undefined</code> instead — a much
            safer default:
          </p>
          <CodeBlock code={strictCode} filename="strict-mode.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Object Context</h2>
          <p className="text-muted-foreground">
            When a function is called as a method (with an object before the dot),{" "}
            <code className="text-foreground">this</code> becomes that object:
          </p>
          <CodeBlock code={objectCode} filename="object-this.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Detached Method Trap</h2>
          <p className="text-muted-foreground">
            Copying a method to a variable strips the object context. The function
            is the same, but the caller is gone:
          </p>
          <CodeBlock code={detachedCode} filename="detached-method.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Try It: Context Explorer</h2>
          <p className="text-muted-foreground">
            Explore different calling scenarios and see what{" "}
            <code className="text-foreground">this</code> resolves to in each:
          </p>
          <ExampleThisContext />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <code className="text-foreground">this</code> is determined{" "}
              <strong>at call time</strong>, not definition time
            </li>
            <li>
              Loose call → <code className="text-foreground">window</code> (or{" "}
              <code className="text-foreground">undefined</code> in strict mode)
            </li>
            <li>
              Method call → the object before the dot
            </li>
            <li>
              Detaching a method <strong>strips its context</strong> — a common
              source of bugs
            </li>
          </ul>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
