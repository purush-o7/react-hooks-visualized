import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Async in React",
  description: "Handle async operations inside React components with useEffect and data fetching patterns",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "Async in React",
          description:
            "Handle async operations inside React components with useEffect and data fetching patterns",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/async/async-in-react",
        }}
      />
      {children}
    </>
  );
}
