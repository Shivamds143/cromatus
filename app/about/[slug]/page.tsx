import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionDetail from "@/components/SectionDetail";
import { aboutSection } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return aboutSection.items
    .filter((item) => item.slug !== "leadership-team")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const item = aboutSection.items.find((i) => i.slug === slug);
  return { title: item ? `${item.title} — Chromatus Consulting` : "Chromatus Consulting" };
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const item = aboutSection.items.find((i) => i.slug === slug);
  if (!item) return notFound();
  return <SectionDetail section={aboutSection} item={item} />;
}
