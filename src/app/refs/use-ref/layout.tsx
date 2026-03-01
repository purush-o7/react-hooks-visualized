import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useRef",
  description: "Hold a mutable reference that persists across renders without causing re-renders",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useRef",
          description:
            "Hold a mutable reference that persists across renders without causing re-renders",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/refs/use-ref",
        }}
      />
      {children}
    </>
  );
}
