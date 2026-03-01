"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type TopicLink = { href: string };

const allTopics: TopicLink[] = [
  // Rendering
  { href: "/rendering/what-is-rendering" },
  { href: "/rendering/variables-reset" },
  { href: "/rendering/code-reexecution" },
  { href: "/rendering/render-cascade" },
  { href: "/rendering/expensive-work" },
  { href: "/rendering/reference-trap" },
  // Closures
  { href: "/closures/what-is-a-closure" },
  { href: "/closures/closures-in-loops" },
  { href: "/closures/stale-closures" },
  { href: "/closures/closures-and-hooks" },
  // Immutability
  { href: "/immutability/value-vs-reference" },
  { href: "/immutability/why-mutation-breaks-react" },
  { href: "/immutability/spreading-101" },
  { href: "/immutability/array-operations" },
  // Async
  { href: "/async/event-loop" },
  { href: "/async/callbacks-to-promises" },
  { href: "/async/async-await" },
  { href: "/async/async-in-react" },
  // this & Arrows
  { href: "/this-and-arrows/what-is-this" },
  { href: "/this-and-arrows/binding-rules" },
  { href: "/this-and-arrows/arrow-functions" },
  { href: "/this-and-arrows/this-in-react" },
  // State Management
  { href: "/state-management/use-state" },
  { href: "/state-management/use-reducer" },
  // Side Effects
  { href: "/side-effects/use-effect" },
  { href: "/side-effects/use-layout-effect" },
  // Context
  { href: "/context/use-context" },
  // Refs
  { href: "/refs/use-ref" },
  { href: "/refs/use-id" },
  { href: "/refs/use-imperative-handle" },
  // Performance
  { href: "/performance/use-memo" },
  { href: "/performance/use-callback" },
  { href: "/performance/use-transition" },
  { href: "/performance/use-deferred-value" },
  // Custom Hooks
  { href: "/custom-hooks" },
  // TanStack Query
  { href: "/tanstack-query/use-query" },
  { href: "/tanstack-query/use-mutation" },
];

export function useKeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const currentIndex = allTopics.findIndex((t) => t.href === pathname);
      if (currentIndex === -1) return;

      if ((e.key === "j" || e.key === "ArrowRight") && !e.metaKey && !e.ctrlKey) {
        if (currentIndex < allTopics.length - 1) {
          e.preventDefault();
          router.push(allTopics[currentIndex + 1].href);
        }
      } else if ((e.key === "k" || e.key === "ArrowLeft") && !e.metaKey && !e.ctrlKey) {
        if (currentIndex > 0) {
          e.preventDefault();
          router.push(allTopics[currentIndex - 1].href);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);
}
