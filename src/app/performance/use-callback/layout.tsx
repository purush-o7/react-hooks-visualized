import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useCallback",
  description: "Memoize callback functions to prevent unnecessary re-renders of child components",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useCallback",
          description:
            "Memoize callback functions to prevent unnecessary re-renders of child components",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/performance/use-callback",
        }}
      />
      {children}
    </>
  );
}
