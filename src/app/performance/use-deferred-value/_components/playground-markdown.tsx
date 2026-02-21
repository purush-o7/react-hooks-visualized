"use client";

import { useState, useDeferredValue } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

function renderMarkdown(text: string): string {
  // Simulate expensive processing by doing real work
  let result = text;
  for (let pass = 0; pass < 50; pass++) {
    result = result
      .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold mt-3 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-4 mb-1">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/\n/g, "<br />");
  }
  return result;
}

const INITIAL_MD = `# Hello World

## This is a markdown preview

Type in the editor and watch the **preview** update.

- Item one
- Item two
- Item three

### Features
Use \`useDeferredValue\` to keep the editor *snappy*.`;

const code = `const deferredMarkdown = useDeferredValue(markdown);
const html = renderMarkdown(deferredMarkdown);
const isStale = markdown !== deferredMarkdown;

// Editor is instant, preview follows behind`;

export function PlaygroundMarkdown() {
  const [markdown, setMarkdown] = useState(INITIAL_MD);
  const deferredMarkdown = useDeferredValue(markdown);

  const html = renderMarkdown(deferredMarkdown);
  const isStale = markdown !== deferredMarkdown;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Markdown Preview
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Deferred Render
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Editor</span>
              <Badge variant="outline" className="text-xs">Instant</Badge>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[250px] rounded-lg border bg-background p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Preview</span>
              {isStale ? (
                <Badge variant="outline" className="border-yellow-500 text-yellow-600 text-xs animate-pulse">
                  Updating...
                </Badge>
              ) : (
                <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                  Synced
                </Badge>
              )}
            </div>
            <div
              className="w-full h-[250px] rounded-lg border bg-muted/30 p-3 text-sm overflow-y-auto transition-opacity duration-200"
              style={{ opacity: isStale ? 0.6 : 1 }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>

        <CodeBlock code={code} filename="markdown-preview.tsx" />
      </CardContent>
    </Card>
  );
}
