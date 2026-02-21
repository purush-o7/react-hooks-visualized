"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const code = `const firstNameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);

// Imperatively focus an input:
firstNameRef.current?.focus();

// In JSX:
<input ref={firstNameRef} />`;

export function PlaygroundFocus() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          Focus Manager
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            DOM Ref
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click the buttons to focus different inputs — useRef gives you direct
          access to DOM elements.
        </p>

        <div className="space-y-3">
          <Input ref={firstNameRef} placeholder="First Name" />
          <Input ref={lastNameRef} placeholder="Last Name" />
          <Input ref={emailRef} placeholder="Email" type="email" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => firstNameRef.current?.focus()}
          >
            Focus First Name
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => lastNameRef.current?.focus()}
          >
            Focus Last Name
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => emailRef.current?.focus()}
          >
            Focus Email
          </Button>
        </div>

        <CodeBlock code={code} filename="focus-manager.tsx" />
      </CardContent>
    </Card>
  );
}
