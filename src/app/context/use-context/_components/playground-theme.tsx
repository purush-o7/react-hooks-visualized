"use client";

import { createContext, useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

function DeeplyNestedCard() {
  const { theme } = useContext(ThemeCtx);
  return (
    <div
      className="rounded-lg p-4 text-center transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f1f5f9",
        color: theme === "dark" ? "#e2e8f0" : "#1e293b",
      }}
    >
      <p className="text-sm font-medium">Deeply Nested Component</p>
      <p className="text-xs mt-1 opacity-70">
        I read the theme directly via useContext — no props!
      </p>
      <Badge variant="outline" className="mt-2 text-xs">
        theme: {theme}
      </Badge>
    </div>
  );
}

function MiddleLayer() {
  return (
    <div className="rounded-lg border p-3 space-y-2">
      <p className="text-xs text-muted-foreground">
        MiddleLayer — has no theme prop
      </p>
      <DeeplyNestedCard />
    </div>
  );
}

const code = `const ThemeCtx = createContext({ theme: "light", toggle: () => {} });

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") }}>
      <MiddleLayer />  {/* no theme prop! */}
    </ThemeCtx.Provider>
  );
}

function DeeplyNestedCard() {
  const { theme } = useContext(ThemeCtx);  // teleported!
  return <div className={theme}>...</div>;
}`;

export function PlaygroundTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎨</span>
          Theme Switcher
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Provider Pattern
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ThemeCtx.Provider
          value={{
            theme,
            toggle: () =>
              setTheme((t) => (t === "light" ? "dark" : "light")),
          }}
        >
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
            >
              {theme === "light" ? (
                <><Moon className="size-4 mr-2" /> Switch to Dark</>
              ) : (
                <><Sun className="size-4 mr-2" /> Switch to Light</>
              )}
            </Button>
          </div>

          <MiddleLayer />
        </ThemeCtx.Provider>

        <CodeBlock code={code} filename="theme-context.tsx" />
      </CardContent>
    </Card>
  );
}
