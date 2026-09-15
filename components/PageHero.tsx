import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper-dim py-20">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-slate">{body}</p>
        {children}
      </Container>
    </section>
  );
}
