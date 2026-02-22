"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { ExampleConsoleEveryRender } from "./_components/example-console-every-render";

const everyRenderCode = `function Profile({ user }) {
  // ALL of this runs on EVERY render:
  const fullName = user.first + " " + user.last;
  const initials = fullName.split(" ").map(n => n[0]).join("");
  const now = Date.now();
  console.log("rendered at", now);

  const [bio, setBio] = useState("");

  // Typing in bio → re-render → ALL the above re-runs
  return (
    <div>
      <span>{initials}</span>
      <input value={bio} onChange={e => setBio(e.target.value)} />
    </div>
  );
}`;

export default function CodeReexecutionPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Code Re-execution</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          There are no &quot;skip zones&quot; in a component function. Every
          line runs on every render.
        </TextEffect>
      </div>

      {/* ── The Concept ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Everything Runs Again</h2>
        <p className="text-muted-foreground">
          When React renders your component, it runs the{" "}
          <strong>entire function body</strong> from top to bottom. Every
          variable declaration, every calculation, every function definition —
          all of it.
        </p>
        <CodeBlock code={everyRenderCode} filename="profile.tsx" />
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <p className="font-medium">What re-runs on every render:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Variable declarations and computations</li>
            <li>Function definitions (including event handlers)</li>
            <li>Object and array literals (new reference each time!)</li>
            <li>console.log, Date.now(), Math.random()</li>
            <li>Everything <em>except</em> what hooks memoize</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* ── Interactive Demo ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Watch It Happen</h2>
        <p className="text-muted-foreground">
          Type in the input below. Each keystroke triggers a re-render. Watch
          the console panel — every render produces a different{" "}
          <code className="text-foreground">Date.now()</code> and{" "}
          <code className="text-foreground">Math.random()</code> because the
          entire function re-executes.
        </p>
        <ExampleConsoleEveryRender />
      </section>

      <Separator />

      {/* ── Why It Matters ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why This Matters</h2>
        <p className="text-muted-foreground">
          Most of the time, re-running code is fast and harmless. But it becomes
          a problem when:
        </p>
        <div className="grid gap-2 text-sm">
          {[
            "You have an expensive calculation (sorting, filtering large arrays)",
            "You create objects/arrays that are used as hook dependencies",
            "You define callback functions passed to memoized children",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
              <span className="text-xs font-mono text-muted-foreground w-4 shrink-0">
                {i + 1}.
              </span>
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          This is exactly why hooks like{" "}
          <code className="text-foreground">useMemo</code> and{" "}
          <code className="text-foreground">useCallback</code> exist — they let
          you tell React &quot;skip this on re-render if the inputs
          haven&apos;t changed.&quot;
        </p>
      </section>
    </div>
  );
}
