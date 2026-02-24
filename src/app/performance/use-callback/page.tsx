"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { RedialFrenzy } from "./_components/redial-frenzy";
import { SpeedDial } from "./_components/speed-dial";
import { PhoneBriefing } from "./_components/phone-briefing";
import { PlaygroundCallLog } from "./_components/playground-call-log";
import { PlaygroundFunctionalUpdate } from "./_components/playground-functional-update";
import { PlaygroundSpeedDialGuide } from "./_components/playground-speed-dial-guide";

const USE_CALLBACK_MISTAKES: Mistake[] = [
  {
    title: "useCallback without React.memo on the child",
    subtitle: "Stabilizing a function reference when the child re-renders regardless",
    filename: "parent.tsx",
    wrongCode: `function Parent() {
  const [count, setCount] = useState(0);

  // Stable reference, but child isn't memoized — useless
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <ChildItem onClick={handleClick} />;
}

function ChildItem({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}`,
    rightCode: `function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <MemoizedChild onClick={handleClick} />;
}

// Now useCallback actually prevents re-renders
const MemoizedChild = React.memo(function ChildItem({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});`,
    explanation:
      "useCallback preserves the function reference across renders. But if the child isn't wrapped in React.memo, it re-renders whenever the parent re-renders — regardless of props. The stable reference provides zero benefit. Either add React.memo to the child, or remove the useCallback.",
  },
  {
    title: "useCallback on native DOM elements",
    subtitle: "Wrapping handlers passed to <button>, <input>, etc.",
    filename: "search.tsx",
    wrongCode: `function SearchBar() {
  const [query, setQuery] = useState("");

  // useCallback is pointless on a native <input>
  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  return <input onChange={handleChange} value={query} />;
}`,
    rightCode: `function SearchBar() {
  const [query, setQuery] = useState("");

  // Inline handler — simpler and equally performant
  return (
    <input
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
}`,
    explanation:
      "Native DOM elements don't perform prop comparison. They never bail out of updates based on referential equality. useCallback adds overhead with no possible upside when the handler is passed directly to a native HTML element.",
  },
  {
    title: "Function as useEffect dependency without useCallback",
    subtitle: "A function in the dependency array that creates a new reference every render",
    filename: "profile.tsx",
    wrongCode: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // New function every render
  const fetchData = () => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]); // infinite loop!
}`,
    rightCode: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // Option A: move function inside useEffect
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  // Option B: stabilize with useCallback
  // const fetchData = useCallback(() => { ... }, [userId]);
}`,
    explanation:
      "A function defined in the component body is recreated every render. If it's in useEffect's dependency array, the effect sees a 'new' dependency each time and re-runs. If the effect updates state, it triggers a re-render — infinite loop. Move the function inside useEffect, or wrap it in useCallback.",
  },
];

export default function UseCallbackPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useCallback</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Why does your phone keep engraving a new dial button every screen
          refresh?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>📱</span> Theme: Phone Speed Dial
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a phone with speed-dial buttons. Every render, the
            phone re-engraves all its buttons &mdash; even though the contacts
            haven&apos;t changed. Memo&apos;d children (ContactList) compare
            button serial numbers, so re-engraved buttons look
            &quot;new&quot; and trigger a re-render. useCallback keeps the same
            button until contacts actually change.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Problem — Redial Frenzy */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Redial Frenzy</h2>
          <p className="text-muted-foreground">
            Without useCallback, a new function is stamped out on every render.
            Your memo&apos;d contact list sees a &quot;new&quot; dial button
            serial and re-renders — even though nothing actually changed.
          </p>
          <RedialFrenzy />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: The Fix — Speed Dial */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Speed Dial</h2>
          <p className="text-muted-foreground">
            useCallback engraves the function once and keeps the same button
            serial between renders. Now memo() can do its job — the contact list
            stays put.
          </p>
          <SpeedDial />
        </section>
      </ScrollReveal>

      {/* Section 3: Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Briefing</h2>
          <PhoneBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              Three playgrounds to explore how speed dial works, when to reach
              for it, and how to keep callbacks stable even when state changes.
            </p>
          </div>

          <PlaygroundCallLog />
          <PlaygroundFunctionalUpdate />
          <PlaygroundSpeedDialGuide />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_CALLBACK_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
