"use client";

import { useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Fix = "broken" | "constructor-bind" | "arrow-field" | "inline-arrow";

const fixes: {
  id: Fix;
  label: string;
  code: string;
  works: boolean;
  explanation: string;
}[] = [
  {
    id: "broken",
    label: "Broken (no bind)",
    code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick() {
    // 'this' is undefined when called as callback!
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}`,
    works: false,
    explanation:
      "When React calls handleClick as an event handler, it's a loose call — this becomes undefined. The class instance is lost.",
  },
  {
    id: "constructor-bind",
    label: "Fix: bind in constructor",
    code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Lock 'this' to the instance forever
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}`,
    works: true,
    explanation:
      "bind(this) in the constructor creates a new function with this permanently locked to the class instance. Works, but verbose.",
  },
  {
    id: "arrow-field",
    label: "Fix: arrow class field",
    code: `class Counter extends React.Component {
  state = { count: 0 };

  // Arrow function as class field — this is auto-bound
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}`,
    works: true,
    explanation:
      "Arrow class fields inherit this from the constructor scope (the instance). No manual bind needed — the most common class component pattern.",
  },
  {
    id: "inline-arrow",
    label: "Fix: inline arrow",
    code: `class Counter extends React.Component {
  state = { count: 0 };

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        Count: {this.state.count}
      </button>
    );
  }
}`,
    works: true,
    explanation:
      "The inline arrow captures this from render(), which is called on the instance. Works but creates a new function every render.",
  },
];

export function ExampleClassBinding() {
  const [active, setActive] = useState<Fix | null>(null);

  const fix = active ? fixes.find((f) => f.id === active) : null;

  return (
    <GlowCard
      className="p-6 md:p-8"
      glowColor={
        fix
          ? fix.works
            ? "rgba(34, 197, 94, 0.35)"
            : "rgba(239, 68, 68, 0.35)"
          : "rgba(239, 68, 68, 0.35)"
      }
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700">
            CLASS COMPONENTS
          </Badge>
          <span className="text-sm text-muted-foreground">
            The <code>this</code> binding problem and its fixes
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          {fixes.map((f) => (
            <Button
              key={f.id}
              variant={active === f.id ? "default" : "outline"}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {fix && (
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-xs whitespace-pre overflow-x-auto">
              {fix.code}
            </div>
            <div
              className={`rounded-lg p-4 text-sm ${
                fix.works ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              <p className="flex items-center gap-2 mb-1">
                <span
                  className={`font-medium ${fix.works ? "text-green-500" : "text-red-500"}`}
                >
                  {fix.works ? "Works" : "Broken"}
                </span>
              </p>
              <p className="text-muted-foreground">{fix.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
