import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "useImperativeHandle",
  description: "Customize the ref handle exposed to parent components with forwardRef",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
