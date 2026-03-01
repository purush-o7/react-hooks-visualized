import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useId",
  description: "Generate unique, stable IDs for accessibility attributes that work with server rendering",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useId",
          description:
            "Generate unique, stable IDs for accessibility attributes that work with server rendering",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/refs/use-id",
        }}
      />
      {children}
    </>
  );
}
