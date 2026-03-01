import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useQuery",
  description: "Fetch, cache, and synchronize server data with automatic background refetching",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useQuery",
          description:
            "Fetch, cache, and synchronize server data with automatic background refetching",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/tanstack-query/use-query",
        }}
      />
      {children}
    </>
  );
}
