import type { Metadata } from "next";
import SectionHub from "@/components/SectionHub";
import { aboutSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us — Chromatus Consulting",
  description: aboutSection.intro,
};

export default function AboutPage() {
  return <SectionHub section={aboutSection} />;
}
