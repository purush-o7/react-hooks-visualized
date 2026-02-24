"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { VisualFrozenShape } from "./_components/visual-frozen-shape";
import { ExampleArrowVsRegular } from "./_components/example-arrow-vs-regular";

const lexicalCode = `const team = {
  name: "Avengers",
  members: ["Tony", "Steve", "Natasha"],
  listMembers() {
    // 'this' is team (method call)
    this.members.forEach((member) => {
      // Arrow inherits 'this' from listMembers
      console.log(member + " is in " + this.name);
    });
  },
};

team.listMembers();
// "Tony is in Avengers"
// "Steve is in Avengers"
// "Natasha is in Avengers"`;

const brokenCode = `const team = {
  name: "Avengers",
  members: ["Tony", "Steve", "Natasha"],
  listMembers() {
    this.members.forEach(function (member) {
      // Regular function creates its own 'this' → window/undefined
      console.log(member + " is in " + this.name); // undefined!
    });
  },
};`;

const syntaxCode = `// Full body
const add = (a, b) => {
  return a + b;
};

// Implicit return (single expression)
const add = (a, b) => a + b;

// Single parameter — parens optional
const double = x => x * 2;

// No parameters — parens required
const greet = () => "hello";

// Returning an object literal — wrap in parens
const makeUser = (name) => ({ name, role: "user" });`;

export default function ArrowFunctionsPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Arrow Functions</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Arrow functions freeze the shape forever — they capture this from where
          they&apos;re defined, not where they&apos;re called. No surprises.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Lexical this</h2>
          <p className="text-muted-foreground">
            The defining feature of arrow functions: they don&apos;t create their
            own <code className="text-foreground">this</code>. They inherit it
            from the enclosing scope — and it can never be changed:
          </p>
          <CodeBlock code={lexicalCode} filename="lexical-this.js" />
          <p className="text-muted-foreground">
            Compare with a regular function, which creates its own{" "}
            <code className="text-foreground">this</code> and loses the object
            context:
          </p>
          <CodeBlock code={brokenCode} filename="broken-regular.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Regular vs Arrow: Side by Side</h2>
          <p className="text-muted-foreground">
            See how the same scenario produces different results depending on the
            function type:
          </p>
          <VisualFrozenShape />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Concise Syntax</h2>
          <p className="text-muted-foreground">
            Arrow functions have several shorthand forms that make callbacks
            cleaner:
          </p>
          <CodeBlock code={syntaxCode} filename="arrow-syntax.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Arrow Function Traits</h2>
          <p className="text-muted-foreground">
            Beyond lexical <code className="text-foreground">this</code>, arrow
            functions have other differences from regular functions. Explore each:
          </p>
          <ExampleArrowVsRegular />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Arrow functions have <strong>lexical this</strong> — inherited from
              the enclosing scope
            </li>
            <li>
              <code className="text-foreground">call</code>,{" "}
              <code className="text-foreground">apply</code>, and{" "}
              <code className="text-foreground">bind</code> cannot change an
              arrow&apos;s <code className="text-foreground">this</code>
            </li>
            <li>
              No <code className="text-foreground">arguments</code> object — use
              rest parameters instead
            </li>
            <li>
              <strong>Don&apos;t</strong> use arrow functions as object methods —
              they won&apos;t get the object as{" "}
              <code className="text-foreground">this</code>
            </li>
            <li>
              <strong>Do</strong> use them for callbacks, event handlers inside
              methods, and React components
            </li>
          </ul>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
