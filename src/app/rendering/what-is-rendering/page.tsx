"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { VisualRenderCycle } from "./_components/visual-render-cycle";
import { VisualRenderTriggers } from "./_components/visual-render-triggers";
import { VisualRenderVsDom } from "./_components/visual-render-vs-dom";

export default function WhatIsRenderingPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">What is Rendering?</h1>
          <Badge>Start Here</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          Rendering is the single most important concept in React. Once you get
          this, everything else clicks.
        </TextEffect>
      </div>

      {/* ── The One-Sentence Answer ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Simple Answer</h2>
        <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/5 p-6 text-center space-y-3">
          <p className="text-xl font-semibold text-blue-400">
            Rendering = React calling your component function
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your component is just a function. When React
            &quot;renders&quot; it, React calls that function. The function
            runs, returns some JSX, and React figures out what changed on
            screen.
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 p-4 text-sm space-y-2">
          <p className="text-muted-foreground">
            Think of it like a recipe:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Your <strong>component</strong> is the recipe (a function)
            </li>
            <li>
              <strong>Rendering</strong> is following the recipe (calling the
              function)
            </li>
            <li>
              The <strong>JSX</strong> it returns is the finished dish (a
              description of UI)
            </li>
            <li>
              React is the <strong>chef</strong> who decides when to cook and
              what plates to update
            </li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* ── The Render Cycle ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Render Cycle</h2>
        <p className="text-muted-foreground">
          Every render follows the same 4 steps. Press play to watch them
          happen one by one:
        </p>
        <VisualRenderCycle />
      </section>

      <Separator />

      {/* ── What Causes a Render? ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Causes a Render?</h2>
        <p className="text-muted-foreground">
          There are exactly <strong>3 things</strong> that make React render
          your component. Click each one to learn more, then try the live
          demo:
        </p>
        <VisualRenderTriggers />
      </section>

      <Separator />

      {/* ── Render ≠ DOM Update ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Render Does Not Mean Screen Update
        </h2>
        <p className="text-muted-foreground">
          This is the #1 misconception. &quot;Rendering&quot; does{" "}
          <strong>not</strong> mean React changed the screen. React may call
          your function, compare the output, and decide nothing changed — so
          the real DOM stays untouched.
        </p>
        <VisualRenderVsDom />
      </section>

      <Separator />

      {/* ── Summary & Next ── */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Summary</h2>
        <div className="grid gap-3 text-sm">
          {[
            {
              term: "Render",
              def: "React calls your component function",
            },
            {
              term: "Triggers",
              def: "Initial mount, state change, or parent re-render",
            },
            {
              term: "During render",
              def: "Function runs top-to-bottom, all code executes, JSX is returned",
            },
            {
              term: "After render",
              def: "React diffs old vs new JSX, patches only what changed in the DOM",
            },
            {
              term: "Key insight",
              def: "Rendering is cheap, DOM updates are expensive — React minimizes DOM work",
            },
          ].map((item) => (
            <div
              key={item.term}
              className="flex gap-4 rounded-lg border p-3 items-baseline"
            >
              <span className="font-medium text-foreground shrink-0 w-28">
                {item.term}
              </span>
              <span className="text-muted-foreground">{item.def}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground pt-2">
          Now that you understand what rendering is, explore what happens{" "}
          <em>during</em> a render — and why it matters for every hook
          you&apos;ll learn:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rendering/variables-reset"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Variables Reset &rarr;
          </Link>
          <Link
            href="/rendering/code-reexecution"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Code Re-execution &rarr;
          </Link>
          <Link
            href="/rendering/render-cascade"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Render Cascade &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
