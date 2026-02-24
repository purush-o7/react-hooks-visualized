"use client";

import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

type TellerHandle = {
  deposit: () => void;
  withdraw: () => void;
  checkBalance: () => void;
};

const SecureVault = forwardRef<TellerHandle, { placeholder?: string }>(
  function SecureVault({ placeholder }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      deposit() {
        inputRef.current?.focus();
      },
      withdraw() {
        if (inputRef.current) inputRef.current.value = "";
      },
      checkBalance() {
        inputRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    return (
      <div className="rounded-lg border-2 border-dashed border-green-500/30 p-3">
        <Input
          ref={inputRef}
          placeholder={placeholder || "Type something..."}
          className="border-0 bg-transparent"
        />
      </div>
    );
  }
);

const EXPOSED_METHODS = ["deposit()", "withdraw()", "checkBalance()"];
const BLOCKED_PROPS = ["style", "innerHTML", "remove()", "setAttribute()"];

const controlledCode = `const SecureVault = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    deposit() { inputRef.current.focus(); },
    withdraw() { inputRef.current.value = ""; },
    checkBalance() {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    },
  }));

  return <input ref={inputRef} />;
  //            ↑ internal ref — customer can't access it!
});

// Customer gets ONLY these 3 transactions:
ref.current.deposit();      // ✓ Works
ref.current.withdraw();     // ✓ Works
ref.current.checkBalance(); // ✓ Works
ref.current.style;          // ✗ undefined
ref.current.remove();       // ✗ undefined`;

export function TellerWindow() {
  const vaultRef = useRef<TellerHandle>(null);
  const [accessLog, setAccessLog] = useState<string[]>([]);

  function logAccess(action: string) {
    setAccessLog((prev) => [...prev.slice(-4), action]);
  }

  function handleDeposit() {
    vaultRef.current?.deposit();
    logAccess("deposit() — allowed");
  }

  function handleWithdraw() {
    vaultRef.current?.withdraw();
    logAccess("withdraw() — allowed");
  }

  function handleCheckBalance() {
    vaultRef.current?.checkBalance();
    logAccess("checkBalance() — allowed");
  }

  function handleTryStyle() {
    const result = (vaultRef.current as unknown as Record<string, unknown>)
      ?.style;
    logAccess(
      `style → ${result === undefined ? "undefined! Blocked." : "accessible"}`
    );
  }

  function handleTryRemove() {
    const result = (vaultRef.current as unknown as Record<string, unknown>)
      ?.remove;
    logAccess(
      `remove → ${result === undefined ? "undefined! Blocked." : "accessible"}`
    );
  }

  return (
    <GlowCard
      className="p-6 md:p-8 relative overflow-hidden"
      glowColor="rgba(34, 197, 94, 0.35)"
    >
      <BorderBeam colorFrom="#22c55e" colorTo="#14b8a6" duration={4} />

      <div className="space-y-6">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1">
            TELLER WINDOW
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Curated API only
          </Badge>
        </div>

        <div className="rounded-xl border border-green-500/20 bg-zinc-900 p-4">
          <SecureVault
            ref={vaultRef}
            placeholder="Vault contents — only accessible through the window..."
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-green-600">
            Approved transactions:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleDeposit}>
              Deposit
            </Button>
            <Button variant="outline" size="sm" onClick={handleWithdraw}>
              Withdraw
            </Button>
            <Button variant="outline" size="sm" onClick={handleCheckBalance}>
              Check Balance
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Try unauthorized access:
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleTryStyle}>
              Try .style
            </Button>
            <Button variant="outline" size="sm" onClick={handleTryRemove}>
              Try .remove()
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-green-500/10 p-3">
            <p className="text-xs font-medium mb-2 text-green-600">Exposed:</p>
            <div className="flex flex-wrap gap-1.5">
              {EXPOSED_METHODS.map((m) => (
                <Badge
                  key={m}
                  variant="outline"
                  className="font-mono text-[10px] border-green-500/30 text-green-600"
                >
                  .{m}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-red-500/10 p-3">
            <p className="text-xs font-medium mb-2 text-red-500">Blocked:</p>
            <div className="flex flex-wrap gap-1.5">
              {BLOCKED_PROPS.map((p) => (
                <Badge
                  key={p}
                  variant="outline"
                  className="font-mono text-[10px] border-red-500/30 text-red-500 line-through"
                >
                  .{p}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {accessLog.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-1">Security log:</p>
            {accessLog.map((log, i) => (
              <p
                key={i}
                className={`text-xs font-mono ${
                  log.includes("Blocked")
                    ? "text-green-600"
                    : log.includes("allowed")
                      ? "text-muted-foreground"
                      : "text-red-500"
                }`}
              >
                {log}
              </p>
            ))}
          </div>
        )}

        <CodeBlock code={controlledCode} filename="teller-window.tsx" />
      </div>
    </GlowCard>
  );
}
