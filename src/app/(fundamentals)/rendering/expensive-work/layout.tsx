import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Expensive Work in Renders",
  description: "The performance impact of heavy computation during render",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Expensive Work in Renders",
          description: "The performance impact of heavy computation during render",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/rendering/expensive-work",
        }}
      />
      {children}
    </>
  );
}
