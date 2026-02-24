"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const WARDS = [
  "Emergency",
  "ICU",
  "General",
  "Pediatrics",
  "Oncology",
  "Cardiology",
  "Neurology",
  "Orthopedics",
];
const CONDITIONS = [
  "Stable",
  "Critical",
  "Recovering",
  "Observation",
  "Pre-Op",
  "Post-Op",
  "Chronic",
  "Acute",
];
const FIRST_NAMES = [
  "James",
  "Maria",
  "Chen",
  "Aisha",
  "Erik",
  "Priya",
  "Omar",
  "Sofia",
  "Kai",
  "Luna",
];
const LAST_NAMES = [
  "Smith",
  "Garcia",
  "Kim",
  "Patel",
  "Johnson",
  "Li",
  "Brown",
  "Wilson",
  "Davis",
  "Moore",
];

const PATIENTS = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Dr. ${LAST_NAMES[i % LAST_NAMES.length]} — ${FIRST_NAMES[(i * 3) % FIRST_NAMES.length]}`,
  condition: CONDITIONS[i % CONDITIONS.length],
  ward: WARDS[(i * 7) % WARDS.length],
}));

const lookupCode = `const [query, setQuery] = useState("");
const [searchQuery, setSearchQuery] = useState("");
const [isPending, startTransition] = useTransition();

function handleLookup(value: string) {
  setQuery(value);            // instant input update
  startTransition(() => {
    setSearchQuery(value);    // deferred search
  });
}
// isPending? Fade the grid while records catch up.`;

export function PlaygroundPatientLookup() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [counter, setCounter] = useState(0);

  function handleLookup(value: string) {
    setQuery(value);
    startTransition(() => {
      setSearchQuery(value);
    });
  }

  const results = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ward.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const display = results.slice(0, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="search">
            🔍
          </span>
          Patient Lookup
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            5,000 Records
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search patients by name, condition, or ward..."
          value={query}
          onChange={(e) => handleLookup(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-mono text-xs">
            {results.length.toLocaleString()} results
          </Badge>
          {isPending && (
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-500 font-mono text-xs animate-pulse"
            >
              Searching records...
            </Badge>
          )}
        </div>

        <div
          className="rounded-lg bg-muted/50 p-3 max-h-[250px] overflow-y-auto transition-opacity duration-200"
          style={{ opacity: isPending ? 0.5 : 1 }}
        >
          {results.length === 0 && searchQuery.length > 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No patients found
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {display.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between px-3 py-2 rounded bg-background/50 text-sm"
                  >
                    <span className="truncate text-xs">{patient.name}</span>
                    <span className="font-mono text-xs text-muted-foreground ml-2">
                      {patient.ward}
                    </span>
                  </div>
                ))}
              </div>
              {results.length > 100 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  ...and {(results.length - 100).toLocaleString()} more
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter((c) => c + 1)}
          >
            Page Doctor: {counter}
          </Button>
          <span className="text-xs text-muted-foreground">
            {counter > 0
              ? "Still responsive during search!"
              : "Click during a search to test responsiveness"}
          </span>
        </div>

        <CodeBlock code={lookupCode} filename="patient-lookup.tsx" />
      </CardContent>
    </Card>
  );
}
