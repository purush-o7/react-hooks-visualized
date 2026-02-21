"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CodeBlock({
  code,
  filename,
}: {
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden my-4">
      {filename && (
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-3.5 text-green-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
