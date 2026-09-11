import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Chromatus Consulting",
  description: "Get in touch, locations, and contact details for Chromatus Consulting.",
};

const generalInquiries = [
  { label: "New business & project scoping", value: "info@chromatus.com" },
  { label: "Press & media", value: "info@chromatus.com" },
  { label: "Careers", value: "info@chromatus.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch, locations, and contact details."
        body="Fill in a few details below and a member of our team will follow up within one business day — or reach us directly."
      />

      <section id="contact-form" className="scroll-mt-28 py-24">
        <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Contact Form</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
              Tell us the question you're trying to answer.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              The more specific the decision behind your request, the faster
              we can scope the right approach.
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>

      <section id="office-locations" className="scroll-mt-28 border-t border-line bg-paper-dim py-24">
        <Container>
          <p className="eyebrow">Office Locations</p>
          <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold tracking-tight text-ink">
            Where to find us.
          </h2>
          <div className="mt-10 max-w-md rounded-2xl border border-line bg-white p-8">
            <p className="font-display text-lg font-semibold text-ink">Pune — Headquarters</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Sai Shilp, Near Universal, Warje, Pune 411052
            </p>
            <p className="mt-4 text-sm">
              <a href="tel:+917498465144" className="font-medium text-ink hover:text-indigo">
                +91 74984 65144
              </a>
            </p>
            <p className="mt-1 font-mono text-xs text-slate">Monday – Friday, 9AM – 8PM IST</p>
          </div>
        </Container>
      </section>

      <section id="general-inquiries" className="scroll-mt-28 border-t border-line py-24">
        <Container>
          <p className="eyebrow">General Inquiries</p>
          <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold tracking-tight text-ink">
            Not sure who to ask? Start here.
          </h2>
          <ul className="mt-10 divide-y divide-line border-t border-line sm:max-w-lg">
            {generalInquiries.map((g) => (
              <li key={g.label} className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-ink/75">{g.label}</span>
                <a href={`mailto:${g.value}`} className="text-sm font-medium text-indigo hover:text-indigo-light">
                  {g.value}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
