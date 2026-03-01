"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/json-ld";

const labelMap: Record<string, string> = {
  rendering: "Rendering",
  closures: "Closures",
  immutability: "Immutability",
  async: "Async JavaScript",
  "this-and-arrows": "this & Arrows",
  "state-management": "State Management",
  "side-effects": "Side Effects",
  context: "Context",
  refs: "Refs",
  performance: "Performance",
  "custom-hooks": "Custom Hooks",
  "tanstack-query": "TanStack Query",
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
  "why-mutation-breaks-react": "Why Mutation Breaks React",
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

const BASE = "https://hooks-101.vercel.app";

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE,
    },
    ...segments.map((segment, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: labelMap[segment] || segment,
      item: `${BASE}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
      }}
    />
  );
}
