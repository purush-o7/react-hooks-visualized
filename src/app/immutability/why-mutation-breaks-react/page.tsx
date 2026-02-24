"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleInvisibleEdit } from "./_components/example-invisible-edit";

const brokenCode = `function PotEditor() {
  const [pot, setPot] = useState({ color: "red", size: "large" });

  const handleChange = () => {
    pot.color = "blue";  // MUTATION! Same reference
    setPot(pot);         // React: Object.is(old, new) → true
                         // "Nothing changed" → no re-render!
  };

  return <div>{pot.color}</div>; // still shows "red"
}`;

const fixedCode = `function PotEditor() {
  const [pot, setPot] = useState({ color: "red", size: "large" });

  const handleChange = () => {
    setPot({
      ...pot,          // copy existing properties
      color: "blue",   // override what changed
    });
    // New object → new reference → React re-renders ✅
  };

  return <div>{pot.color}</div>; // shows "blue"
}`;

const objectIsCode = `// React uses Object.is() to compare state
Object.is(3, 3);               // true  → no re-render
Object.is("hello", "hello");   // true  → no re-render
Object.is(oldObj, newObj);      // false → RE-RENDER!
Object.is(oldObj, oldObj);      // true  → no re-render (mutation trap!)`;

export default function WhyMutationBreaksReactPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Why Mutation Breaks React</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          React compares state by reference using Object.is(). If you mutate
          the same object, React thinks nothing changed — and skips the
          re-render.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How React Detects Changes</h2>
        <p className="text-muted-foreground">
          When you call{" "}
          <code className="text-foreground">setState</code>, React compares the
          old and new values using{" "}
          <code className="text-foreground">Object.is()</code>. For objects,
          this checks if they&apos;re the <em>same reference</em> — not
          whether the contents match:
        </p>
        <CodeBlock code={objectIsCode} filename="object-is.js" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Invisible Edit</h2>
        <p className="text-muted-foreground">
          This is what happens when you mutate state directly. The data changes
          in memory, but React never knows about it:
        </p>
        <CodeBlock code={brokenCode} filename="broken-mutation.jsx" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See It Live</h2>
        <p className="text-muted-foreground">
          Try both approaches — mutation (broken) and immutable update (works).
          The mutation changes the data but the screen never updates:
        </p>
        <ExampleInvisibleEdit />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: New Object</h2>
        <p className="text-muted-foreground">
          Always create a <em>new</em> object when updating state. The spread
          operator is the simplest way:
        </p>
        <CodeBlock code={fixedCode} filename="immutable-update.jsx" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              React uses{" "}
              <code className="text-foreground">Object.is()</code> to
              compare old vs new state
            </li>
            <li>
              Same reference = &quot;nothing changed&quot; = no re-render
            </li>
            <li>
              <strong>Mutation</strong> keeps the same reference — React misses
              the update
            </li>
            <li>
              <strong>New object</strong> (via spread) = new reference = React
              re-renders
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
