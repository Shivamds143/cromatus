import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { insightsSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights — Chromatus Consulting",
  description: insightsSection.intro,
};

export default function InsightsPage() {
  return <SectionHub section={insightsSection} />;
}
