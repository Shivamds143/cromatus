import Container from "./Container";

const industries = [
  "Healthcare",
  "Automotive & Transportation",
  "Food & Beverages",
  "Telecom & IT",
  "Aerospace & Defense",
  "Semiconductors & Electronics",
  "Energy & Power",
  "Chemicals & Materials",
];

export default function TrustStrip() {
  const loop = [...industries, ...industries];
  return (
    <div className="border-b border-line bg-paper-dim py-6">
      <Container>
        <p className="eyebrow mb-4"><span className="text-signal-dark">01 /</span> Trusted by teams across</p>
      </Container>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee gap-12">
          {loop.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg font-medium text-ink/25"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
