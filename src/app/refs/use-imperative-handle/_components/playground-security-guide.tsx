"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Check, X } from "lucide-react";

const questions = [
  {
    id: "forwardRef",
    question:
      "Is a child component exposing a ref to its parent via forwardRef?",
    yes: "That's the entry point — useImperativeHandle only works with forwardRef",
    no: "Without forwardRef, there's no ref to lock down",
  },
  {
    id: "specific",
    question:
      "Does the parent need only specific operations, not full DOM access?",
    yes: "Perfect — define exactly which transactions the parent can perform",
    no: "If the parent genuinely needs the raw DOM node, a plain ref is fine",
  },
  {
    id: "protect",
    question:
      "Do you want to protect the component's internal implementation from outside interference?",
    yes: "Lock it down — keep internals behind the counter",
    no: "If the component is simple and exposure isn't risky, skip the overhead",
  },
];

const guideCode = `// DO lock down — parent only needs play/pause
useImperativeHandle(ref, () => ({
  play()  { videoRef.current.play(); },
  pause() { videoRef.current.pause(); },
}));

// DO lock down — expose validate, not internal form state
useImperativeHandle(ref, () => ({
  validate() { return checkFields(); },
  getData()  { return { ...values }; },
}));

// DON'T — parent genuinely needs the DOM node
const divRef = useRef(null); // no imperative handle needed`;

export function PlaygroundSecurityGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({
    forwardRef: null,
    specific: null,
    protect: null,
  });

  const yesCount = Object.values(answers).filter((v) => v === true).length;
  const answered = Object.values(answers).filter((v) => v !== null).length;

  function getVerdict() {
    if (answered < 3) return null;
    if (yesCount >= 2)
      return {
        text: "Lock it down! Give the parent a teller window, not the vault key.",
        color: "green",
      };
    if (yesCount === 1)
      return {
        text: "Borderline — consider if a simple ref callback would suffice.",
        color: "amber",
      };
    return {
      text: "No lock needed — a plain ref works fine here.",
      color: "red",
    };
  }

  const verdict = getVerdict();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="target">
            🎯
          </span>
          Should You Lock It Down?
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Decision Guide
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Answer these questions to decide if useImperativeHandle fits your
          situation.
        </p>

        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="rounded-lg border p-3 space-y-2">
              <p className="text-sm font-medium">{q.question}</p>
              <div className="flex gap-2">
                <button
                  className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                    answers[q.id] === true
                      ? "bg-green-500/20 text-green-600 border border-green-500/40"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: true }))
                  }
                >
                  <Check className="size-3" /> Yes
                </button>
                <button
                  className={`flex items-center gap-1 rounded px-3 py-1 text-sm transition-colors ${
                    answers[q.id] === false
                      ? "bg-red-500/20 text-red-600 border border-red-500/40"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: false }))
                  }
                >
                  <X className="size-3" /> No
                </button>
              </div>
              {answers[q.id] !== null && (
                <p className="text-xs text-muted-foreground">
                  {answers[q.id] ? q.yes : q.no}
                </p>
              )}
            </div>
          ))}
        </div>

        {verdict && (
          <div
            className="rounded-lg p-4 text-center font-medium"
            style={{
              backgroundColor:
                verdict.color === "green"
                  ? "rgba(34, 197, 94, 0.1)"
                  : verdict.color === "amber"
                    ? "rgba(245, 158, 11, 0.1)"
                    : "rgba(239, 68, 68, 0.1)",
              color:
                verdict.color === "green"
                  ? "rgb(34, 197, 94)"
                  : verdict.color === "amber"
                    ? "rgb(245, 158, 11)"
                    : "rgb(239, 68, 68)",
            }}
          >
            {verdict.text}
          </div>
        )}

        <CodeBlock code={guideCode} filename="security-guide.tsx" />
      </CardContent>
    </Card>
  );
}
