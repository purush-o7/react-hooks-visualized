"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/code-block";

const INITIAL_MESSAGES = [
  "Hey! Welcome to the chat.",
  "This demo shows auto-scrolling behavior.",
  "Try adding messages and watch the scroll.",
];

const code = `// With useLayoutEffect — scrolls BEFORE paint
useLayoutEffect(() => {
  listRef.current?.lastElementChild
    ?.scrollIntoView({ behavior: "instant" });
}, [messages]);

// With useEffect — scrolls AFTER paint (visible jump)
useEffect(() => {
  listRef.current?.lastElementChild
    ?.scrollIntoView({ behavior: "instant" });
}, [messages]);`;

export function PlaygroundAutoScroll() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [useLayout, setUseLayout] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const msgCounter = useRef(INITIAL_MESSAGES.length);

  // Conditional hook usage — in real apps you'd pick one.
  // Here we use both but only one does the scroll.
  useLayoutEffect(() => {
    if (useLayout && listRef.current) {
      listRef.current.lastElementChild?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages, useLayout]);

  useEffect(() => {
    if (!useLayout && listRef.current) {
      listRef.current.lastElementChild?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages, useLayout]);

  function addMessage() {
    msgCounter.current += 1;
    setMessages((prev) => [
      ...prev,
      `Message #${msgCounter.current} — added at ${new Date().toLocaleTimeString()}`,
    ]);
  }

  function addBatch() {
    const batch = Array.from({ length: 10 }, (_, i) => {
      msgCounter.current += 1;
      return `Batch message #${msgCounter.current}`;
    });
    setMessages((prev) => [...prev, ...batch]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Chat Auto-Scroll
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {useLayout ? "useLayoutEffect" : "useEffect"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch checked={useLayout} onCheckedChange={setUseLayout} />
          <span className="text-sm">
            {useLayout ? "useLayoutEffect (no jump)" : "useEffect (may jump)"}
          </span>
        </div>

        <div
          ref={listRef}
          className="rounded-lg border bg-muted/30 p-3 h-[200px] overflow-y-auto space-y-2"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className="rounded-lg bg-background px-3 py-2 text-sm"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addMessage}>
            Add Message
          </Button>
          <Button variant="outline" size="sm" onClick={addBatch}>
            Add 10 Messages
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMessages(INITIAL_MESSAGES)}
            className="text-muted-foreground"
          >
            Reset
          </Button>
        </div>

        <CodeBlock code={code} filename="auto-scroll.tsx" />
      </CardContent>
    </Card>
  );
}
