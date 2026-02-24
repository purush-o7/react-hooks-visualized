"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleLoopTrap } from "./_components/example-loop-trap";

const varLoopCode = `// THE TRAP — var is function-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // all print 3!
  }, 100);
}
// There's only ONE 'i', and it's 3 by the time callbacks run`;

const letLoopCode = `// THE FIX — let is block-scoped
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // prints 0, 1, 2 ✅
  }, 100);
}
// Each iteration creates its own 'i' — a new capsule each time`;

const iifeFixCode = `// Pre-ES6 fix: IIFE creates a new scope per iteration
for (var i = 0; i < 3; i++) {
  (function (captured) {
    setTimeout(() => {
      console.log(captured); // prints 0, 1, 2 ✅
    }, 100);
  })(i);
}`;

export default function ClosuresInLoopsPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Closures in Loops</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          The classic interview question: why do all your loop callbacks print
          the same value? Understanding this unlocks how closures really work.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The var Trap</h2>
          <p className="text-muted-foreground">
            With <code className="text-foreground">var</code>, all iterations
            share the same variable. By the time the callbacks execute, the loop
            is finished and{" "}
            <code className="text-foreground">i</code> is already at its final
            value:
          </p>
          <CodeBlock code={varLoopCode} filename="var-loop.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">See It Live</h2>
          <p className="text-muted-foreground">
            Watch the difference between{" "}
            <code className="text-foreground">var</code> and{" "}
            <code className="text-foreground">let</code> in real time. Each
            button schedules 3 timeouts — but the results are very different:
          </p>
          <ExampleLoopTrap />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The let Fix</h2>
          <p className="text-muted-foreground">
            <code className="text-foreground">let</code> is block-scoped: each
            loop iteration creates a <em>new</em> binding. Each closure captures
            its own unique copy:
          </p>
          <CodeBlock code={letLoopCode} filename="let-loop.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Old-School Fix: IIFE</h2>
          <p className="text-muted-foreground">
            Before <code className="text-foreground">let</code> existed,
            developers used an Immediately Invoked Function Expression (IIFE) to
            create a fresh scope per iteration:
          </p>
          <CodeBlock code={iifeFixCode} filename="iife-fix.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <code className="text-foreground">var</code> is
                function-scoped — one variable shared across all iterations
              </li>
              <li>
                <code className="text-foreground">let</code> is block-scoped —
                each iteration gets its own binding (its own time capsule)
              </li>
              <li>
                Closures capture variables <strong>by reference</strong>, not by
                value — that&apos;s why <code className="text-foreground">var</code>{" "}
                creates a trap
              </li>
              <li>
                This same principle causes <strong>stale closures</strong> in
                React hooks
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
