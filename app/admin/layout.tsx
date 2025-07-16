import type { Metadata } from "next";
import { generateMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(pageMetadata.admin);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
