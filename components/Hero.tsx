import Link from "next/link";
import Container from "./Container";
import StatCounter from "./StatCounter";

const avatars = [
  { initials: "AR", bg: "#1F82C5" },
  { initials: "JM", bg: "#15619B" },
  { initials: "SK", bg: "#EA9322" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink via-ink-soft to-indigo-dark text-paper">
      {/* Decorative hexagon echo of the logo mark */}
      <svg
        viewBox="0 0 500 500"
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 hidden h-[560px] w-[560px] opacity-[0.14] lg:block xl:-right-10"
      >
        <polygon
          points="250,20 445,135 445,365 250,480 55,365 55,135"
          fill="none"
          stroke="#3D9FDE"
          strokeWidth="2"
        />
        <polygon
          points="250,100 375,172 375,328 250,400 125,328 125,172"
          fill="none"
          stroke="#EA9322"
          strokeWidth="2"
        />
        <polygon
          points="250,180 305,212 305,288 250,320 195,288 195,212"
          fill="none"
          stroke="#F2AC52"
          strokeWidth="2"
        />
      </svg>

      <Container className="relative pb-16 pt-20 lg:pt-28">
        <h1 className="mt-6 max-w-3xl animate-fade-up font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          We turn data
          <br />
          into <span className="text-signal">decisions you can act on.</span>
        </h1>

        <p className="mt-7 max-w-xl animate-fade-up text-[1.05rem] leading-relaxed text-paper/60 [animation-delay:160ms]">
          Chromatus Consulting helps businesses understand their markets,
          their customers, and their competition — so every decision is
          backed by evidence, not guesswork.
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-5 [animation-delay:240ms]">
          <Link
            href="/contact#contact-form"
            className="group flex items-center gap-2 rounded-lg bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-signal hover:text-ink"
          >
            Chromatus Pro
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition group-hover:translate-x-0.5">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-paper/10 pt-8 sm:grid-cols-4">
          {[
            ["10+", "Years in market research & consulting"],
            ["8", "Industry verticals tracked"],
            ["350+", "Researched topics in our knowledge base"],
            ["80+", "Researchers & field investigators"],
          ].map(([stat, label]) => (
            <div key={label}>
              <StatCounter value={stat} className="font-display text-3xl font-semibold text-signal" />
              <p className="mt-1 text-xs leading-snug text-paper/45">{label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Trust row */}
      <div className="relative border-t border-paper/10">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  style={{ backgroundColor: a.bg }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink text-[11px] font-semibold text-white"
                >
                  {a.initials}
                </span>
              ))}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper/10 text-[11px] font-semibold text-paper/70">
                +
              </span>
            </div>
            <p className="text-sm font-medium text-paper/85">
              Trusted by teams who are ready to move forward.
            </p>
          </div>
          <p className="mono-tag text-paper/40">Strategy · Technology · Data</p>
        </Container>
      </div>
    </section>
  );
}
