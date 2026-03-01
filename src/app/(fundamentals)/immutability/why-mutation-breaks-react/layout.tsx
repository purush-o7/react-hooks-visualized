import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Why Mutation Breaks React",
  description: "React relies on reference comparison to detect changes — direct mutation bypasses it",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Why Mutation Breaks React",
          description: "React relies on reference comparison to detect changes \u2014 direct mutation bypasses it",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/immutability/why-mutation-breaks-react",
        }}
      />
      {children}
    </>
  );
}
