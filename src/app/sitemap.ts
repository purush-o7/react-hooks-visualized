import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hooks-101.vercel.app";

  const routes = [
    "/",
    // Fundamentals — Rendering
    "/rendering",
    "/rendering/what-is-rendering",
    "/rendering/variables-reset",
    "/rendering/code-reexecution",
    "/rendering/render-cascade",
    "/rendering/expensive-work",
    "/rendering/reference-trap",
    // Fundamentals — Closures
    "/closures",
    "/closures/what-is-a-closure",
    "/closures/closures-in-loops",
    "/closures/stale-closures",
    "/closures/closures-and-hooks",
    // Fundamentals — Immutability
    "/immutability",
    "/immutability/value-vs-reference",
    "/immutability/why-mutation-breaks-react",
    "/immutability/spreading-101",
    "/immutability/array-operations",
    // Fundamentals — Async JavaScript
    "/async",
    "/async/event-loop",
    "/async/callbacks-to-promises",
    "/async/async-await",
    "/async/async-in-react",
    // Fundamentals — this & Arrow Functions
    "/this-and-arrows",
    "/this-and-arrows/what-is-this",
    "/this-and-arrows/binding-rules",
    "/this-and-arrows/arrow-functions",
    "/this-and-arrows/this-in-react",
    // State Management
    "/state-management",
    "/state-management/use-state",
    "/state-management/use-reducer",
    // Side Effects
    "/side-effects",
    "/side-effects/use-effect",
    "/side-effects/use-layout-effect",
    // Context
    "/context",
    "/context/use-context",
    // Refs
    "/refs",
    "/refs/use-ref",
    "/refs/use-id",
    "/refs/use-imperative-handle",
    // Performance
    "/performance",
    "/performance/use-memo",
    "/performance/use-callback",
    "/performance/use-transition",
    "/performance/use-deferred-value",
    // Custom Hooks
    "/custom-hooks",
    // TanStack Query
    "/tanstack-query",
    "/tanstack-query/use-query",
    "/tanstack-query/use-mutation",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
