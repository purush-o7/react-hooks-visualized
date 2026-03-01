import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Closures & React Hooks",
  description: "Why every render creates fresh closures and how this affects hooks",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Closures & React Hooks",
          description: "Why every render creates fresh closures and how this affects hooks",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/closures/closures-and-hooks",
        }}
      />
      {children}
    </>
  );
}
