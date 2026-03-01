import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What is this?",
  description: "How the this keyword changes identity based on how a function is called",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "What is this?",
          description:
            "How the this keyword changes identity based on how a function is called",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/this-and-arrows/what-is-this",
        }}
      />
      {children}
    </>
  );
}
