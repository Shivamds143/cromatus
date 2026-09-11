import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { careersSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — Chromatus Consulting",
  description: careersSection.intro,
};

export default function CareersPage() {
  return <SectionHub section={careersSection} />;
}
