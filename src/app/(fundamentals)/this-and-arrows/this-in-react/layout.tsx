import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "this in React",
  description: "Why class components needed .bind(), and how hooks and arrow functions solved it",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
