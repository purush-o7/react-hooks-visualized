import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Custom Hooks",
  description: "Extract and reuse stateful logic across components with custom hooks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Custom Hooks",
          description:
            "Extract and reuse stateful logic across components with custom hooks",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/custom-hooks",
        }}
      />
      {children}
    </>
  );
}
