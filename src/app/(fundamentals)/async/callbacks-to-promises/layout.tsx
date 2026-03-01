import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Callbacks to Promises",
  description: "Evolve from callback hell to clean promise chains",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Callbacks to Promises",
          description: "Evolve from callback hell to clean promise chains",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/async/callbacks-to-promises",
        }}
      />
      {children}
    </>
  );
}
