import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { exampleNames } from "@/registry/__names__";
import { ViewFrame } from "./view-frame";

export const dynamicParams = false;

export function generateStaticParams() {
  return exampleNames.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  return { title: `${name} preview`, robots: { index: false } };
}

export default async function ViewPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!(exampleNames as readonly string[]).includes(name)) notFound();
  return <ViewFrame name={name} />;
}
