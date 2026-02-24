import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Reference Trap",
  description: "Why object and array references change on every render",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
