"use client";

import { useState, useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const code = `const id = useId();

<label htmlFor={id + "-email"}>Email</label>
<input
  id={id + "-email"}
  aria-describedby={id + "-email-error"}
/>
{error && (
  <p id={id + "-email-error"} role="alert">
    {error}
  </p>
)}

// Screen readers announce the error
// because aria-describedby links them`;

export function PlaygroundAccessibleForm() {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Must be a valid email";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Must be at least 6 characters";
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Accessible Form
            <Badge className="bg-green-600 ml-auto text-xs">Submitted!</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-green-600 font-medium">
            Form submitted successfully!
          </p>
          <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setPassword(""); setErrors({}); }}>
            Reset
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Accessible Form
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            aria-describedby
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor={id + "-name"} className="text-sm font-medium">
              Name
            </label>
            <Input
              id={id + "-name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby={errors.name ? id + "-name-error" : undefined}
              aria-invalid={!!errors.name}
              placeholder="John Doe"
            />
            {errors.name && (
              <p id={id + "-name-error"} role="alert" className="text-xs text-red-500">
                {errors.name}
              </p>
            )}
            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
              id=&quot;{id}-name&quot;
            </Badge>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={id + "-email"} className="text-sm font-medium">
              Email
            </label>
            <Input
              id={id + "-email"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={errors.email ? id + "-email-error" : undefined}
              aria-invalid={!!errors.email}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p id={id + "-email-error"} role="alert" className="text-xs text-red-500">
                {errors.email}
              </p>
            )}
            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
              id=&quot;{id}-email&quot;
            </Badge>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={id + "-password"} className="text-sm font-medium">
              Password
            </label>
            <Input
              id={id + "-password"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={errors.password ? id + "-password-error" : undefined}
              aria-invalid={!!errors.password}
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p id={id + "-password-error"} role="alert" className="text-xs text-red-500">
                {errors.password}
              </p>
            )}
            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
              id=&quot;{id}-password&quot;
            </Badge>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Click any label to focus its exact input. Error messages are linked via
          aria-describedby for screen readers.
        </p>

        <CodeBlock code={code} filename="accessible-form.tsx" />
      </CardContent>
    </Card>
  );
}
