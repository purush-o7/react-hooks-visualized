import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useTransition",
  description: "Mark state updates as non-urgent to keep the UI responsive during heavy renders",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useTransition",
          description:
            "Mark state updates as non-urgent to keep the UI responsive during heavy renders",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/performance/use-transition",
        }}
      />
      {children}
    </>
  );
}
