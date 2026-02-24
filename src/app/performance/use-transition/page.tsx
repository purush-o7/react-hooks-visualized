"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { OverwhelmedER } from "./_components/overwhelmed-er";
import { TriageSystem } from "./_components/triage-system";
import { ERBriefing } from "./_components/er-briefing";
import { PlaygroundPatientLookup } from "./_components/playground-patient-lookup";
import { PlaygroundTriageGuide } from "./_components/playground-triage-guide";
import { PlaygroundWardRounds } from "./_components/playground-ward-rounds";

const USE_TRANSITION_MISTAKES: Mistake[] = [
  {
    title: "Wrapping all state updates in transitions",
    subtitle: "Treating startTransition as a general-purpose performance tool",
    filename: "search.tsx",
    wrongCode: `function Search({ items }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const onChange = (e) => {
    startTransition(() => {
      setQuery(e.target.value);              // urgent — should NOT be here
      setFiltered(expensiveFilter(items, e.target.value));
    });
  };

  // Input feels laggy because the urgent update is deferred too
  return <input value={query} onChange={onChange} />;
}`,
    rightCode: `function Search({ items }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  const onChange = (e) => {
    setQuery(e.target.value);                // urgent — updates immediately
    startTransition(() => {
      setFiltered(expensiveFilter(items, e.target.value)); // deferred
    });
  };

  return <input value={query} onChange={onChange} />;
}`,
    explanation:
      "useTransition causes two renders instead of one — first with isPending=true and old state, then with the new state. If the update was already fast, you've doubled the work. Only wrap genuinely expensive, non-urgent updates. Keep urgent updates (input values, button states) outside the transition.",
  },
  {
    title: "Using transitions for network requests",
    subtitle: "Wrapping fetch calls in startTransition expecting it to manage loading",
    filename: "users.tsx",
    wrongCode: `function UserList() {
  const [users, setUsers] = useState([]);
  const [isPending, startTransition] = useTransition();

  const loadUsers = () => {
    startTransition(() => {
      fetch("/api/users")                // async — transition ends immediately
        .then(res => res.json())
        .then(data => setUsers(data));   // isPending already false
    });
  };

  return <button>{isPending ? "Loading..." : "Load"}</button>;
}`,
    rightCode: `function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const loadUsers = async () => {
    setIsLoading(true);
    const data = await fetch("/api/users").then(r => r.json());
    setIsLoading(false);
    startTransition(() => setUsers(data)); // only the render is deferred
  };

  return <button>{isLoading ? "Loading..." : "Load"}</button>;
}`,
    explanation:
      "useTransition is for CPU-bound rendering work, not I/O. It doesn't 'wait' for promises. The transition completes immediately while the fetch is still in flight, so isPending flips back to false before data arrives. Use separate loading state for network requests.",
  },
  {
    title: "Not showing pending UI feedback",
    subtitle: "Using startTransition but ignoring the isPending boolean entirely",
    filename: "tabs.tsx",
    wrongCode: `function TabPanel() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  return (
    <button onClick={() => startTransition(() => setTab("analytics"))}>
      Analytics
    </button>
    // User sees nothing during the transition — feels broken
  );
}`,
    rightCode: `function TabPanel() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        onClick={() => startTransition(() => setTab("analytics"))}
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Analytics"}
      </button>
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {tab === "analytics" && <HeavyAnalytics />}
      </div>
    </>
  );
}`,
    explanation:
      "The whole point of a transition is to keep the UI responsive while showing the user that work is in progress. Without isPending feedback, the user clicks and sees nothing happen for hundreds of milliseconds, which feels broken. Always use isPending to display spinners, reduced opacity, or disabled states.",
  },
];

export default function UseTransitionPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useTransition</h1>
          <Badge variant="secondary">Performance</Badge>
        </div>
        <TextEffect preset="fade-in-blur" per="word" className="text-muted-foreground">
          What if heavy renders never jammed your ER&apos;s emergency hotline?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🏥</span> Theme: Emergency Room
          </p>
          <p className="text-sm text-muted-foreground">
            Your UI is a hospital ER. Without triage, every update &mdash;
            typing in the search box, rendering 10,000 patient records &mdash;
            fights for the same thread. The hotline freezes while records load.
            useTransition is the triage nurse: it keeps the hotline (urgent
            updates like typing) open while heavy patient records process in
            the background.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: Overwhelmed ER — the broken before */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Overwhelmed ER</h2>
          <p className="text-muted-foreground">
            Without useTransition, every keystroke blocks the main thread. React
            must finish filtering all 10,000 patient records before it can update
            the input — the emergency hotline goes dead.
          </p>
          <OverwhelmedER />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: Triage System — the fixed after */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Triage System</h2>
          <p className="text-muted-foreground">
            useTransition acts as the triage nurse. Urgent updates — like the
            hotline input — are handled immediately. Heavy record filtering is
            marked non-urgent and routed to the waiting room, leaving the hotline
            free.
          </p>
          <TriageSystem />
        </section>
      </ScrollReveal>

      {/* Section 3: ER Briefing — before vs after summary */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">ER Briefing</h2>
          <ERBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Playground</h2>
            <p className="text-muted-foreground">
              useTransition shines wherever a state update triggers expensive
              rendering. Explore the ER — search records, run ward rounds, and
              decide when triage is worth calling in.
            </p>
          </div>
          <PlaygroundPatientLookup />
          <PlaygroundWardRounds />
          <PlaygroundTriageGuide />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_TRANSITION_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
