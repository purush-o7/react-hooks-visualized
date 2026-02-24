"use client";

import { useRef, forwardRef, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const VaultInput = forwardRef<HTMLInputElement, { placeholder?: string }>(
  function VaultInput({ placeholder }, ref) {
    return (
      <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-3">
        <Input
          ref={ref}
          placeholder={placeholder || "Type something..."}
          className="border-0 bg-transparent"
        />
      </div>
    );
  }
);

const DANGEROUS_PROPS = [
  "style",
  "innerHTML",
  "remove()",
  "setAttribute()",
  "classList",
  "parentNode",
  "childNodes",
  "outerHTML",
];

const exposedCode = `const VaultInput = forwardRef((props, ref) => {
  return <input ref={ref} />;
  //            ↑ raw DOM node exposed — vault key handed out!
});

// Customer gets EVERYTHING:
ref.current.focus();        // OK — approved transaction
ref.current.value = "";     // OK — approved transaction
ref.current.style.color = "red";  // Yikes! Tampering!
ref.current.remove();       // DANGER! Vault breach!
ref.current.innerHTML = ""; // DANGER! Contents wiped!`;

export function UnlockedVault() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [accessLog, setAccessLog] = useState<string[]>([]);

  function logAccess(action: string) {
    setAccessLog((prev) => [...prev.slice(-4), action]);
  }

  function handleDeposit() {
    inputRef.current?.focus();
    logAccess("deposit() [focus] — OK");
  }

  function handleWithdraw() {
    if (inputRef.current) {
      inputRef.current.value = "";
      logAccess("withdraw() [clear] — OK");
    }
  }

  function handleTamperContents() {
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = "#fee2e2";
      inputRef.current.style.borderRadius = "0";
      logAccess("style.backgroundColor changed — UNINTENDED!");
    }
  }

  function handleForgeRecords() {
    if (inputRef.current) {
      inputRef.current.setAttribute("data-forged", "true");
      logAccess('setAttribute("data-forged") — UNINTENDED!');
    }
  }

  return (
    <GlowCard className="p-6 md:p-8" glowColor="rgba(239, 68, 68, 0.35)">
      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="destructive" className="text-sm px-3 py-1">
            UNLOCKED VAULT
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Full DOM access
          </Badge>
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
          <VaultInput
            ref={inputRef}
            placeholder="Vault contents — fully exposed to the parent..."
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Approved operations:</p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleDeposit}>
              Deposit
            </Button>
            <Button variant="outline" size="sm" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-red-500">
            But anyone can also...
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-500"
              onClick={handleTamperContents}
            >
              Tamper Contents
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-500"
              onClick={handleForgeRecords}
            >
              Forge Records
            </Button>
          </div>
        </div>

        <div className="rounded-lg bg-red-500/10 p-3">
          <p className="text-xs font-medium mb-2">
            Parent can access ALL of these:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DANGEROUS_PROPS.map((prop) => (
              <Badge
                key={prop}
                variant="outline"
                className="font-mono text-[10px] border-red-500/30 text-red-500"
              >
                .{prop}
              </Badge>
            ))}
          </div>
        </div>

        {accessLog.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-1">Security log:</p>
            {accessLog.map((log, i) => (
              <p
                key={i}
                className={`text-xs font-mono ${
                  log.includes("UNINTENDED")
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {log}
              </p>
            ))}
          </div>
        )}

        <Accordion>
          <AccordionItem value="why">
            <AccordionTrigger className="text-sm font-medium">
              Why is an unlocked vault dangerous?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-3 pt-2">
              <p>
                When a component exposes its raw DOM ref, the parent gets the
                vault key — full access to change styles, remove elements, and
                modify attributes. This breaks encapsulation and makes the
                component fragile.
              </p>
              <p className="font-medium text-foreground">
                We need a teller window — a way to expose only the transactions
                the parent actually needs.
              </p>
              <CodeBlock code={exposedCode} filename="unlocked-vault.tsx" />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </GlowCard>
  );
}
