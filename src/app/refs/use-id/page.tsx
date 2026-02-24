"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { NoTicketLot } from "./_components/no-ticket-lot";
import { TicketPrinter } from "./_components/ticket-printer";
import { ValetBriefing } from "./_components/valet-briefing";
import { PlaygroundParkingLot } from "./_components/playground-parking-lot";
import { PlaygroundRegistrationForm } from "./_components/playground-registration-form";

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
    </div>
  );
}
