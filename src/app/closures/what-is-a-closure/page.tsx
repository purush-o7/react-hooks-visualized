"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { VisualCapsuleSeal } from "./_components/visual-capsule-seal";
import { VisualScopeChain } from "./_components/visual-scope-chain";

const basicClosureCode = `function createGreeting(name) {
  // 'name' is sealed into the capsule
  return function () {
    console.log("Hello, " + name + "!");
  };
}

const greetAlice = createGreeting("Alice");
const greetBob = createGreeting("Bob");

greetAlice(); // "Hello, Alice!"
greetBob();   // "Hello, Bob!"
// Each function remembers its own 'name'`;

const counterCode = `function makeCounter() {
  let count = 0; // sealed in the capsule

  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// 'count' is private — only accessible via closures`;

export default function WhatIsAClosurePage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">What is a Closure?</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          A closure is a function that remembers the variables from where it was
          created — even after that scope is gone. Like sealing a value in a
          time capsule.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Time Capsule</h2>
        <p className="text-muted-foreground">
          When a function is created inside another function, it captures
          (closes over) the variables in its outer scope. Even after the outer
          function finishes, the inner function still has access to those
          variables.
        </p>
        <VisualCapsuleSeal />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">A Basic Closure</h2>
        <p className="text-muted-foreground">
          The inner function returned by{" "}
          <code className="text-foreground">createGreeting</code> remembers{" "}
          <code className="text-foreground">name</code> from when it was
          created. Each call seals a different value:
        </p>
        <CodeBlock code={basicClosureCode} filename="basic-closure.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Scope Chain</h2>
        <p className="text-muted-foreground">
          JavaScript looks up variables through a chain of scopes. A closure
          preserves this chain, giving inner functions access to all outer
          variables:
        </p>
        <VisualScopeChain />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Private State with Closures</h2>
        <p className="text-muted-foreground">
          Closures let you create truly private variables. The{" "}
          <code className="text-foreground">count</code> variable below can
          only be accessed through the returned functions:
        </p>
        <CodeBlock code={counterCode} filename="private-counter.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              A <strong>closure</strong> is a function + its surrounding
              variables
            </li>
            <li>
              The inner function <strong>remembers</strong> variables from where
              it was defined
            </li>
            <li>
              Variables are captured <strong>by reference</strong>, not copied
            </li>
            <li>
              Closures enable <strong>private state</strong> and{" "}
              <strong>data encapsulation</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
