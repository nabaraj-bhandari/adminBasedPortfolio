import type { Metadata } from "next";
import { generateMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(pageMetadata.skills);

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
