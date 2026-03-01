import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useDeferredValue",
  description: "Defer updating part of the UI to keep interactions feeling instant",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useDeferredValue",
          description:
            "Defer updating part of the UI to keep interactions feeling instant",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/performance/use-deferred-value",
        }}
      />
      {children}
    </>
  );
}
