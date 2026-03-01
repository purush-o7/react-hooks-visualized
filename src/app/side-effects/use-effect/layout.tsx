import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useEffect",
  description: "Synchronize your component with external systems like APIs, timers, and event listeners",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useEffect",
          description:
            "Synchronize your component with external systems like APIs, timers, and event listeners",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/side-effects/use-effect",
        }}
      />
      {children}
    </>
  );
}
