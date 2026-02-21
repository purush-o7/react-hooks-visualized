"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const messyCode = `function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [newsletter, setNewsletter] = useState(false);
  const [theme, setTheme] = useState("light");
  // 5 separate state variables... and counting

  function handleReset() {
    setName("");
    setEmail("");
    setAge(0);
    setNewsletter(false);
    setTheme("light");
    // Must remember to reset ALL of them!
  }

  // Validation is scattered everywhere...
}`;

export function MessyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [newsletter, setNewsletter] = useState(false);
  const [theme, setTheme] = useState("light");

  const stateCount =
    (name ? 1 : 0) +
    (email ? 1 : 0) +
    (age > 0 ? 1 : 0) +
    (newsletter ? 1 : 0) +
    (theme !== "light" ? 1 : 0);

  function handleReset() {
    setName("");
    setEmail("");
    setAge(0);
    setNewsletter(false);
    setTheme("light");
  }

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            MESSY
          </Badge>
          <span className="text-sm text-muted-foreground">
            5 separate useState calls
          </span>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Input
              placeholder="Age"
              type="number"
              value={age || ""}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-24"
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={newsletter}
                onCheckedChange={setNewsletter}
              />
              <span className="text-sm">Newsletter</span>
            </div>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? "Light" : "Dark"}
            </Button>
          </div>
        </div>

        {/* State count indicator */}
        <div className="text-center text-sm text-muted-foreground">
          {stateCount > 0 ? (
            <>
              Changed {stateCount} field{stateCount !== 1 && "s"} —{" "}
              <span className="text-red-500 font-medium">
                each has its own useState!
              </span>
            </>
          ) : (
            "Try changing some fields..."
          )}
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleReset}>
            Reset All (5 setter calls!)
          </Button>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is this a problem?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Each field has its own useState. That means 5 variables, 5
                setter functions, and a reset function that must call all 5.
              </p>
              <p>
                Add 5 more fields and you have 10 useState calls. Validation
                logic gets scattered across handlers. Testing becomes painful.
              </p>
              <p className="font-medium text-foreground">
                What if all the state logic lived in ONE place?
              </p>
              <CodeBlock code={messyCode} filename="messy-form.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
