import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "useLayoutEffect",
  description: "Read layout and paint synchronously before the browser paints to prevent visual flicker",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: "useLayoutEffect",
          description:
            "Read layout and paint synchronously before the browser paints to prevent visual flicker",
          author: { "@type": "Person", name: "Purush" },
          publisher: { "@type": "Organization", name: "Learn React Hooks" },
          url: "https://hooks-101.vercel.app/side-effects/use-layout-effect",
        }}
      />
      {children}
    </>
  );
}
