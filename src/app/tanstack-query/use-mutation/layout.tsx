import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useMutation",
  description: "Perform create, update, and delete operations with optimistic updates and error handling",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useMutation",
          description:
            "Perform create, update, and delete operations with optimistic updates and error handling",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/tanstack-query/use-mutation",
        }}
      />
      {children}
    </>
  );
}
