"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { CodeBlock } from "@/components/code-block";

import { VisualRenderClosures } from "./_components/visual-render-closures";
import { ExampleStaleEffect } from "./_components/example-stale-effect";

const renderClosureCode = `function Counter() {
  const [count, setCount] = useState(0);

  // Render 1: count = 0
  // Render 2: count = 1
  // Render 3: count = 2
  // Each render creates a NEW closure with its own 'count'

  useEffect(() => {
    // This effect closes over the 'count' from THIS render
    document.title = \`Count: \${count}\`;
  }, [count]); // dependency array tells React when to re-run

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`;

const depArrayCode = `useEffect(() => {
  // This function is a closure over 'count'
  const id = setInterval(() => {
    console.log(count); // Which count? The one from THIS render
  }, 1000);
  return () => clearInterval(id);
}, [count]); // Re-create when count changes

// Without [count], this would be a stale closure!
// The effect would always see count from the first render.`;

export default function ClosuresAndHooksPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Closures &amp; Hooks</h1>
          <Badge>Foundational</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Every React render creates a new closure. This is the reason dependency
          arrays exist — and why forgetting a dependency causes stale bugs.
        </TextEffect>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Each Render = New Closure</h2>
        <p className="text-muted-foreground">
          When React renders your component, it calls the function. All the
          variables, effects, and handlers created during that call form a
          closure — a snapshot of that render&apos;s values:
        </p>
        <CodeBlock code={renderClosureCode} filename="render-closure.jsx" />
        <VisualRenderClosures />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Dependency Arrays Exist</h2>
        <p className="text-muted-foreground">
          The dependency array tells React: &quot;re-run this effect when these
          values change.&quot; Without it, the effect captures stale values from
          the first render and never updates:
        </p>
        <CodeBlock code={depArrayCode} filename="dependency-array.jsx" />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Stale Effect Trap</h2>
        <p className="text-muted-foreground">
          Forgetting a dependency means your effect runs with an old closure.
          Try this interactive example — notice how the missing dependency
          causes the effect to read a stale value:
        </p>
        <ExampleStaleEffect />
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="rounded-lg bg-muted/50 p-4 space-y-2 text-sm">
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Each render calls your component function, creating a <strong>new closure</strong>
            </li>
            <li>
              All hooks in that render close over that render&apos;s values
            </li>
            <li>
              <strong>Dependency arrays</strong> tell React which closures to
              replace
            </li>
            <li>
              Missing a dependency = <strong>stale closure</strong> = bug
            </li>
            <li>
              This is why the React exhaustive-deps ESLint rule exists
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
