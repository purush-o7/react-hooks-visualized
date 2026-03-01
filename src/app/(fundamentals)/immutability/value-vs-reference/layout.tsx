import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Value vs Reference",
  description: "Primitives copy by value, objects share references — why this matters in React",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Value vs Reference",
          description: "Primitives copy by value, objects share references \u2014 why this matters in React",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/immutability/value-vs-reference",
        }}
      />
      {children}
    </>
  );
}
