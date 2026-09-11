import Link from "next/link";
import Container from "./Container";
import CTABanner from "./CTABanner";
import type { Section, SubItem } from "@/lib/content";

export default function SectionDetail({
  section,
  item,
  children,
}: {
  section: Section;
  item: SubItem;
  children?: React.ReactNode;
}) {
  const otherItems = section.items.filter((i) => i.slug !== item.slug);

  return (
    <>
      <section className="border-b border-line bg-paper-dim py-20">
        <Container>
          <Link
            href={section.path}
            className="mono-tag inline-flex items-center gap-2 text-slate transition hover:text-ink"
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M11 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {section.eyebrow}
          </Link>
          <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-slate">{item.summary}</p>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            {item.body.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink/75 sm:text-[0.95rem]">
                {para}
              </p>
            ))}
            {children}
          </div>

          <aside>
            <p className="eyebrow">More in {section.eyebrow}</p>
            <ul className="mt-5 space-y-1 border-t border-line">
              {otherItems.map((other) => (
                <li key={other.slug} className="border-b border-line">
                  <Link
                    href={`${section.path}/${other.slug}`}
                    className="flex items-center justify-between gap-4 py-3.5 text-sm text-ink/75 transition hover:text-ink"
                  >
                    {other.title}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 text-slate">
                      <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
