import type { Metadata } from "next";
import { generateMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(pageMetadata.projects);

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
