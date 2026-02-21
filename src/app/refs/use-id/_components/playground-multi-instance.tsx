"use client";

import { useState, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

function FormInstance({ index, onIdGenerated }: { index: number; onIdGenerated: (id: string) => void }) {
  const id = useId();
  const inputId = id + "-name";

  // Report ID on mount
  useState(() => {
    onIdGenerated(inputId);
  });

  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          Instance #{index + 1}
        </Badge>
        <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
          {inputId}
        </Badge>
      </div>
      <div className="space-y-1">
        <label htmlFor={inputId} className="text-sm font-medium cursor-pointer hover:underline">
          Name
        </label>
        <Input id={inputId} placeholder="Click the label..." />
      </div>
    </div>
  );
}

const code = `function FormInstance() {
  const id = useId();
  // Each instance: ":r1:-name", ":r2:-name", etc.

  return (
    <>
      <label htmlFor={id + "-name"}>Name</label>
      <input id={id + "-name"} />
    </>
  );
}

// Add as many as you want — zero collisions!`;

export function PlaygroundMultiInstance() {
  const [count, setCount] = useState(2);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  function handleIdGenerated(id: string) {
    setGeneratedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function addForm() {
    setCount((c) => c + 1);
  }

  function removeForm() {
    if (count > 1) {
      setCount((c) => c - 1);
      setGeneratedIds((prev) => prev.slice(0, -1));
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Dynamic Form Instances
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            {count} Instances
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addForm}>
            Add Form
          </Button>
          <Button variant="outline" size="sm" onClick={removeForm} disabled={count <= 1}>
            Remove Form
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: count }, (_, i) => (
            <FormInstance key={i} index={i} onIdGenerated={handleIdGenerated} />
          ))}
        </div>

        {generatedIds.length > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs font-medium mb-2">Generated IDs:</p>
            <div className="flex flex-wrap gap-1.5">
              {generatedIds.slice(0, count).map((id) => (
                <Badge key={id} variant="outline" className="font-mono text-[10px]">
                  {id}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <CodeBlock code={code} filename="multi-instance.tsx" />
      </CardContent>
    </Card>
  );
}
