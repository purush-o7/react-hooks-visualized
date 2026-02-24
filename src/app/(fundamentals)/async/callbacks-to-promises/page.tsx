"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleCallbackHell } from "./_components/example-callback-hell";
import { ExamplePromiseMethods } from "./_components/example-promise-methods";

const callbackCode = `// Callback Hell — deeply nested, hard to read
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getShipping(details.trackingId, (shipping) => {
        console.log(shipping.status);
        // 4 levels deep — and error handling is a nightmare
      });
    });
  });
});`;

const promiseCode = `// Promises — flat chain, much easier to follow
getUser(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getShipping(details.trackingId))
  .then(shipping => console.log(shipping.status))
  .catch(error => console.error("Something failed:", error));`;

const promiseAllCode = `// Promise.all — run multiple promises in parallel
const [user, settings, notifications] = await Promise.all([
  fetchUser(),        // starts immediately
  fetchSettings(),    // starts immediately
  fetchNotifications() // starts immediately
]);
// All three run at the same time!
// Resolves when ALL complete, rejects if ANY fail`;

const promiseRaceCode = `// Promise.race — first one to finish wins
const result = await Promise.race([
  fetchFromServer(),
  timeout(5000), // reject after 5 seconds
]);
// Useful for implementing timeouts`;

export default function CallbacksToPromisesPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Callbacks to Promises</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          From nested callback pyramids to clean promise chains. Promises are
          the foundation of modern async JavaScript.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Callback Hell</h2>
          <p className="text-muted-foreground">
            When async operations depend on each other, callbacks nest deeper and
            deeper — the infamous &quot;pyramid of doom&quot;:
          </p>
          <CodeBlock code={callbackCode} filename="callback-hell.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">See the Pyramid</h2>
          <p className="text-muted-foreground">
            Watch a sequence of dependent async operations. Compare the callback
            nesting with the flat promise chain:
          </p>
          <ExampleCallbackHell />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Promises Flatten Everything</h2>
          <p className="text-muted-foreground">
            A Promise represents a value that will be available later. Chaining{" "}
            <code className="text-foreground">.then()</code> keeps the code flat:
          </p>
          <CodeBlock code={promiseCode} filename="promise-chain.js" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Promise Combinators</h2>
          <p className="text-muted-foreground">
            When you need to run multiple promises together:
          </p>
          <CodeBlock code={promiseAllCode} filename="promise-all.js" />
          <CodeBlock code={promiseRaceCode} filename="promise-race.js" />
          <ExamplePromiseMethods />
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
                <strong>Callbacks</strong> nest deeply and make error handling
                difficult
              </li>
              <li>
                <strong>Promises</strong> flatten async code into{" "}
                <code className="text-foreground">.then()</code> chains
              </li>
              <li>
                <code className="text-foreground">Promise.all</code> runs
                promises in parallel, resolves when all complete
              </li>
              <li>
                <code className="text-foreground">Promise.race</code> resolves
                with the first promise to settle
              </li>
              <li>
                <code className="text-foreground">.catch()</code> handles errors
                anywhere in the chain
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
