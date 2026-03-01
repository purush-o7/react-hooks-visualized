import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "What is a Closure?",
  description: "How functions remember their surrounding scope even after the outer function returns",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "What is a Closure?",
          description: "How functions remember their surrounding scope even after the outer function returns",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/closures/what-is-a-closure",
        }}
      />
      {children}
    </>
  );
}
