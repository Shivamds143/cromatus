import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { itemIconMap } from "@/lib/icons";
import { careersSection } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers & Open Positions — Chromatus Consulting",
  description: careersSection.intro,
};

const barColors = ["#1F82C5", "#EA9322", "#15619B", "#F2AC52", "#3D9FDE", "#C97614"];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careersSection.eyebrow}
        title={careersSection.title}
        body={careersSection.intro}
      />

      {/* Careers Pillars & Links */}
      <section className="py-20 border-b border-line/60">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="mono-tag text-indigo">Explore Opportunities</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Life & Opportunities at Chromatus
              </h2>
            </div>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo hover:text-indigo-dark transition underline underline-offset-4"
            >
              Skip to Application Form &darr;
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {careersSection.items.map((item, i) => {
              const color = barColors[i % barColors.length];
              return (
                <Reveal key={item.slug} delay={i * 70}>
                  <Link
                    href={`${careersSection.path}/${item.slug}`}
                    className="group relative flex h-full flex-col justify-between gap-8 rounded-xl border border-line bg-white p-8 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{
                      borderTop: `3px solid ${color}`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${color}1A`, color }}
                      >
                        <Icon name={itemIconMap[item.slug] ?? "target"} className="h-5 w-5" />
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="mt-1 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color }}
                      >
                        <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate">{item.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Resume / CV Upload Section */}
      <section id="apply" className="py-24 bg-paper-dim/40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
            {/* Left Column: Why Work With Us & Instructions */}
            <div className="space-y-6">
              <div>
                <p className="mono-tag text-indigo">Join Our Talent Network</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Ready to ask better questions?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  Whether you are an experienced researcher or a fresh graduate with an analytical mindset, we want to hear from you. 
                  Share your CV with us and let us know what drives your curiosity.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Direct Review by Team Leads</h3>
                    <p className="mt-0.5 text-xs text-slate">Every resume is evaluated directly by our practice leaders, not automated filters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Accepted Formats</h3>
                    <p className="mt-0.5 text-xs text-slate">We accept PDF (.pdf) and Microsoft Word (.doc, .docx) formats up to 10MB.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-2xs">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo/10 text-indigo">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Prompt Communication</h3>
                    <p className="mt-0.5 text-xs text-slate">Candidates shortlisted for discussions are usually notified within 3-5 business days.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-paper p-5 text-xs text-slate">
                Questions regarding recruitment or hiring processes? You can reach our HR team at{" "}
                <a href="mailto:info@chromatus.com" className="font-semibold text-indigo underline">
                  info@chromatus.com
                </a>
                .
              </div>
            </div>

            {/* Right Column: Application & Upload Form */}
            <div>
              <CareerApplicationForm initialPosition="Market Research Analyst" />
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
