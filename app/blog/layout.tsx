import type { Metadata } from "next";
import { generateMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(pageMetadata.blog);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
