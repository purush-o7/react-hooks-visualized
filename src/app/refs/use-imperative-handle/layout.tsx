import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useImperativeHandle",
  description: "Customize the ref handle exposed to parent components with forwardRef",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useImperativeHandle",
          description:
            "Customize the ref handle exposed to parent components with forwardRef",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/refs/use-imperative-handle",
        }}
      />
      {children}
    </>
  );
}
