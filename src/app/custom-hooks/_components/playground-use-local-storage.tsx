"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore write errors
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

const code = `function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage — persists across page refreshes!
const [name, setName] = useLocalStorage("user-name", "");
const [theme, setTheme] = useLocalStorage("theme", "light");`;

export function PlaygroundUseLocalStorage() {
  const [name, setName] = useLocalStorage("demo-name", "");
  const [theme, setTheme] = useLocalStorage("demo-theme", "light");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💾</span>
          useLocalStorage
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Persistent State
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Changes are saved to localStorage. Refresh the page — your data
          persists!
        </p>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Theme</label>
            <div className="flex gap-2">
              {["light", "dark", "system"].map((t) => (
                <Button
                  key={t}
                  variant={theme === t ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-sm font-mono space-y-1">
          <p>
            localStorage[&quot;demo-name&quot;] ={" "}
            <span className="text-green-600">&quot;{name}&quot;</span>
          </p>
          <p>
            localStorage[&quot;demo-theme&quot;] ={" "}
            <span className="text-green-600">&quot;{theme}&quot;</span>
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            setName("");
            setTheme("light");
          }}
        >
          Clear Saved Data
        </Button>

        <CodeBlock code={code} filename="use-local-storage.tsx" />
      </CardContent>
    </Card>
  );
}
