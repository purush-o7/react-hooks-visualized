"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";
import { ScrollReveal } from "@/components/scroll-reveal";

import { ExampleParentChildCascade } from "./_components/example-parent-child-cascade";

const cascadeCode = `function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>

      {/* Child re-renders even though name NEVER changes */}
      <Child name="Alice" />
    </div>
  );
}

function Child({ name }) {
  // This entire function re-runs when Parent renders
  return <span>Hello, {name}</span>;
}`;

const memoFix = `const MemoChild = React.memo(Child);

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>

      {/* Now Child only re-renders if name changes */}
      <MemoChild name="Alice" />
    </div>
  );
}`;

export default function RenderCascadePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Render Cascade</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          When a parent renders, all its children render too — even if their
          props didn&apos;t change.
        </TextEffect>
      </div>

      {/* ── The Default Behavior ── */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Default Behavior</h2>
          <p className="text-muted-foreground">
            React&apos;s default is to re-render the entire subtree when a
            component&apos;s state changes. The child doesn&apos;t need to have
            new props — it re-renders simply because its parent did.
          </p>
          <CodeBlock code={cascadeCode} filename="cascade.tsx" />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* ── Interactive Demo ── */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Watch the Cascade</h2>
          <p className="text-muted-foreground">
            Click the parent&apos;s counter button. Both the parent{" "}
            <em>and</em> the child render counts go up, even though the
            child&apos;s prop stays &quot;Alice&quot; the entire time.
          </p>
          <ExampleParentChildCascade />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* ── The Fix ── */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">How to Prevent It</h2>
          <p className="text-muted-foreground">
            Use <code className="text-foreground">React.memo()</code> to tell
            React: &quot;only re-render this child if its props actually
            changed.&quot;
          </p>
          <CodeBlock code={memoFix} filename="memo-fix.tsx" />
          <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
            <p className="font-medium">When to use React.memo:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>The child renders often due to parent state changes</li>
              <li>The child&apos;s output is the same given the same props</li>
              <li>The child is expensive to render</li>
            </ul>
            <p className="text-muted-foreground pt-1">
              But beware: if you pass <em>objects</em> or <em>functions</em> as
              props, memo alone won&apos;t help — you&apos;ll also need{" "}
              <code className="text-foreground">useMemo</code> and{" "}
              <code className="text-foreground">useCallback</code> to stabilize
              references.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
