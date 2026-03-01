import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Variables Reset on Re-render",
  description: "Why local variables reset every render and how React state preserves values",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Variables Reset on Re-render",
          description: "Why local variables reset every render and how React state preserves values",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/rendering/variables-reset",
        }}
      />
      {children}
    </>
  );
}
