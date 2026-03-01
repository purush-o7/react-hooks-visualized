import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Immutable Array Operations",
  description: "Map, filter, and spread patterns for updating arrays without mutation",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Immutable Array Operations",
          description: "Map, filter, and spread patterns for updating arrays without mutation",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/immutability/array-operations",
        }}
      />
      {children}
    </>
  );
}
