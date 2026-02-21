"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TextEffect } from "@/components/ui/text-effect";

import { MessyForm } from "./_components/messy-form";
import { CleanForm } from "./_components/clean-form";
import { BeforeAfter } from "./_components/before-after";
import { PlaygroundTodo } from "./_components/playground-todo";
import { PlaygroundShoppingCart } from "./_components/playground-shopping-cart";
import { PlaygroundTrafficLight } from "./_components/playground-traffic-light";

export default function UseReducerPage() {
  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold font-mono">useReducer</h1>
          <Badge>Core Hook</Badge>
        </div>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          className="text-muted-foreground"
        >
          What happens when your state logic becomes a tangled mess?
        </TextEffect>
      </div>

      {/* Section 1: The Problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Messy Way</h2>
        <p className="text-muted-foreground">
          A form with 5 fields means 5 useState calls, 5 setter functions, and
          reset logic that touches every single one.
        </p>
        <MessyForm />
      </section>

      <Separator />

      {/* Section 2: The Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">The Fix: useReducer</h2>
        <p className="text-muted-foreground">
          Same form, but all state logic lives in one reducer function.
          Dispatch an action, and the reducer decides what happens.
        </p>
        <CleanForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Before vs After</h2>
        <BeforeAfter />
      </section>

      <Separator />

      {/* Section 3: Playground */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Playground</h2>
          <p className="text-muted-foreground">
            useReducer shines with complex state — lists, nested objects, and
            state machines. Try these interactive examples.
          </p>
        </div>

        <PlaygroundTodo />
        <PlaygroundShoppingCart />
        <PlaygroundTrafficLight />
      </section>
    </div>
  );
}
