import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { industriesSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries — Chromatus Consulting",
  description: industriesSection.intro,
};

export default function IndustriesPage() {
  return <SectionHub section={industriesSection} />;
}
