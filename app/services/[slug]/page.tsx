import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionDetail from "@/components/SectionDetail";
import { servicesSection } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return servicesSection.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const item = servicesSection.items.find((i) => i.slug === slug);
  return { title: item ? `${item.title} — Chromatus Consulting` : "Chromatus Consulting" };
}

export default async function ServicesSubPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const item = servicesSection.items.find((i) => i.slug === slug);
  if (!item) return notFound();
  return <SectionDetail section={servicesSection} item={item} />;
}
