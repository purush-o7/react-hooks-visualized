import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "The Event Loop",
  description: "How JavaScript handles async operations with the call stack, task queue, and microtask queue",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "The Event Loop",
          description:
            "How JavaScript handles async operations with the call stack, task queue, and microtask queue",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/async/event-loop",
        }}
      />
      {children}
    </>
  );
}
