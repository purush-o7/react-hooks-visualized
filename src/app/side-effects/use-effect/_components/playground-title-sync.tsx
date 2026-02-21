"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const code = `const [title, setTitle] = useState("My Page");

useEffect(() => {
  document.title = title;  // sync with browser tab
}, [title]);  // only runs when 'title' changes

// Changing other state? This effect is SKIPPED.`;

export function PlaygroundTitleSync() {
  const [title, setTitle] = useState("My Page");
  const [otherState, setOtherState] = useState(0);

  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "Learn Hooks";
    };
  }, [title]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          Document Title Sync
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Dependency Array
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Type below and watch your browser tab title change in real-time.
        </p>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type a page title..."
        />

        <div className="flex items-center gap-3">
          <button
            className="text-sm text-muted-foreground underline"
            onClick={() => setOtherState((c) => c + 1)}
          >
            Update unrelated state ({otherState})
          </button>
          <span className="text-xs text-muted-foreground">
            — title effect doesn&apos;t re-run!
          </span>
        </div>

        <CodeBlock code={code} filename="title-sync.tsx" />
      </CardContent>
    </Card>
  );
}
