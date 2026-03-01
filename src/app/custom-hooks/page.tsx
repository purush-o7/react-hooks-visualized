"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";
import { JsonLd } from "@/components/json-ld";

import { DuplicatedLogic } from "./_components/duplicated-logic";
import { ExtractedHook } from "./_components/extracted-hook";
import { HookRules } from "./_components/hook-rules";
import { PlaygroundUseToggle } from "./_components/playground-use-toggle";
import { PlaygroundUseDebounce } from "./_components/playground-use-debounce";
import { PlaygroundUseLocalStorage } from "./_components/playground-use-local-storage";

export default function CustomHooksPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Custom Hooks",
          description:
            "Extract and reuse stateful logic across components with custom hooks",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/custom-hooks",
        }}
      />
      {/* Header */}
      <div>
        <div className="h-1 w-12 rounded-full bg-teal-500 mb-4" />
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">Custom Hooks</h1>
          <Badge variant="secondary">Pattern</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What if you are writing the same stateful logic over and over?
        </TextEffect>
        <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3">
          <p className="text-sm text-teal-600 dark:text-teal-400">
            💡 Custom hooks let you extract and share stateful logic. They're the composition pattern of React.
          </p>
        </div>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Problem: Duplication</h2>
        <p className="text-muted-foreground">
          Two components with identical toggle logic. Copy-paste works, but it
          doesn&apos;t scale.
        </p>
        <DuplicatedLogic />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: Extract a Hook</h2>
        <p className="text-muted-foreground">
          Pull the shared logic into a function that starts with &quot;use&quot;.
          Now both components get it in one line.
        </p>
        <ExtractedHook />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">The Two Rules</h2>
        <HookRules />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            Custom hooks compose built-in hooks into reusable pieces. Here are
            three classics you&apos;ll use in real projects.
          </p>
        </div>

        <PlaygroundUseToggle />
        <PlaygroundUseDebounce />
        <PlaygroundUseLocalStorage />
      </section>
    </div>
  );
}
