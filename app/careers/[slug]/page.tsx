import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionDetail from "@/components/SectionDetail";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { careersSection } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return careersSection.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const item = careersSection.items.find((i) => i.slug === slug);
  return { title: item ? `${item.title} — Chromatus Consulting` : "Chromatus Consulting" };
}

export default async function CareersSubPage({ params }: Props) {
  const { slug } = await Promise.resolve(params);
  const item = careersSection.items.find((i) => i.slug === slug);
  if (!item) return notFound();

  return (
    <SectionDetail section={careersSection} item={item}>
      <div className="pt-8">
        <CareerApplicationForm
          initialPosition={
            slug === "open-positions"
              ? "Market Research Analyst"
              : "General / Open Application"
          }
        />
      </div>
    </SectionDetail>
  );
}
