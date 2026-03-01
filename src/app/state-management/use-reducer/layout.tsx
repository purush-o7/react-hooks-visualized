import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useReducer",
  description: "Manage complex state with a reducer function for predictable state transitions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useReducer",
          description:
            "Manage complex state with a reducer function for predictable state transitions",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/state-management/use-reducer",
        }}
      />
      {children}
    </>
  );
}
