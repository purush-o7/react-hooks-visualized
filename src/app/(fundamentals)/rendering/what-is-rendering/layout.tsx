import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What is Rendering?",
  description: "Understand how React transforms your components into UI through the rendering process",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "What is Rendering?",
          description: "Understand how React transforms your components into UI through the rendering process",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/rendering/what-is-rendering",
        }}
      />
      {children}
    </>
  );
}
