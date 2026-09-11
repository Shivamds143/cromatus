import Container from "./Container";
import Reveal from "./Reveal";

const pillars = [
  {
    title: "A decade of track record",
    body: "For over a decade, Chromatus has helped organizations make better business decisions through data — validating strategies before they commit resources to them.",
  },
  {
    title: "Research and consulting, not just reports",
    body: "We don't just hand clients a report full of numbers. We help them understand what those numbers mean for their business, and what to do next.",
  },
  {
    title: "A team built for depth",
    body: "20 dedicated researchers and 60+ field investigators, supported by specialists in marketing, statistics, operations research, and social research — the depth to run anything from a focused CSAT study to a nationwide field survey.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-paper-dim py-24">
      <Container>
        <p className="eyebrow"><span className="text-signal-dark">04 /</span> Why Chromatus</p>
        <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight sm:text-[2.6rem]">
          Built for teams who need the answer to hold up.
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="border-t-2 border-signal/40 pt-6">
                <span className="mono-tag text-signal-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
