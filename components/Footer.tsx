import Link from "next/link";
import Container from "./Container";
import LogoMark from "./LogoMark";
import NewsletterSignup from "./NewsletterSignup";

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

const connectLinks = [
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-11 w-auto" />
            <span className="leading-none">
              <span className="font-display text-base font-bold uppercase tracking-tight text-indigo-light">
                Chromatus{" "}
              </span>
              <span className="font-display text-base font-normal uppercase tracking-tight text-signal">
                Consulting
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
            Research and consulting firm helping organizations make better
            business decisions through data — headquartered in Pune, working
            across industries.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/company/chromatusconsulting" },
              { label: "Twitter", href: "https://twitter.com/Chromatus12" },
              { label: "Facebook", href: "https://www.facebook.com/Chromatus-Consulting-100467295012830" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mono-tag rounded-full border border-line-dark px-3 py-1.5 text-paper/60 transition hover:border-signal hover:text-signal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-paper/40">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/60 transition hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/40">Connect</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {connectLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-paper/60 transition hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="mailto:info@chromatus.com" className="text-paper/60 transition hover:text-paper">
                Email us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-paper/40">Stay in the loop</p>
          <p className="mt-4 text-sm leading-relaxed text-paper/55">
            Occasional notes on research method and category trends — no spam.
          </p>
          <div className="mt-4">
            <NewsletterSignup />
          </div>
          <div className="mt-8 border-t border-line-dark pt-6 text-sm text-paper/55">
            <p>Sai Shilp, Near Universal, Warje, Pune 411052</p>
            <a href="tel:+917498465144" className="mt-1 block hover:text-paper">+91 74984 65144</a>
            <a href="mailto:info@chromatus.com" className="block hover:text-paper">info@chromatus.com</a>
          </div>
        </div>
      </Container>

      <div className="hairline-dark">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Chromatus Consulting. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/faq" className="hover:text-paper/70">FAQ</Link>
            <Link href="/privacy-policy" className="hover:text-paper/70">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper/70">Terms of Use</Link>
            <Link href="/cookie-policy" className="hover:text-paper/70">Cookie Policy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
