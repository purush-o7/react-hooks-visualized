import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Flame, Layers, Database } from "lucide-react";
import { CommonMistakes, type Mistake } from "@/components/common-mistakes";
import { JsonLd } from "@/components/json-ld";

const topics = [
  {
    href: "/immutability/value-vs-reference",
    label: "Value vs Reference",
    icon: Copy,
    description:
      "Primitives are copied by value (like mixing a new glaze). Objects are shared by reference (like pointing to the same pot).",
  },
  {
    href: "/immutability/why-mutation-breaks-react",
    label: "Why Mutation Breaks React",
    icon: Flame,
    description:
      "React uses Object.is() to detect changes. Mutating an object keeps the same reference — React sees no change.",
  },
  {
    href: "/immutability/spreading-101",
    label: "Spreading 101",
    icon: Layers,
    description:
      "The spread operator creates shallow copies. Learn the pattern — and the nested-object pitfall.",
  },
  {
    href: "/immutability/array-operations",
    label: "Array Operations",
    icon: Database,
    description:
      "Immutable add, remove, and update patterns that replace push, splice, and direct index assignment.",
  },
];

export const metadata: Metadata = {
  title: "Immutability in React",
  description: "Value vs reference, why mutation breaks React, spread patterns, and immutable array operations",
};

const IMMUTABILITY_MISTAKES: Mistake[] = [
  {
    title: "Mutating arrays with push/splice",
    subtitle: "Using push(), splice(), or sort() directly on state arrays",
    filename: "list.tsx",
    wrongCode: `function TodoList() {
  const [items, setItems] = useState(["Buy milk"]);

  function addItem(text) {
    items.push(text);       // mutates the existing array!
    setItems(items);        // same reference — React skips re-render
  }

  function removeFirst() {
    items.splice(0, 1);    // mutates in place!
    setItems(items);
  }
}`,
    rightCode: `function TodoList() {
  const [items, setItems] = useState(["Buy milk"]);

  function addItem(text) {
    setItems(prev => [...prev, text]);        // spread to add
  }

  function removeFirst() {
    setItems(prev => prev.filter((_, i) => i !== 0)); // filter to remove
  }
}`,
    explanation:
      "Methods like push(), pop(), splice(), sort(), and reverse() mutate the original array. When you mutate a state array and call setState with the same reference, React's shallow comparison sees the same object and skips re-rendering. Always create a new array with spread, filter, or map.",
  },
  {
    title: "Mutating objects directly",
    subtitle: "Modifying a property on a state object instead of creating a new one",
    filename: "profile.tsx",
    wrongCode: `function Profile() {
  const [user, setUser] = useState({ name: "Alice", age: 25 });

  function handleBirthday() {
    user.age += 1;    // mutates existing object
    setUser(user);    // same reference — no re-render!
  }
}`,
    rightCode: `function Profile() {
  const [user, setUser] = useState({ name: "Alice", age: 25 });

  function handleBirthday() {
    setUser(prev => ({ ...prev, age: prev.age + 1 })); // new object
  }
}`,
    explanation:
      "Directly modifying a property on a state object changes the existing object without creating a new reference. React uses Object.is() to detect changes — same reference means no change detected, no re-render. Always create a new object with the spread operator.",
  },
  {
    title: "Shallow copy pitfall with nested objects",
    subtitle: "Spread only copies the top level — nested objects are still shared references",
    filename: "settings.tsx",
    wrongCode: `function Settings() {
  const [user, setUser] = useState({
    name: "Alice",
    address: { city: "NYC", zip: "10001" },
  });

  function updateCity(city) {
    const newUser = { ...user };
    newUser.address.city = city; // MUTATES user.address too!
    setUser(newUser);
  }
}`,
    rightCode: `function Settings() {
  const [user, setUser] = useState({
    name: "Alice",
    address: { city: "NYC", zip: "10001" },
  });

  function updateCity(city) {
    setUser(prev => ({
      ...prev,
      address: { ...prev.address, city }, // spread at every level
    }));
  }
}`,
    explanation:
      "The spread operator only creates a shallow copy. Top-level properties get new values, but nested objects are still shared references. Modifying a nested property on the 'copy' also modifies the original. Spread at every level of nesting, or use structuredClone() for deep copies.",
  },
];

export default function ImmutabilityPage() {
  return (
    <div className="max-w-4xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Immutability in React",
          description: "Value vs reference, why mutation breaks React, spread patterns, and immutable array operations",
          url: "https://hooks-101.vercel.app/immutability",
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
          mainEntity: IMMUTABILITY_MISTAKES.map((m) => ({
            "@type": "Question",
            name: m.title,
            acceptedAnswer: {
              "@type": "Answer",
              text: m.explanation,
            },
          })),
        }}
      />
      <div className="mb-10">
        <div className="h-1 w-12 rounded-full bg-teal-500 mb-4" />
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Immutability</h1>
          <Badge>Foundational</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          React relies on immutable updates to detect changes. Like pottery
          that&apos;s been fired — you can&apos;t reshape it, you make a new
          one.
        </p>
        <div className="mt-4 rounded-lg border border-teal-500/20 bg-teal-500/5 px-4 py-3">
          <p className="text-sm text-teal-600 dark:text-teal-400">
            💡 React uses Object.is() to detect changes. Without immutable updates, your state changes become invisible to React.
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
        <CommonMistakes mistakes={IMMUTABILITY_MISTAKES} />
      </div>
    </div>
  );
}
