import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { servicesSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Chromatus Consulting",
  description: servicesSection.intro,
};

export default function ServicesPage() {
  return <SectionHub section={servicesSection} />;
}
