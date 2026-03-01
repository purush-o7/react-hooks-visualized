import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "this in React",
  description: "Why class components needed .bind(), and how hooks and arrow functions solved it",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "this in React",
          description:
            "Why class components needed .bind(), and how hooks and arrow functions solved it",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/this-and-arrows/this-in-react",
        }}
      />
      {children}
    </>
  );
}
