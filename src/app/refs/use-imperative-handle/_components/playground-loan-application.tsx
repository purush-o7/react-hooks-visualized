"use client";

import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/code-block";

type FormStepHandle = {
  validate: () => boolean;
  reset: () => void;
  getData: () => Record<string, string>;
};

const FormStep = forwardRef<
  FormStepHandle,
  { fields: { name: string; label: string; placeholder: string }[] }
>(function FormStep({ fields }, ref) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors: Record<string, string> = {};
      fields.forEach((f) => {
        if (!values[f.name]?.trim()) {
          newErrors[f.name] = `${f.label} is required`;
        }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    reset() {
      setValues({});
      setErrors({});
    },
    getData() {
      return { ...values };
    },
  }));

  return (
    <div className="space-y-3">
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label className="text-sm font-medium">{field.label}</label>
          <Input
            placeholder={field.placeholder}
            value={values[field.name] || ""}
            onChange={(e) =>
              setValues((v) => ({ ...v, [field.name]: e.target.value }))
            }
          />
          {errors[field.name] && (
            <p className="text-xs text-red-500">{errors[field.name]}</p>
          )}
        </div>
      ))}
    </div>
  );
});

const STEPS = [
  {
    title: "Account Holder",
    fields: [
      { name: "fullName", label: "Full Name", placeholder: "Jane Smith" },
      {
        name: "accountNumber",
        label: "Account Number",
        placeholder: "ACCT-00123",
      },
    ],
  },
  {
    title: "Employment",
    fields: [
      {
        name: "employer",
        label: "Employer",
        placeholder: "Acme Corporation",
      },
      {
        name: "annualIncome",
        label: "Annual Income",
        placeholder: "$85,000",
      },
    ],
  },
  {
    title: "Loan Details",
    fields: [
      {
        name: "loanAmount",
        label: "Loan Amount",
        placeholder: "$25,000",
      },
      {
        name: "loanPurpose",
        label: "Loan Purpose",
        placeholder: "Home renovation",
      },
    ],
  },
];

const loanCode = `const FormStep = forwardRef(({ fields }, ref) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    validate() {
      // Check all fields, set errors, return boolean
      return Object.keys(errors).length === 0;
    },
    reset() { setValues({}); setErrors({}); },
    getData() { return { ...values }; },
  }));

  return <form>...</form>;
});

// Loan officer (parent):
function handleNext() {
  if (stepRef.current.validate()) {
    goToNextStep();
  }
}`;

export function PlaygroundLoanApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedData, setCompletedData] = useState<
    Record<string, string>[]
  >([]);
  const stepRef = useRef<FormStepHandle>(null);

  function handleNext() {
    if (stepRef.current?.validate()) {
      const data = stepRef.current.getData();
      setCompletedData((prev) => {
        const updated = [...prev];
        updated[currentStep] = data;
        return updated;
      });
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((s) => s + 1);
      }
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }

  function handleReset() {
    stepRef.current?.reset();
    setCurrentStep(0);
    setCompletedData([]);
  }

  const isLastStep = currentStep === STEPS.length - 1;
  const allDone =
    completedData.length === STEPS.length &&
    isLastStep &&
    completedData[currentStep];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="clipboard">
            📋
          </span>
          Loan Application
          <Badge variant="secondary" className="ml-auto font-mono text-xs">
            Step {currentStep + 1} of {STEPS.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full ${
                i < currentStep
                  ? "bg-green-500"
                  : i === currentStep
                    ? "bg-primary"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium mb-3">
            {STEPS[currentStep].title}
          </h3>
          <FormStep
            key={currentStep}
            ref={stepRef}
            fields={STEPS[currentStep].fields}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button size="sm" onClick={handleNext}>
            {isLastStep ? "Submit" : "Next"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="ml-auto text-muted-foreground"
          >
            Reset
          </Button>
        </div>

        {allDone && (
          <div className="rounded-lg bg-green-500/10 p-3">
            <p className="text-sm font-medium text-green-600 mb-2">
              Loan application submitted!
            </p>
            <div className="space-y-1">
              {completedData.map((data, i) => (
                <div
                  key={i}
                  className="text-xs font-mono text-muted-foreground"
                >
                  {STEPS[i].title}: {JSON.stringify(data)}
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          The loan officer (parent) calls stepRef.current.validate() before
          advancing. Each form step manages its own state — the parent only sees
          the imperative API.
        </p>

        <CodeBlock code={loanCode} filename="loan-application.tsx" />
      </CardContent>
    </Card>
  );
}
