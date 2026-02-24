import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useReducer",
  description: "Manage complex state with a reducer function for predictable state transitions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
