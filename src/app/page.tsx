import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Box,
  Zap,
  Link2,
  Pointer,
  Gauge,
  Puzzle,
  Database,
} from "lucide-react";

const reactCategories = [
  {
    href: "/state-management",
    label: "State Management",
    icon: Box,
    description:
      "useState and useReducer — manage local and complex component state.",
    hookCount: 2,
  },
  {
    href: "/side-effects",
    label: "Side Effects",
    icon: Zap,
    description:
      "useEffect — synchronize with external systems, fetch data, run timers.",
    hookCount: 1,
  },
  {
    href: "/context",
    label: "Context",
    icon: Link2,
    description:
      "useContext — share state across the component tree without prop drilling.",
    hookCount: 1,
  },
  {
    href: "/refs",
    label: "Refs",
    icon: Pointer,
    description:
      "useRef — access DOM elements and persist mutable values across renders.",
    hookCount: 1,
  },
  {
    href: "/performance",
    label: "Performance",
    icon: Gauge,
    description:
      "useMemo and useCallback — optimize rendering through memoization.",
    hookCount: 2,
  },
  {
    href: "/custom-hooks",
    label: "Custom Hooks",
    icon: Puzzle,
    description:
      "Extract and reuse stateful logic across components with custom hooks.",
    hookCount: 3,
  },
];

const tanstackCategory = {
  href: "/tanstack-query",
  label: "TanStack Query",
  icon: Database,
  description:
    "useQuery and useMutation — fetch, cache, and mutate server state.",
  hookCount: 2,
};

export default function Home() {
  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Learn React Hooks
        </h1>
        <p className="text-lg text-muted-foreground">
          Each page is a self-contained learning topic with explanations, code
          examples, and interactive demos.
        </p>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">React Hooks</h2>
          <Badge variant="outline">Core</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reactCategories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <category.icon className="size-4 text-muted-foreground" />
                    <CardTitle className="text-base">
                      {category.label}
                    </CardTitle>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {category.hookCount}{" "}
                      {category.hookCount === 1 ? "hook" : "hooks"}
                    </Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold">TanStack Query</h2>
          <Badge variant="secondary">v5</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href={tanstackCategory.href}>
            <Card className="h-full transition-colors hover:border-primary/50 hover:shadow-md cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <tanstackCategory.icon className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">
                    {tanstackCategory.label}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    {tanstackCategory.hookCount} hooks
                  </Badge>
                </div>
                <CardDescription>
                  {tanstackCategory.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
