"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const labelMap: Record<string, string> = {
  rendering: "Rendering",
  closures: "Closures",
  immutability: "Immutability",
  async: "Async JS",
  "this-and-arrows": "this & Arrows",
  "state-management": "State",
  "side-effects": "Effects",
  context: "Context",
  refs: "Refs",
  performance: "Performance",
  "custom-hooks": "Custom Hooks",
  "tanstack-query": "TanStack",
  "what-is-rendering": "What is Rendering?",
  "variables-reset": "Variables Reset",
  "code-reexecution": "Code Re-execution",
  "render-cascade": "Render Cascade",
  "expensive-work": "Expensive Work",
  "reference-trap": "Reference Trap",
  "what-is-a-closure": "What is a Closure?",
  "closures-in-loops": "Closures in Loops",
  "stale-closures": "Stale Closures",
  "closures-and-hooks": "Closures & Hooks",
  "value-vs-reference": "Value vs Reference",
  "why-mutation-breaks-react": "Mutation Breaks React",
  "spreading-101": "Spreading 101",
  "array-operations": "Array Operations",
  "event-loop": "Event Loop",
  "callbacks-to-promises": "Callbacks to Promises",
  "async-await": "Async / Await",
  "async-in-react": "Async in React",
  "what-is-this": "What is this?",
  "binding-rules": "Binding Rules",
  "arrow-functions": "Arrow Functions",
  "this-in-react": "this in React",
  "use-state": "useState",
  "use-reducer": "useReducer",
  "use-effect": "useEffect",
  "use-layout-effect": "useLayoutEffect",
  "use-context": "useContext",
  "use-ref": "useRef",
  "use-id": "useId",
  "use-imperative-handle": "useImperativeHandle",
  "use-memo": "useMemo",
  "use-callback": "useCallback",
  "use-transition": "useTransition",
  "use-deferred-value": "useDeferredValue",
  "use-query": "useQuery",
  "use-mutation": "useMutation",
};

export function BreadcrumbNav() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
      >
        <Home className="size-3.5" />
      </Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = labelMap[segment] || segment.replace(/-/g, " ");

        return (
          <Fragment key={href}>
            <ChevronRight className="size-3 text-muted-foreground/50" />
            {isLast ? (
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground transition-colors truncate max-w-[150px]"
              >
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
