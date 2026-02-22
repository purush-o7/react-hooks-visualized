"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleReferenceTrap } from "./_components/example-reference-trap";

const trapCode = `function MyComponent() {
  // New object created every render!
  const style = { color: "red", fontSize: 16 };

  useEffect(() => {
    console.log("style changed!"); // runs EVERY render 😱
  }, [style]); // style is a new reference each time

  return <div style={style}>Hello</div>;
}`;

const fixCode = `function MyComponent() {
  // Same object reference across renders
  const style = useMemo(
    () => ({ color: "red", fontSize: 16 }),
    [] // no deps = stable forever
  );

  useEffect(() => {
    console.log("style changed!"); // runs only once ✅
  }, [style]);

  return <div style={style}>Hello</div>;
}`;

const callbackTrap = `function Parent() {
  const [count, setCount] = useState(0);

  // New function reference every render!
  const handleClick = () => console.log("clicked");

  // MemoChild re-renders anyway because handleClick is "new"
  return <MemoChild onClick={handleClick} />;
}`;

const callbackFix = `function Parent() {
  const [count, setCount] = useState(0);

  // Stable function reference across renders
  const handleClick = useCallback(
    () => console.log("clicked"),
    []
  );

  // MemoChild correctly skips re-render ✅
  return <MemoChild onClick={handleClick} />;
}`;

export default function ReferenceTrapPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">The Reference Trap</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Inline objects and functions create new references every render. Same
          values, but React thinks they changed.
        </TextEffect>
      </div>

      {/* ── The Trap ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Trap</h2>
        <p className="text-muted-foreground">
          In JavaScript,{" "}
          <code className="text-foreground">
            {"{ color: \"red\" } !== { color: \"red\" }"}
          </code>
          . Two objects with identical values are <em>different</em> objects in
          memory. React uses <code className="text-foreground">===</code> to
          compare dependencies, so it sees a &quot;change&quot; every render.
        </p>
        <CodeBlock code={trapCode} filename="reference-trap.tsx" />
      </section>

      <Separator />

      {/* ── Interactive Demo ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">See It In Action</h2>
        <p className="text-muted-foreground">
          Click the button to force a re-render. The object values are identical
          every time, but <code className="text-foreground">===</code>{" "}
          comparison returns false because it&apos;s a new object in memory.
        </p>
        <ExampleReferenceTrap />
      </section>

      <Separator />

      {/* ── Objects Fix ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Fix: useMemo for Objects</h2>
        <p className="text-muted-foreground">
          Wrap inline objects in{" "}
          <code className="text-foreground">useMemo</code> to keep the same
          reference across renders:
        </p>
        <CodeBlock code={fixCode} filename="stable-object.tsx" />
      </section>

      <Separator />

      {/* ── Functions Fix ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Fix: useCallback for Functions</h2>
        <p className="text-muted-foreground">
          The same trap applies to functions. A function defined inside the
          component is re-created every render:
        </p>
        <CodeBlock code={callbackTrap} filename="function-trap.tsx" />
        <p className="text-muted-foreground">
          Use <code className="text-foreground">useCallback</code> to keep a
          stable function reference:
        </p>
        <CodeBlock code={callbackFix} filename="stable-function.tsx" />
      </section>

      <Separator />

      {/* ── Summary ── */}
      <section className="space-y-4">
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <p className="font-medium">The rule of thumb:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Inline <strong>objects/arrays</strong> → stabilize with{" "}
              <code className="text-foreground">useMemo</code>
            </li>
            <li>
              Inline <strong>functions</strong> → stabilize with{" "}
              <code className="text-foreground">useCallback</code>
            </li>
            <li>
              Only do this when the reference is used as a{" "}
              <strong>dependency</strong> or passed to a{" "}
              <strong>memoized child</strong>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
