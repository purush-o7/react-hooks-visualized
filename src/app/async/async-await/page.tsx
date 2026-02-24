"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleOrderFlow } from "./_components/example-order-flow";
import { ExampleTryCatch } from "./_components/example-try-catch";

const promiseVsAwaitCode = `// Promise chain
function fetchUserData() {
  return fetch("/api/user")
    .then(res => res.json())
    .then(user => fetch(\`/api/orders/\${user.id}\`))
    .then(res => res.json());
}

// Async/await — same logic, reads top-to-bottom
async function fetchUserData() {
  const res = await fetch("/api/user");
  const user = await res.json();
  const ordersRes = await fetch(\`/api/orders/\${user.id}\`);
  return ordersRes.json();
}`;

const tryCatchCode = `async function placeOrder(item) {
  try {
    const order = await createOrder(item);
    const confirmation = await processPayment(order.id);
    return confirmation;
  } catch (error) {
    // Catches errors from ANY await above
    console.error("Order failed:", error.message);
    throw error; // re-throw if caller should handle it
  } finally {
    // Always runs — cleanup logic goes here
    hideLoadingSpinner();
  }
}`;

const notSugarCode = `// async/await is syntactic sugar over promises
// These are IDENTICAL:

// Version 1: Promise
function getUser() {
  return fetch("/user").then(r => r.json());
}

// Version 2: async/await
async function getUser() {
  const r = await fetch("/user");
  return r.json(); // auto-wrapped in a Promise
}

// An async function ALWAYS returns a Promise`;

export default function AsyncAwaitPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Async / Await</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Async/await makes promise-based code read like synchronous code.
          Same promises underneath, but much cleaner syntax.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Promise vs Await</h2>
        <p className="text-muted-foreground">
          <code className="text-foreground">async/await</code> is syntactic
          sugar over promises. The same logic, but reads top-to-bottom:
        </p>
        <CodeBlock code={promiseVsAwaitCode} filename="promise-vs-await.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Step-Through Comparison</h2>
        <p className="text-muted-foreground">
          Watch an order flow execute step by step. Each{" "}
          <code className="text-foreground">await</code> pauses the function
          until the promise resolves:
        </p>
        <ExampleOrderFlow />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Error Handling with try/catch</h2>
        <p className="text-muted-foreground">
          Replace <code className="text-foreground">.catch()</code> with
          familiar try/catch blocks:
        </p>
        <CodeBlock code={tryCatchCode} filename="try-catch.js" />
        <ExampleTryCatch />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">It&apos;s Still Promises</h2>
        <p className="text-muted-foreground">
          An <code className="text-foreground">async</code> function always
          returns a Promise. <code className="text-foreground">await</code>{" "}
          simply unwraps it:
        </p>
        <CodeBlock code={notSugarCode} filename="still-promises.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              <code className="text-foreground">async</code> marks a function
              as returning a Promise
            </li>
            <li>
              <code className="text-foreground">await</code> pauses execution
              until the Promise resolves
            </li>
            <li>
              Use <code className="text-foreground">try/catch</code> for error
              handling instead of{" "}
              <code className="text-foreground">.catch()</code>
            </li>
            <li>
              An async function <strong>always returns a Promise</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
