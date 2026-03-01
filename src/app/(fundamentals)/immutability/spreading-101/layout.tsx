import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Spreading 101",
  description: "Use the spread operator to create new objects and arrays without mutating the original",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Spreading 101",
          description: "Use the spread operator to create new objects and arrays without mutating the original",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/immutability/spreading-101",
        }}
      />
      {children}
    </>
  );
}
