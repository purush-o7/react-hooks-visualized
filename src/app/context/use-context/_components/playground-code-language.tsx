"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

type Cipher = "nato" | "morse" | "phonetic";

interface Translations {
  greeting: string;
  briefing: string;
  confirm: string;
  signoff: string;
}

const translations: Record<Cipher, Translations> = {
  nato: {
    greeting: "Alpha-Bravo, this is HQ",
    briefing: "Proceed to extraction point Delta",
    confirm: "Roger That",
    signoff: "HQ out — stay frosty",
  },
  morse: {
    greeting: ".- -... / .... --.-",
    briefing: ".--. .-. --- -.-. . . -..",
    confirm: ".-. --- --. . .-.",
    signoff: ".... --.- / --- ..- -",
  },
  phonetic: {
    greeting: "Alfa-Bravo, eto Shtab",
    briefing: "Dvigatʹsya k tochke izvlecheniya Delta",
    confirm: "Prinyato",
    signoff: "Shtab konets — ostavaysya nacheku",
  },
};

const CipherCtx = createContext<{
  cipher: Cipher;
  t: Translations;
}>({ cipher: "nato", t: translations.nato });

function BriefingBanner() {
  const { t } = useContext(CipherCtx);
  return (
    <div
      className="rounded-lg overflow-hidden border border-white/10"
    >
      <div className="px-4 py-2 text-xs font-mono bg-gradient-to-r from-green-500/10 to-blue-500/10">
        {t.greeting}
      </div>
      <div className="px-4 py-3 text-sm font-mono bg-zinc-900">
        {t.briefing}
      </div>
    </div>
  );
}

function ConfirmButton() {
  const { t } = useContext(CipherCtx);
  return (
    <button
      className="w-full rounded-lg py-2.5 text-sm font-mono font-bold transition-colors"
      style={{ backgroundColor: "rgb(34 197 94 / 0.12)", color: "#22c55e", border: "1px solid rgb(34 197 94 / 0.25)" }}
    >
      {t.confirm}
    </button>
  );
}

function SignoffFooter() {
  const { cipher, t } = useContext(CipherCtx);
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
      <span>{t.signoff}</span>
      <Badge variant="outline" className="text-[10px] uppercase">
        {cipher}
      </Badge>
    </div>
  );
}

const cipherOptions: { value: Cipher; label: string; desc: string }[] = [
  { value: "nato", label: "NATO", desc: "Phonetic alphabet" },
  { value: "morse", label: "Morse", desc: "Dots and dashes" },
  { value: "phonetic", label: "Phonetic", desc: "Russian transliteration" },
];

const code = `const CipherCtx = createContext({ cipher: "nato", t: translations.nato });

function HQ() {
  const [cipher, setCipher] = useState("nato");
  return (
    <CipherCtx.Provider value={{ cipher, t: translations[cipher] }}>
      <BriefingBanner />  {/* reads greeting + briefing */}
      <ConfirmButton />   {/* reads confirm text */}
      <SignoffFooter />   {/* reads signoff + cipher name */}
    </CipherCtx.Provider>
  );
}

function BriefingBanner() {
  const { t } = useContext(CipherCtx);
  return <div>{t.greeting} — {t.briefing}</div>;
}`;

export function PlaygroundCodeLanguage() {
  const [cipher, setCipher] = useState<Cipher>("nato");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📡</span>
          Code Language
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            i18n Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cipher selector */}
        <div className="flex flex-wrap gap-2">
          {cipherOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={cipher === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCipher(opt.value)}
            >
              {opt.label}
              <span className="text-xs opacity-60 ml-1.5 hidden sm:inline">
                {opt.desc}
              </span>
            </Button>
          ))}
        </div>

        {/* Consumer components */}
        <CipherCtx.Provider value={{ cipher, t: translations[cipher] }}>
          <div className="space-y-3">
            <BriefingBanner />
            <ConfirmButton />
            <SignoffFooter />
          </div>
        </CipherCtx.Provider>

        <CodeBlock code={code} filename="code-language.tsx" />
      </CardContent>
    </Card>
  );
}
