"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type TopicLink = { href: string; label: string; category: string };

const allTopics: TopicLink[] = [
  // Fundamentals — Rendering
  { href: "/rendering/what-is-rendering", label: "What is Rendering?", category: "Rendering" },
  { href: "/rendering/variables-reset", label: "Variables Reset", category: "Rendering" },
  { href: "/rendering/code-reexecution", label: "Code Re-execution", category: "Rendering" },
  { href: "/rendering/render-cascade", label: "Render Cascade", category: "Rendering" },
  { href: "/rendering/expensive-work", label: "Expensive Work", category: "Rendering" },
  { href: "/rendering/reference-trap", label: "Reference Trap", category: "Rendering" },
  // Fundamentals — Closures
  { href: "/closures/what-is-a-closure", label: "What is a Closure?", category: "Closures" },
  { href: "/closures/closures-in-loops", label: "Closures in Loops", category: "Closures" },
  { href: "/closures/stale-closures", label: "Stale Closures", category: "Closures" },
  { href: "/closures/closures-and-hooks", label: "Closures & Hooks", category: "Closures" },
  // Fundamentals — Immutability
  { href: "/immutability/value-vs-reference", label: "Value vs Reference", category: "Immutability" },
  { href: "/immutability/why-mutation-breaks-react", label: "Mutation Breaks React", category: "Immutability" },
  { href: "/immutability/spreading-101", label: "Spreading 101", category: "Immutability" },
  { href: "/immutability/array-operations", label: "Array Operations", category: "Immutability" },
  // Fundamentals — Async
  { href: "/async/event-loop", label: "Event Loop", category: "Async" },
  { href: "/async/callbacks-to-promises", label: "Callbacks to Promises", category: "Async" },
  { href: "/async/async-await", label: "Async / Await", category: "Async" },
  { href: "/async/async-in-react", label: "Async in React", category: "Async" },
  // Fundamentals — this & Arrows
  { href: "/this-and-arrows/what-is-this", label: "What is this?", category: "this & Arrows" },
  { href: "/this-and-arrows/binding-rules", label: "Binding Rules", category: "this & Arrows" },
  { href: "/this-and-arrows/arrow-functions", label: "Arrow Functions", category: "this & Arrows" },
  { href: "/this-and-arrows/this-in-react", label: "this in React", category: "this & Arrows" },
  // React Hooks — State Management
  { href: "/state-management/use-state", label: "useState", category: "State Management" },
  { href: "/state-management/use-reducer", label: "useReducer", category: "State Management" },
  // React Hooks — Side Effects
  { href: "/side-effects/use-effect", label: "useEffect", category: "Side Effects" },
  { href: "/side-effects/use-layout-effect", label: "useLayoutEffect", category: "Side Effects" },
  // React Hooks — Context
  { href: "/context/use-context", label: "useContext", category: "Context" },
  // React Hooks — Refs
  { href: "/refs/use-ref", label: "useRef", category: "Refs" },
  { href: "/refs/use-id", label: "useId", category: "Refs" },
  { href: "/refs/use-imperative-handle", label: "useImperativeHandle", category: "Refs" },
  // React Hooks — Performance
  { href: "/performance/use-memo", label: "useMemo", category: "Performance" },
  { href: "/performance/use-callback", label: "useCallback", category: "Performance" },
  { href: "/performance/use-transition", label: "useTransition", category: "Performance" },
  { href: "/performance/use-deferred-value", label: "useDeferredValue", category: "Performance" },
  // Custom Hooks
  { href: "/custom-hooks", label: "Custom Hooks", category: "Custom Hooks" },
  // TanStack Query
  { href: "/tanstack-query/use-query", label: "useQuery", category: "TanStack Query" },
  { href: "/tanstack-query/use-mutation", label: "useMutation", category: "TanStack Query" },
];

export function TopicNav() {
  const pathname = usePathname();

  const currentIndex = allTopics.findIndex((t) => t.href === pathname);
  if (currentIndex === -1) return null;

  const current = allTopics[currentIndex];
  const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="flex items-center justify-between border-t pt-8 mt-12">
      {prev ? (
        <Link
          href={prev.href}
          onClick={() => trackEvent("topic_nav", "navigation", `prev: ${prev.label}`)}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="text-right">
            <div className="text-xs text-muted-foreground/70">
              {prev.category !== current.category ? prev.category : "Previous"}
            </div>
            <div className="font-medium">{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          onClick={() => trackEvent("topic_nav", "navigation", `next: ${next.label}`)}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <div className="text-xs text-muted-foreground/70">
              {next.category !== current.category ? next.category : "Next"}
            </div>
            <div className="font-medium">{next.label}</div>
          </div>
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
