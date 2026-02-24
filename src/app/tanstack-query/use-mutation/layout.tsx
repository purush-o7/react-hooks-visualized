import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useMutation",
  description: "Perform create, update, and delete operations with optimistic updates and error handling",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
