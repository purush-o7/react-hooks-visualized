import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expensive Work in Renders",
  description: "The performance impact of heavy computation during render",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
