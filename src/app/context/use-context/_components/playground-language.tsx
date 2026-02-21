"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

type Lang = "en" | "es" | "ja";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    greeting: "Hello!",
    description: "Welcome to our application",
    button: "Get Started",
    footer: "Made with React Context",
  },
  es: {
    greeting: "¡Hola!",
    description: "Bienvenido a nuestra aplicación",
    button: "Comenzar",
    footer: "Hecho con React Context",
  },
  ja: {
    greeting: "こんにちは！",
    description: "アプリケーションへようこそ",
    button: "はじめる",
    footer: "React Contextで作られた",
  },
};

const LangCtx = createContext<{ lang: Lang; t: Record<string, string> }>({
  lang: "en",
  t: translations.en,
});

function GreetingBanner() {
  const { t } = useContext(LangCtx);
  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 text-center space-y-1">
      <p className="text-2xl font-bold">{t.greeting}</p>
      <p className="text-sm text-muted-foreground">{t.description}</p>
    </div>
  );
}

function ActionButton() {
  const { t } = useContext(LangCtx);
  return (
    <Button className="w-full">{t.button}</Button>
  );
}

function Footer() {
  const { t, lang } = useContext(LangCtx);
  return (
    <p className="text-xs text-muted-foreground text-center">
      {t.footer} • <code>{lang}</code>
    </p>
  );
}

const code = `const translations = { en: { greeting: "Hello!" }, es: { greeting: "¡Hola!" }, ja: { greeting: "こんにちは！" } };
const LangCtx = createContext({ lang: "en", t: translations.en });

function App() {
  const [lang, setLang] = useState("en");
  return (
    <LangCtx.Provider value={{ lang, t: translations[lang] }}>
      <GreetingBanner />  {/* reads t.greeting */}
      <ActionButton />    {/* reads t.button */}
      <Footer />          {/* reads t.footer + lang */}
    </LangCtx.Provider>
  );
}`;

export function PlaygroundLanguage() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          Language Selector
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            i18n Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Switch languages — all components update because they consume the same context.
        </p>

        <div className="flex justify-center gap-2">
          {(["en", "es", "ja"] as Lang[]).map((l) => (
            <Button
              key={l}
              variant={lang === l ? "default" : "outline"}
              size="sm"
              onClick={() => setLang(l)}
            >
              {{ en: "English", es: "Español", ja: "日本語" }[l]}
            </Button>
          ))}
        </div>

        <LangCtx.Provider value={{ lang, t: translations[lang] }}>
          <div className="space-y-3">
            <GreetingBanner />
            <ActionButton />
            <Footer />
          </div>
        </LangCtx.Provider>

        <CodeBlock code={code} filename="language-context.tsx" />
      </CardContent>
    </Card>
  );
}
