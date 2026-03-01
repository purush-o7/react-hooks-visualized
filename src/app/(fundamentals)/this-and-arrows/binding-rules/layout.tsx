import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Binding Rules",
  description: "Implicit, explicit, new, and default binding — the four rules that determine this",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Binding Rules",
          description:
            "Implicit, explicit, new, and default binding — the four rules that determine this",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/this-and-arrows/binding-rules",
        }}
      />
      {children}
    </>
  );
}
