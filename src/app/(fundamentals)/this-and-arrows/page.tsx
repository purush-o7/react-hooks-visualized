import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Link2, Zap, Repeat2 } from "lucide-react";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";
import { JsonLd } from "@/components/json-ld";

const topics = [
  {
    href: "/this-and-arrows/what-is-this",
    label: "What is this?",
    icon: Eye,
    description:
      "this is a shape shifter — it becomes whatever called it. Global, function, or object context all change its identity.",
  },
  {
    href: "/this-and-arrows/binding-rules",
    label: "Binding Rules",
    icon: Link2,
    description:
      "Implicit, explicit (call/apply/bind), and new binding. Learn the priority order that decides what this becomes.",
  },
  {
    href: "/this-and-arrows/arrow-functions",
    label: "Arrow Functions",
    icon: Zap,
    description:
      "Arrow functions freeze the shape forever — they capture this from where they're defined, not where they're called.",
  },
  {
    href: "/this-and-arrows/this-in-react",
    label: "this in React",
    icon: Repeat2,
    description:
      "The class component binding pain, why hooks solved it, and how arrow functions made event handlers simple.",
  },
];

export const metadata: Metadata = {
  title: "this & Arrow Functions",
  description: "How this changes based on context, binding rules, and why arrow functions lock it in place",
};

const THIS_AND_ARROWS_MISTAKES: Mistake[] = [
  {
    title: "Losing this when passing methods as callbacks",
    subtitle: "Extracting a method from an object strips away its this binding",
    filename: "timer.js",
    wrongCode: `class Timer {
  constructor() {
    this.seconds = 0;
  }
  tick() {
    this.seconds++;              // 'this' is undefined here!
    console.log(this.seconds);
  }
  start() {
    setInterval(this.tick, 1000); // passes reference, loses this
  }
}`,
    rightCode: `class Timer {
  seconds = 0;
  // Arrow function class field — inherits this from the class
  tick = () => {
    this.seconds++;
    console.log(this.seconds);
  };
  start() {
    setInterval(this.tick, 1000); // this is preserved
  }
}`,
    explanation:
      "In JavaScript, this is determined by how a function is called, not where it is defined. When you pass this.tick as a callback, it loses its this context — the method is called as a plain function. Arrow function class fields permanently capture this from the class instance.",
  },
  {
    title: "Arrow functions as object methods",
    subtitle: "Using arrow syntax for methods that need dynamic this binding",
    filename: "person.js",
    wrongCode: `const person = {
  name: "Alice",
  // Arrow function captures outer this (window/undefined)
  greet: () => {
    console.log(\`Hi, I'm \${this.name}\`); // this is NOT person!
  },
};
person.greet(); // "Hi, I'm undefined"`,
    rightCode: `const person = {
  name: "Alice",
  // Regular method — this is the calling object
  greet() {
    console.log(\`Hi, I'm \${this.name}\`); // this IS person
  },
};
person.greet(); // "Hi, I'm Alice"`,
    explanation:
      "Arrow functions don't have their own this — they permanently capture it from the enclosing lexical scope. When used as object methods, this refers to the outer scope (often window or undefined), not the object. Use regular function syntax for object methods that need dynamic this.",
  },
  {
    title: "Forgetting to bind in React class components",
    subtitle: "Event handlers in class components lose this without explicit binding",
    filename: "toggle.jsx",
    wrongCode: `class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: false };
    // Forgot to bind handleClick!
  }
  handleClick() {
    // TypeError: Cannot read property 'setState' of undefined
    this.setState({ isOn: !this.state.isOn });
  }
  render() {
    return <button onClick={this.handleClick}>Toggle</button>;
  }
}`,
    rightCode: `class Toggle extends React.Component {
  state = { isOn: false };

  // Arrow class field — no binding needed
  handleClick = () => {
    this.setState(prev => ({ isOn: !prev.isOn }));
  };

  render() {
    return <button onClick={this.handleClick}>Toggle</button>;
  }
}
// Or use function components + hooks to avoid this entirely`,
    explanation:
      "In React class components, event handler methods are not automatically bound to the class instance. When JSX passes the method as onClick={this.handleClick}, the reference loses its this binding. Use arrow function class fields, or just use function components where this problem doesn't exist.",
  },
];

export default function ThisAndArrowsPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "this & Arrow Functions",
          description:
            "How this changes based on context, binding rules, and why arrow functions lock it in place",
          url: "https://hooks-101.vercel.app/this-and-arrows",
          hasPart: topics.map((t) => ({
            "@type": "TechArticle",
            name: t.label,
            url: `https://hooks-101.vercel.app${t.href}`,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: THIS_AND_ARROWS_MISTAKES.map((m) => ({
            "@type": "Question",
            name: m.title,
            acceptedAnswer: { "@type": "Answer", text: m.explanation },
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-purple-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            this & Arrow Functions
          </h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          <code className="text-foreground">this</code> is a shape shifter — it
          becomes whatever called it. Arrow functions freeze its form forever.
          Understanding this is key to reading React code confidently.
        </p>
        <div className="mt-4 rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-3">
          <p className="text-sm text-purple-600 dark:text-purple-400">
            💡 Arrow functions and closures replaced the this binding nightmare. Understanding both is why modern React code just works.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link key={topic.href} href={topic.href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <topic.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">{topic.label}</CardTitle>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <CommonMistakes mistakes={THIS_AND_ARROWS_MISTAKES} />
      </div>
    </div>
  );
}
