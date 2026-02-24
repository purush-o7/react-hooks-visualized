"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { UnlockedVault } from "./_components/unlocked-vault";
import { TellerWindow } from "./_components/teller-window";
import { VaultBriefing } from "./_components/vault-briefing";
import { PlaygroundSafeDeposit } from "./_components/playground-safe-deposit";
import { PlaygroundLoanApplication } from "./_components/playground-loan-application";
import { PlaygroundSecurityGuide } from "./_components/playground-security-guide";

export default function UseImperativeHandlePage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header - NOT wrapped in ScrollReveal */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useImperativeHandle</h1>
          <Badge>Advanced</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Think of useImperativeHandle as a bank teller window. Instead of
          handing the customer the vault key, you give them a controlled window
          — deposit, withdraw, check balance. The vault stays locked.
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🏦</span> Theme: Bank Vault
          </p>
          <p className="text-sm text-muted-foreground">
            Your child component is a bank vault. Passing a raw ref is like
            leaving the vault door wide open &mdash; the parent can reach in
            and touch anything. useImperativeHandle is the teller window: you
            expose only specific operations (focus, scroll, reset) through a
            controlled slot while the vault internals stay locked.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: Unlocked Vault — the dangerous "before" */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Unlocked Vault</h2>
          <p className="text-muted-foreground">
            When you forward a raw ref, the parent gets the vault key — full
            access to every DOM property and method. Approved transactions and
            dangerous tampering look exactly the same.
          </p>
          <UnlockedVault />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 2: Teller Window — the "after" with useImperativeHandle */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Teller Window</h2>
          <p className="text-muted-foreground">
            useImperativeHandle replaces the raw ref with a curated API. The
            parent can only call the transactions you approve — everything else
            is undefined.
          </p>
          <TellerWindow />
        </section>
      </ScrollReveal>

      {/* Section 3: Vault Briefing — side-by-side comparison */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Vault Briefing</h2>
          <VaultBriefing />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <Separator />
      </ScrollReveal>

      {/* Section 4: Playgrounds */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">The Banking Floor</h2>
            <p className="text-muted-foreground">
              useImperativeHandle shines when a parent needs to trigger
              behaviour inside a child without reaching into its internals. Each
              playground below demonstrates a different kind of teller window.
            </p>
          </div>

          <PlaygroundSafeDeposit />
          <PlaygroundLoanApplication />
          <PlaygroundSecurityGuide />
        </section>
      </ScrollReveal>
    </div>
  );
}
