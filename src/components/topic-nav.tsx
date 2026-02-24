"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TopicLink = { href: string; label: string };

const categoryTopics: Record<string, TopicLink[]> = {
  "/rendering": [
    { href: "/rendering/what-is-rendering", label: "What is Rendering?" },
    { href: "/rendering/variables-reset", label: "Variables Reset" },
    { href: "/rendering/code-reexecution", label: "Code Re-execution" },
    { href: "/rendering/render-cascade", label: "Render Cascade" },
    { href: "/rendering/expensive-work", label: "Expensive Work" },
    { href: "/rendering/reference-trap", label: "Reference Trap" },
  ],
  "/closures": [
    { href: "/closures/what-is-a-closure", label: "What is a Closure?" },
    { href: "/closures/closures-in-loops", label: "Closures in Loops" },
    { href: "/closures/stale-closures", label: "Stale Closures" },
    { href: "/closures/closures-and-hooks", label: "Closures & Hooks" },
  ],
  "/immutability": [
    { href: "/immutability/value-vs-reference", label: "Value vs Reference" },
    { href: "/immutability/why-mutation-breaks-react", label: "Mutation Breaks React" },
    { href: "/immutability/spreading-101", label: "Spreading 101" },
    { href: "/immutability/array-operations", label: "Array Operations" },
  ],
  "/async": [
    { href: "/async/event-loop", label: "Event Loop" },
    { href: "/async/callbacks-to-promises", label: "Callbacks to Promises" },
    { href: "/async/async-await", label: "Async / Await" },
    { href: "/async/async-in-react", label: "Async in React" },
  ],
  "/this-and-arrows": [
    { href: "/this-and-arrows/what-is-this", label: "What is this?" },
    { href: "/this-and-arrows/binding-rules", label: "Binding Rules" },
    { href: "/this-and-arrows/arrow-functions", label: "Arrow Functions" },
    { href: "/this-and-arrows/this-in-react", label: "this in React" },
  ],
  "/state-management": [
    { href: "/state-management/use-state", label: "useState" },
    { href: "/state-management/use-reducer", label: "useReducer" },
  ],
  "/side-effects": [
    { href: "/side-effects/use-effect", label: "useEffect" },
    { href: "/side-effects/use-layout-effect", label: "useLayoutEffect" },
  ],
  "/context": [
    { href: "/context/use-context", label: "useContext" },
  ],
  "/refs": [
    { href: "/refs/use-ref", label: "useRef" },
    { href: "/refs/use-id", label: "useId" },
    { href: "/refs/use-imperative-handle", label: "useImperativeHandle" },
  ],
  "/performance": [
    { href: "/performance/use-memo", label: "useMemo" },
    { href: "/performance/use-callback", label: "useCallback" },
    { href: "/performance/use-transition", label: "useTransition" },
    { href: "/performance/use-deferred-value", label: "useDeferredValue" },
  ],
};

export function TopicNav() {
  const pathname = usePathname();

  // Find which category this path belongs to
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return null; // Only show on sub-topic pages

  const categoryPath = "/" + segments[0];
  const topics = categoryTopics[categoryPath];
  if (!topics) return null;

  const currentIndex = topics.findIndex((t) => t.href === pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const next = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="flex items-center justify-between border-t pt-8 mt-12">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <div className="text-right">
            <div className="text-xs text-muted-foreground/70">Previous</div>
            <div className="font-medium">{prev.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <div>
            <div className="text-xs text-muted-foreground/70">Next</div>
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
