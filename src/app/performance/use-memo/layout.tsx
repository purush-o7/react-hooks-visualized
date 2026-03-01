import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useMemo",
  description: "Cache expensive calculations between renders to avoid unnecessary recomputation",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useMemo",
          description:
            "Cache expensive calculations between renders to avoid unnecessary recomputation",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/performance/use-memo",
        }}
      />
      {children}
    </>
  );
}
