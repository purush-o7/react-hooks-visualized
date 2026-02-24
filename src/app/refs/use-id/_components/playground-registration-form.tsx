"use client";

import { useState, useId } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

const registrationCode = `const id = useId();

<label htmlFor={id + "-plate"}>License Plate</label>
<input
  id={id + "-plate"}
  aria-describedby={id + "-plate-error"}
/>
{error && (
  <p id={id + "-plate-error"} role="alert">
    {error}
  </p>
)}

// Screen readers announce the error
// because aria-describedby links them`;

export function PlaygroundRegistrationForm() {
  const id = useId();
  const [owner, setOwner] = useState("");
  const [plate, setPlate] = useState("");
  const [vin, setVin] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!owner.trim()) newErrors.owner = "Owner name is required";
    if (!plate.trim()) newErrors.plate = "License plate is required";
    if (!vin.trim()) newErrors.vin = "VIN number is required";
    else if (vin.trim().length < 6)
      newErrors.vin = "VIN must be at least 6 characters";
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

  function handleReset() {
    setOwner("");
    setPlate("");
    setVin("");
    setErrors({});
    setSubmitted(false);
  }

  const fields = [
    {
      key: "owner",
      label: "Owner Name",
      value: owner,
      setter: setOwner,
      placeholder: "John Doe",
    },
    {
      key: "plate",
      label: "License Plate",
      value: plate,
      setter: setPlate,
      placeholder: "ABC-1234",
    },
    {
      key: "vin",
      label: "VIN Number",
      value: vin,
      setter: setVin,
      placeholder: "1HGBH41JXMN109186",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          Vehicle Registration
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            aria-describedby
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click any label to focus its input. Error messages are linked via
          aria-describedby for screen readers.
        </p>

        {submitted ? (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-6 text-center space-y-3">
            <Badge className="bg-green-600 hover:bg-green-700">
              Vehicle registered successfully!
            </Badge>
            <p className="text-sm text-muted-foreground">
              All fields linked correctly via useId — screen readers can trace
              every error to its field.
            </p>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset Form
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
              const fieldId = id + "-" + field.key;
              const errorId = id + "-" + field.key + "-error";

              return (
                <div key={field.key} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={fieldId}
                      className="text-sm font-medium cursor-pointer hover:underline"
                    >
                      {field.label}
                    </label>
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] text-amber-600 border-amber-600/30"
                    >
                      id=&quot;{fieldId}&quot;
                    </Badge>
                  </div>
                  <Input
                    id={fieldId}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    aria-describedby={
                      errors[field.key] ? errorId : undefined
                    }
                    className={errors[field.key] ? "border-red-500/50" : ""}
                  />
                  {errors[field.key] && (
                    <p
                      id={errorId}
                      role="alert"
                      className="text-xs text-red-500"
                    >
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              );
            })}

            <Button type="submit" variant="outline">
              Register Vehicle
            </Button>
          </form>
        )}

        <CodeBlock
          code={registrationCode}
          filename="registration-form.tsx"
        />
      </CardContent>
    </Card>
  );
}
