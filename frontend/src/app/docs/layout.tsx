import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CloudForge Docs — Quickstart",
};

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
