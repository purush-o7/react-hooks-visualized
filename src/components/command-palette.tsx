"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  PackageOpen,
  Snowflake,
  Clock,
  AtSign,
  ToggleLeft,
  Zap,
  Network,
  Crosshair,
  Gauge,
  Wrench,
  Database,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { trackEvent } from "@/lib/analytics";

type NavItem = {
  href: string;
  label: string;
};

type NavGroup = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "Rendering",
    icon: Activity,
    items: [
      { href: "/rendering", label: "Rendering Overview" },
      { href: "/rendering/what-is-rendering", label: "What is Rendering?" },
      { href: "/rendering/variables-reset", label: "Variables Reset" },
      { href: "/rendering/code-reexecution", label: "Code Re-execution" },
      { href: "/rendering/render-cascade", label: "Render Cascade" },
      { href: "/rendering/expensive-work", label: "Expensive Work" },
      { href: "/rendering/reference-trap", label: "Reference Trap" },
    ],
  },
  {
    label: "Closures",
    icon: PackageOpen,
    items: [
      { href: "/closures", label: "Closures Overview" },
      { href: "/closures/what-is-a-closure", label: "What is a Closure?" },
      { href: "/closures/closures-in-loops", label: "Closures in Loops" },
      { href: "/closures/stale-closures", label: "Stale Closures" },
      { href: "/closures/closures-and-hooks", label: "Closures & Hooks" },
    ],
  },
  {
    label: "Immutability",
    icon: Snowflake,
    items: [
      { href: "/immutability", label: "Immutability Overview" },
      { href: "/immutability/value-vs-reference", label: "Value vs Reference" },
      { href: "/immutability/why-mutation-breaks-react", label: "Why Mutation Breaks React" },
      { href: "/immutability/spreading-101", label: "Spreading 101" },
      { href: "/immutability/array-operations", label: "Array Operations" },
    ],
  },
  {
    label: "Async JavaScript",
    icon: Clock,
    items: [
      { href: "/async", label: "Async Overview" },
      { href: "/async/event-loop", label: "Event Loop" },
      { href: "/async/callbacks-to-promises", label: "Callbacks to Promises" },
      { href: "/async/async-await", label: "Async / Await" },
      { href: "/async/async-in-react", label: "Async in React" },
    ],
  },
  {
    label: "this & Arrows",
    icon: AtSign,
    items: [
      { href: "/this-and-arrows", label: "this & Arrows Overview" },
      { href: "/this-and-arrows/what-is-this", label: "What is this?" },
      { href: "/this-and-arrows/binding-rules", label: "Binding Rules" },
      { href: "/this-and-arrows/arrow-functions", label: "Arrow Functions" },
      { href: "/this-and-arrows/this-in-react", label: "this in React" },
    ],
  },
  {
    label: "State Management",
    icon: ToggleLeft,
    items: [
      { href: "/state-management", label: "State Management Overview" },
      { href: "/state-management/use-state", label: "useState" },
      { href: "/state-management/use-reducer", label: "useReducer" },
    ],
  },
  {
    label: "Side Effects",
    icon: Zap,
    items: [
      { href: "/side-effects", label: "Side Effects Overview" },
      { href: "/side-effects/use-effect", label: "useEffect" },
      { href: "/side-effects/use-layout-effect", label: "useLayoutEffect" },
    ],
  },
  {
    label: "Context",
    icon: Network,
    items: [
      { href: "/context", label: "Context Overview" },
      { href: "/context/use-context", label: "useContext" },
    ],
  },
  {
    label: "Refs",
    icon: Crosshair,
    items: [
      { href: "/refs", label: "Refs Overview" },
      { href: "/refs/use-ref", label: "useRef" },
      { href: "/refs/use-id", label: "useId" },
      { href: "/refs/use-imperative-handle", label: "useImperativeHandle" },
    ],
  },
  {
    label: "Performance",
    icon: Gauge,
    items: [
      { href: "/performance", label: "Performance Overview" },
      { href: "/performance/use-memo", label: "useMemo" },
      { href: "/performance/use-callback", label: "useCallback" },
      { href: "/performance/use-transition", label: "useTransition" },
      { href: "/performance/use-deferred-value", label: "useDeferredValue" },
    ],
  },
  {
    label: "Custom Hooks",
    icon: Wrench,
    items: [
      { href: "/custom-hooks", label: "Custom Hooks" },
    ],
  },
  {
    label: "TanStack Query",
    icon: Database,
    items: [
      { href: "/tanstack-query", label: "TanStack Query Overview" },
      { href: "/tanstack-query/use-query", label: "useQuery" },
      { href: "/tanstack-query/use-mutation", label: "useMutation" },
    ],
  },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
      trackEvent("command_palette", "navigation", href);
    },
    [router]
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-7 w-7"
      >
        <Search className="size-4" />
        <span className="sr-only">Search</span>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Navigate"
        description="Search topics, hooks, and fundamentals"
      >
        <CommandInput placeholder="Search topics, hooks..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${group.label} ${item.label}`}
                  onSelect={() => handleSelect(item.href)}
                >
                  <group.icon className="size-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
