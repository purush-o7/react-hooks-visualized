"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleBindingRules } from "./_components/example-binding-rules";

const implicitCode = `const hero = {
  name: "Wolf",
  announce() {
    console.log(this.name + " is here!");
  },
};
hero.announce(); // "Wolf is here!"
// this = hero (the object before the dot)`;

const explicitCode = `function shapeshift(newForm) {
  console.log(this.name + " becomes " + newForm);
}

const wolf = { name: "Wolf" };
const eagle = { name: "Eagle" };

shapeshift.call(wolf, "dragon");  // "Wolf becomes dragon"
shapeshift.apply(eagle, ["phoenix"]); // "Eagle becomes phoenix"

const wolfShift = shapeshift.bind(wolf);
wolfShift("serpent"); // "Wolf becomes serpent" (always wolf)`;

const newBindingCode = `function Shapeshifter(name) {
  // new creates a fresh object and sets this to it
  this.name = name;
  this.form = "base";
}

const hero = new Shapeshifter("Mystique");
console.log(hero.name); // "Mystique"
console.log(hero.form); // "base"`;

const priorityCode = `const obj = {
  name: "implicit",
  greet() { return this.name; },
};

// explicit beats implicit
obj.greet.call({ name: "explicit" }); // "explicit"

// new beats explicit
const Bound = obj.greet.bind({ name: "bound" });
const instance = new Bound();
console.log(instance.name); // undefined — new won!`;

export default function BindingRulesPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Binding Rules</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          JavaScript has four rules that determine what this becomes. They have a
          strict priority order — knowing it means you can always predict this.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Four Rules</h2>
          <p className="text-muted-foreground">
            Each rule has a priority. When multiple rules could apply, the
            higher-priority rule wins. Explore each one:
          </p>
          <ExampleBindingRules />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Rule 3: Implicit Binding
          </h2>
          <p className="text-muted-foreground">
            The most common rule — when a function is called as a method, the
            object before the dot becomes{" "}
            <code className="text-foreground">this</code>:
          </p>
          <CodeBlock code={implicitCode} filename="implicit-binding.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Rule 2: Explicit Binding
          </h2>
          <p className="text-muted-foreground">
            <code className="text-foreground">call</code>,{" "}
            <code className="text-foreground">apply</code>, and{" "}
            <code className="text-foreground">bind</code> let you manually choose{" "}
            <code className="text-foreground">this</code>.{" "}
            <code className="text-foreground">bind</code> locks it permanently:
          </p>
          <CodeBlock code={explicitCode} filename="explicit-binding.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Rule 1: new Binding
          </h2>
          <p className="text-muted-foreground">
            The <code className="text-foreground">new</code> keyword creates a
            fresh object and forces{" "}
            <code className="text-foreground">this</code> to point to it. Highest
            priority:
          </p>
          <CodeBlock code={newBindingCode} filename="new-binding.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Priority in Action</h2>
          <p className="text-muted-foreground">
            When rules conflict, the higher-priority one wins:{" "}
            <strong>new &gt; explicit &gt; implicit &gt; default</strong>.
          </p>
          <CodeBlock code={priorityCode} filename="priority-conflict.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <strong>#1 new</strong> — creates a new object,{" "}
              <code className="text-foreground">this</code> = that object
            </li>
            <li>
              <strong>#2 Explicit</strong> —{" "}
              <code className="text-foreground">call</code>/
              <code className="text-foreground">apply</code>/
              <code className="text-foreground">bind</code> set{" "}
              <code className="text-foreground">this</code> manually
            </li>
            <li>
              <strong>#3 Implicit</strong> — method call,{" "}
              <code className="text-foreground">this</code> = object before the
              dot
            </li>
            <li>
              <strong>#4 Default</strong> — loose call,{" "}
              <code className="text-foreground">this</code> ={" "}
              <code className="text-foreground">window</code>/
              <code className="text-foreground">undefined</code>
            </li>
          </ul>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
