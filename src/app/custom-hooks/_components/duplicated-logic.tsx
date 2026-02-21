"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const duplicatedCode = `// Component 1: Dark Mode Toggle
function DarkMode() {
  const [isOn, setIsOn] = useState(false);  // ← same
  const toggle = () => setIsOn(v => !v);    // ← same
  return <button onClick={toggle}>{isOn ? "Dark" : "Light"}</button>;
}

// Component 2: Modal Toggle
function Modal() {
  const [isOn, setIsOn] = useState(false);  // ← COPY-PASTE!
  const toggle = () => setIsOn(v => !v);    // ← COPY-PASTE!
  return <button onClick={toggle}>{isOn ? "Close" : "Open"}</button>;
}

// Same logic, duplicated. What if you have 10 toggles?`;

export function DuplicatedLogic() {
  const [darkMode, setDarkMode] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor="rgba(239, 68, 68, 0.35)"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            DUPLICATED
          </Badge>
          <span className="text-sm text-muted-foreground">
            Same toggle logic in two places
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4 text-center space-y-2">
            <p className="text-sm font-medium">DarkMode Toggle</p>
            <div className="text-2xl">{darkMode ? "🌙" : "☀️"}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode((v) => !v)}
            >
              {darkMode ? "Dark" : "Light"}
            </Button>
            <p className="text-[10px] text-red-500 font-mono">
              useState + toggle logic
            </p>
          </div>

          <div className="rounded-lg border p-4 text-center space-y-2">
            <p className="text-sm font-medium">Modal Toggle</p>
            <div className="text-2xl">{modal ? "📭" : "📬"}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModal((v) => !v)}
            >
              {modal ? "Close" : "Open"}
            </Button>
            <p className="text-[10px] text-red-500 font-mono">
              same useState + toggle logic!
            </p>
          </div>
        </div>

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is duplication bad?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                Both components use the exact same pattern: a boolean state and
                a toggle function. If you need to add &quot;set true&quot; or
                &quot;set false&quot; helpers, you&apos;d have to change every copy.
              </p>
              <p className="font-medium text-foreground">
                What if you could extract this into a reusable hook?
              </p>
              <CodeBlock code={duplicatedCode} filename="duplicated.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
