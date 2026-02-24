"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { ScrollReveal } from "@/components/scroll-reveal";

import { CourierChain } from "./_components/courier-chain";
import { EncryptedChannel } from "./_components/encrypted-channel";
import { SpyPlaybook } from "./_components/spy-playbook";
import { PlaygroundSafeHouse } from "./_components/playground-safe-house";
import { PlaygroundAgentDossier } from "./_components/playground-agent-dossier";
import { PlaygroundCodeLanguage } from "./_components/playground-code-language";

export default function UseContextPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useContext</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if a field agent could receive classified intel without a single
          courier?
        </TextEffect>
      </div>

      <ScrollReveal>
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
          <p className="font-medium flex items-center gap-2">
            <span>🕵️</span> Theme: Spy Network
          </p>
          <p className="text-sm text-muted-foreground">
            Your app is a spy network. Prop drilling is like passing classified
            documents through a chain of couriers &mdash; every intermediary
            handles the secret. useContext is an encrypted radio channel: HQ
            (Provider) broadcasts intel, and any field agent (consumer) tunes in
            directly. No couriers, no leaks, no middlemen.
          </p>
        </div>
      </ScrollReveal>

      {/* Section 1: The Courier Chain */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Courier Chain</h2>
          <p className="text-muted-foreground">
            Prop drilling is like passing classified documents through a chain of
            couriers — every intermediary sees the secret, and each one is a
            liability.
          </p>
          <CourierChain />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 2: The Encrypted Channel */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">The Encrypted Channel</h2>
          <p className="text-muted-foreground">
            useContext creates an encrypted channel — HQ broadcasts directly to
            the field agent. No intermediaries, no leaks.
          </p>
          <EncryptedChannel />
        </section>
      </ScrollReveal>

      {/* Section 3: The Spy Playbook */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">The Spy Playbook</h2>
          <SpyPlaybook />
        </section>
      </ScrollReveal>

      <ScrollReveal><Separator /></ScrollReveal>

      {/* Section 4: Field Operations */}
      <ScrollReveal>
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Field Operations</h2>
            <p className="text-muted-foreground">
              Every spy needs field practice. Try these operations — each one uses
              context to share intel across the network.
            </p>
          </div>

          <PlaygroundSafeHouse />
          <PlaygroundAgentDossier />
          <PlaygroundCodeLanguage />
        </section>
      </ScrollReveal>
    </div>
  );
}
