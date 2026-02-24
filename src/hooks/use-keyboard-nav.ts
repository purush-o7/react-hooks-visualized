"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type TopicLink = { href: string };

const categoryTopics: Record<string, TopicLink[]> = {
  "/rendering": [
    { href: "/rendering/what-is-rendering" },
    { href: "/rendering/variables-reset" },
    { href: "/rendering/code-reexecution" },
    { href: "/rendering/render-cascade" },
    { href: "/rendering/expensive-work" },
    { href: "/rendering/reference-trap" },
  ],
  "/closures": [
    { href: "/closures/what-is-a-closure" },
    { href: "/closures/closures-in-loops" },
    { href: "/closures/stale-closures" },
    { href: "/closures/closures-and-hooks" },
  ],
  "/immutability": [
    { href: "/immutability/value-vs-reference" },
    { href: "/immutability/why-mutation-breaks-react" },
    { href: "/immutability/spreading-101" },
    { href: "/immutability/array-operations" },
  ],
  "/async": [
    { href: "/async/event-loop" },
    { href: "/async/callbacks-to-promises" },
    { href: "/async/async-await" },
    { href: "/async/async-in-react" },
  ],
  "/this-and-arrows": [
    { href: "/this-and-arrows/what-is-this" },
    { href: "/this-and-arrows/binding-rules" },
    { href: "/this-and-arrows/arrow-functions" },
    { href: "/this-and-arrows/this-in-react" },
  ],
  "/state-management": [
    { href: "/state-management/use-state" },
    { href: "/state-management/use-reducer" },
  ],
  "/side-effects": [
    { href: "/side-effects/use-effect" },
    { href: "/side-effects/use-layout-effect" },
  ],
  "/context": [
    { href: "/context/use-context" },
  ],
  "/refs": [
    { href: "/refs/use-ref" },
    { href: "/refs/use-id" },
    { href: "/refs/use-imperative-handle" },
  ],
  "/performance": [
    { href: "/performance/use-memo" },
    { href: "/performance/use-callback" },
    { href: "/performance/use-transition" },
    { href: "/performance/use-deferred-value" },
  ],
};

export function useKeyboardNav() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const segments = pathname.split("/").filter(Boolean);
      if (segments.length < 2) return;

      const categoryPath = "/" + segments[0];
      const topics = categoryTopics[categoryPath];
      if (!topics) return;

      const currentIndex = topics.findIndex((t) => t.href === pathname);
      if (currentIndex === -1) return;

      if ((e.key === "j" || e.key === "ArrowRight") && !e.metaKey && !e.ctrlKey) {
        // Next topic
        if (currentIndex < topics.length - 1) {
          e.preventDefault();
          router.push(topics[currentIndex + 1].href);
        }
      } else if ((e.key === "k" || e.key === "ArrowLeft") && !e.metaKey && !e.ctrlKey) {
        // Previous topic
        if (currentIndex > 0) {
          e.preventDefault();
          router.push(topics[currentIndex - 1].href);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);
}
