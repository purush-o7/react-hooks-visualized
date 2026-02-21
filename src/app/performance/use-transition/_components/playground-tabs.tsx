"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

function generateTabContent(tab: string) {
  return Array.from({ length: 3000 }, (_, i) => `${tab}-item-${i}`);
}

const TABS = [
  { id: "products", label: "Products" },
  { id: "reviews", label: "Reviews" },
  { id: "analytics", label: "Analytics" },
];

const code = `const [isPending, startTransition] = useTransition();
const [activeTab, setActiveTab] = useState("products");

function switchTab(tab: string) {
  if (useTransitionEnabled) {
    startTransition(() => setActiveTab(tab));
  } else {
    setActiveTab(tab);  // blocks until content renders
  }
}`;

export function PlaygroundTabs() {
  const [activeTab, setActiveTab] = useState("products");
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(0);

  const items = generateTabContent(activeTab);

  function switchTab(tab: string) {
    if (useTransitionEnabled) {
      startTransition(() => setActiveTab(tab));
    } else {
      setActiveTab(tab);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Tab Switcher
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {useTransitionEnabled ? "With Transition" : "Without Transition"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch
            checked={useTransitionEnabled}
            onCheckedChange={setUseTransitionEnabled}
          />
          <span className="text-sm">Use Transition</span>
        </div>

        <div className="flex gap-2">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => switchTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[200px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          {isPending && (
            <p className="text-xs text-yellow-600 mb-2 animate-pulse">
              Loading tab content...
            </p>
          )}
          <div className="grid grid-cols-3 gap-1">
            {items.slice(0, 300).map((item) => (
              <div
                key={item}
                className="text-xs font-mono text-muted-foreground truncate px-2 py-1 rounded bg-background/50"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Counter: {counter}
          </Button>
          <span className="text-xs text-muted-foreground">
            This button stays responsive even during tab switches
          </span>
        </div>

        <CodeBlock code={code} filename="tab-switcher.tsx" />
      </CardContent>
    </Card>
  );
}
