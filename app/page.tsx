import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ExploreGrid from "@/components/ExploreGrid";
import Process from "@/components/Process";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ExploreGrid />
      <Process />
      <WhyChoose />
      <Testimonials />
      <CTABanner />
    </>
  );
}
