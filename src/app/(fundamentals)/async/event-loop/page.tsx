"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { VisualRestaurantFloor } from "./_components/visual-restaurant-floor";

const eventLoopCode = `console.log("1: Take order");        // Call stack (immediate)

setTimeout(() => {
  console.log("2: Food ready");       // Callback queue (after timer)
}, 0);

Promise.resolve().then(() => {
  console.log("3: Check on table");   // Microtask queue (priority)
});

console.log("4: Greet new guest");    // Call stack (immediate)

// Output: 1, 4, 3, 2
// Synchronous first, then microtasks, then callbacks`;

const singleThreadCode = `// JavaScript has ONE call stack — like one waiter
// It can only do one thing at a time

function takeOrder() {
  console.log("Taking order...");     // blocks until done
  heavyComputation();                  // blocks the ENTIRE restaurant
  console.log("Order taken");          // only runs after computation
}

// This is why setTimeout(fn, 0) doesn't run immediately
// — it waits for the call stack to be empty`;

export default function EventLoopPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">The Event Loop</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          JavaScript is single-threaded. The event loop is how it handles async
          operations without blocking — like a waiter managing multiple tables.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Restaurant Model</h2>
          <p className="text-muted-foreground">
            Think of JavaScript like a restaurant with one waiter:
          </p>
          <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <strong>Call Stack</strong> = the waiter — handles one task at a
                time
              </li>
              <li>
                <strong>Web APIs</strong> = the kitchen — works in parallel
                (timers, fetch, DOM events)
              </li>
              <li>
                <strong>Callback Queue</strong> = the pass — completed orders
                waiting for the waiter
              </li>
              <li>
                <strong>Event Loop</strong> = the waiter checking the pass when
                their hands are free
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Watch It Work</h2>
          <p className="text-muted-foreground">
            Step through the event loop to see how synchronous code, promises,
            and setTimeout are processed in order:
          </p>
          <VisualRestaurantFloor />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Execution Order</h2>
          <p className="text-muted-foreground">
            This is the classic event loop quiz. Can you predict the output
            before reading the answer?
          </p>
          <CodeBlock code={eventLoopCode} filename="event-loop-quiz.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Why Single-Threaded Matters</h2>
          <p className="text-muted-foreground">
            JavaScript can only execute one piece of code at a time. Long-running
            synchronous code blocks everything:
          </p>
          <CodeBlock code={singleThreadCode} filename="single-threaded.js" />
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
                JavaScript is <strong>single-threaded</strong> — one call stack
              </li>
              <li>
                <strong>Web APIs</strong> handle async work (timers, network,
                events) in parallel
              </li>
              <li>
                The <strong>event loop</strong> moves callbacks to the call stack
                when it&apos;s empty
              </li>
              <li>
                <strong>Microtasks</strong> (promises) run before{" "}
                <strong>macrotasks</strong> (setTimeout)
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
