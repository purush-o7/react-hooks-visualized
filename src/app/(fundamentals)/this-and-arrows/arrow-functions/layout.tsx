import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Arrow Functions",
  description: "Lexical this, concise syntax, and when to use arrow functions vs regular functions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Arrow Functions",
          description:
            "Lexical this, concise syntax, and when to use arrow functions vs regular functions",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/this-and-arrows/arrow-functions",
        }}
      />
      {children}
    </>
  );
}
