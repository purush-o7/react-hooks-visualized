import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Callbacks to Promises",
  description: "Evolve from callback hell to clean promise chains",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
