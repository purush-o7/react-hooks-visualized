"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";

import { NoTicketLot } from "./_components/no-ticket-lot";
import { TicketPrinter } from "./_components/ticket-printer";
import { ValetBriefing } from "./_components/valet-briefing";
import { PlaygroundParkingLot } from "./_components/playground-parking-lot";
import { PlaygroundRegistrationForm } from "./_components/playground-registration-form";

const USE_ID_MISTAKES: Mistake[] = [
  {
    title: "Using useId to generate list keys",
    subtitle: "Calling useId inside a .map() loop to create keys",
    filename: "list.tsx",
    wrongCode: `function UserList({ users }) {
  return (
    <ul>
      {users.map(user => {
        const id = useId(); // Hook called in a loop!
        return <li key={id}>{user.name}</li>;
      })}
    </ul>
  );
}`,
    rightCode: `function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`,
    explanation:
      "Calling a hook inside a loop violates the Rules of Hooks. Even if it worked, useId generates IDs tied to the component tree position — not to your data. List keys must come from a stable, unique property in your data (like a database ID).",
  },
  {
    title: "Using Math.random() instead of useId for SSR",
    subtitle: "Generating HTML id attributes with random values in server-rendered apps",
    filename: "email-field.tsx",
    wrongCode: `function EmailField() {
  // Different on server vs client — hydration mismatch
  const id = \`email-\${Math.random().toString(36).slice(2)}\`;

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );
}`,
    rightCode: `function EmailField() {
  const id = useId(); // deterministic, matches server + client

  return (
    <>
      <label htmlFor={\`\${id}-email\`}>Email</label>
      <input id={\`\${id}-email\`} type="email" />
    </>
  );
}`,
    explanation:
      "The server generates one random ID and the client generates a different one during hydration. React sees the mismatch and throws warnings. useId produces deterministic IDs that match between server and client using React's internal counter.",
  },
  {
    title: "Using useId for database or API identifiers",
    subtitle: "Using useId output as a database key, session token, or API ID",
    filename: "create-item.tsx",
    wrongCode: `function CreateItem() {
  const id = useId();

  const handleSubmit = () => {
    // Bad: React's internal ID as a database key
    api.createItem({ id, name: "New Item" });
  };

  return <button onClick={handleSubmit}>Create</button>;
}`,
    rightCode: `function CreateItem() {
  const formId = useId(); // only for HTML id/label pairing

  const handleSubmit = () => {
    const itemId = crypto.randomUUID(); // for backend
    api.createItem({ id: itemId, name: "New Item" });
  };

  return (
    <form id={formId}>
      <button onClick={handleSubmit}>Create</button>
    </form>
  );
}`,
    explanation:
      "useId output is deterministic and tied to React's component tree — it is not cryptographically random, not globally unique, and its format (like :r0:) can change between React versions. Use crypto.randomUUID() or a UUID library for non-DOM identifiers. useId is for HTML accessibility attributes only.",
  },
];

export default function UseIdPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useId</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if every component instance could get its own unique valet ticket
          — automatically?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🅿️</span> Theme: Valet Parking
          </p>
          <p className="text-sm text-muted-foreground">
            Your component is a parking lot. Without tickets, two valets serving
            the same car model hand back the wrong keys &mdash; IDs collide.
            useId is the ticket printer: it stamps a guaranteed-unique ticket
            for every car, works across multiple lots (server + client
            rendering), and never duplicates even when the same form appears
            twice on the page.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Problem — No Ticket Lot */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">No Ticket Lot</h2>
          <p className="text-muted-foreground">
            Without useId, every component instance uses the same hardcoded ID.
            Two red Toyotas, same description — the valet always grabs the wrong
            one.
          </p>
          <NoTicketLot />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: The Fix — Ticket Printer */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Ticket Printer</h2>
          <p className="text-muted-foreground">
            useId prints a unique stub for every component instance. Each car
            gets its own ticket — labels always retrieve the correct vehicle, and
            it works the same on the server and client.
          </p>
          <TicketPrinter />
        </section>
      </ScrollReveal>

      {/* Section 3: Valet Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Valet Briefing</h2>
          <ValetBriefing />
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
              Two playgrounds to explore useId in action — add cars to the lot
              and watch unique tickets generate, then see how aria-describedby
              links labels and errors in an accessible form.
            </p>
          </div>

          <PlaygroundParkingLot />
          <PlaygroundRegistrationForm />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      <ScrollReveal>
        <CommonMistakes mistakes={USE_ID_MISTAKES} />
      </ScrollReveal>
    </div>
  );
}
