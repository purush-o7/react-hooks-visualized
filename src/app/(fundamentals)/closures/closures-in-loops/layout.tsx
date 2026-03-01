import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Closures in Loops",
  description: "The classic loop variable trap and how closures interact with iteration",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Closures in Loops",
          description: "The classic loop variable trap and how closures interact with iteration",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/closures/closures-in-loops",
        }}
      />
      {children}
    </>
  );
}
