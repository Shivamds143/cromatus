import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";

export const metadata: Metadata = { title: "FAQ — Chromatus Consulting" };

const faqs = [
  {
    q: "What industries do you work across?",
    a: "Healthcare, Automotive & Transportation, Food & Beverages, Telecom & IT, Aerospace & Defense, Semiconductors & Electronics, Energy & Power, and Chemicals & Materials — the methodology adapts to the category, and we regularly work on cross-industry questions beyond these eight as well.",
  },
  {
    q: "How long does a typical study take?",
    a: "It depends on scope, but most concept tests and CSAT studies run four to eight weeks from kickoff to final report.",
  },
  {
    q: "What research methods do you use?",
    a: "A mix of primary research (surveys, interviews, field studies) and secondary research (market data, industry benchmarking, competitive intelligence), including CAPI, CATI, and CAWI methodologies depending on the study.",
  },
  {
    q: "Do you offer more than one-off studies?",
    a: "Yes — for CSR programs and long-term initiatives we run baseline and endline studies to measure impact against a clear starting point, alongside project-based research engagements.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Common questions."
        body="If you don't see your question here, it's usually faster to just ask us directly."
      />
      <section className="py-24">
        <Container className="max-w-2xl divide-y divide-line">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <h2 className="font-display text-lg font-semibold text-ink">{f.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate">{f.a}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
