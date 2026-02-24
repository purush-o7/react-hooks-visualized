"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleAsyncEffect } from "./_components/example-async-effect";
import { ExampleRaceCondition } from "./_components/example-race-condition";

const wrongCode = `// useEffect callback can't be async
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
// This returns a Promise to useEffect,
// but useEffect expects a cleanup function (or nothing)`;

const rightCode = `// Define an async function INSIDE the effect
useEffect(() => {
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }
  loadData();
}, []);`;

const abortCode = `useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const res = await fetch("/api/data", {
        signal: controller.signal,
      });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err.name !== "AbortError") throw err;
      // Fetch was cancelled — component unmounted
    }
  }

  loadData();
  return () => controller.abort(); // cleanup!
}, []);`;

const raceCode = `// Race condition: fast type, slow network
// User types: "a" -> "ab" -> "abc"
// Fetches return in wrong order!

useEffect(() => {
  let cancelled = false;

  async function search() {
    const results = await fetchResults(query);
    if (!cancelled) {
      setResults(results); // only update if still relevant
    }
  }

  search();
  return () => { cancelled = true; }; // cancel stale request
}, [query]);`;

export default function AsyncInReactPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Async in React</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          React effects and async code need careful coordination. Learn why
          useEffect can&apos;t be async and how to prevent race conditions.
        </TextEffect>
      </div>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Why useEffect Can&apos;t Be Async
          </h2>
          <p className="text-muted-foreground">
            <code className="text-foreground">useEffect</code> expects its
            callback to return either nothing or a cleanup function. An async
            function returns a Promise — which React can&apos;t use for cleanup:
          </p>
          <CodeBlock code={wrongCode} filename="wrong-async-effect.jsx" />
          <CodeBlock code={rightCode} filename="correct-async-effect.jsx" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Pattern in Practice</h2>
          <p className="text-muted-foreground">
            Try loading data inside an effect — see how the async function is
            defined inside and immediately called:
          </p>
          <ExampleAsyncEffect />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Cleanup with AbortController</h2>
          <p className="text-muted-foreground">
            When the component unmounts or dependencies change, you need to
            cancel in-flight requests. Use{" "}
            <code className="text-foreground">AbortController</code>:
          </p>
          <CodeBlock code={abortCode} filename="abort-controller.jsx" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Race Conditions</h2>
          <p className="text-muted-foreground">
            When the dependency changes faster than the fetch resolves, older
            responses can overwrite newer ones. Use a cancelled flag or
            AbortController to prevent this:
          </p>
          <CodeBlock code={raceCode} filename="race-condition-fix.jsx" />
          <ExampleRaceCondition />
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
                <code className="text-foreground">useEffect</code> can&apos;t be
                async — define an async function inside and call it
              </li>
              <li>
                Always <strong>clean up</strong> with AbortController or a
                cancelled flag
              </li>
              <li>
                <strong>Race conditions</strong> happen when responses arrive out
                of order
              </li>
              <li>
                Consider <code className="text-foreground">TanStack Query</code>{" "}
                for production data fetching — it handles all of this for you
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
