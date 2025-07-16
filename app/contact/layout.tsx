import type { Metadata } from "next";
import { generateMetadata, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata(pageMetadata.contact);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
