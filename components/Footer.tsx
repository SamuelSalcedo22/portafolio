"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks, profile } from "@/data/portfolio";
import { useT } from "@/lib/i18n";

const icons = {
  github:
    "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.83-1.85 3.65-1.85 3.9 0 4.5 2.4 4.5 5.6V21h-4v-5.2c0-1.25-.02-2.85-1.75-2.85s-2 1.35-2 2.75V21h-4V9.75Z",
  mail: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.6L4.4 7H19.6L12 12.6ZM4 8.7V17h16V8.7l-8 5.9-8-5.9Z",
};

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const { ui, t } = useT();
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-big]", {
        yPercent: 60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
      });
      gsap.from("[data-wave]", {
        yPercent: 60,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 40%", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const socials = [
    { label: "GitHub", href: profile.github, d: icons.github },
    { label: "LinkedIn", href: profile.linkedin, d: icons.linkedin },
    { label: ui.footer.email, href: `mailto:${profile.email}`, d: icons.mail },
  ];

  return (
    <footer ref={root} className="relative overflow-hidden pt-24">
      <div data-wave aria-hidden className="relative -mb-px h-[12vw] min-h-16">
        <svg viewBox="0 0 2400 200" preserveAspectRatio="none" className="wave-b absolute bottom-0 left-0 h-full w-[125%] opacity-40">
          <path d="M0 110 C300 20 500 190 800 100 S1300 10 1600 100 S2100 190 2400 90 V200 H0Z" fill="#ff4321" />
        </svg>
        <svg viewBox="0 0 2400 200" preserveAspectRatio="none" className="wave-a absolute bottom-0 left-0 h-full w-[125%]">
          <path d="M0 90 C250 180 550 0 850 90 S1350 190 1650 90 S2150 0 2400 110 V200 H0Z" fill="#ff4321" />
        </svg>
      </div>

      <div className="bg-accent text-night">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-4 pb-6 pt-10 md:grid-cols-[1fr_auto_auto] md:px-8">
          <div>
            <p className="display text-4xl md:text-5xl">{ui.footer.cta}</p>
            <a href="#contacto" className="meta mt-4 inline-block border-b-2 border-night pb-1 font-bold">
              {ui.footer.writeMe}
            </a>
          </div>

          <nav aria-label={ui.footer.quickLinks}>
            <p className="meta mb-3 opacity-70">{ui.footer.sections}</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="meta font-bold hover:underline">
                    {t(l.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="meta mb-3 opacity-70">{ui.footer.socials}</p>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center border-2 border-night transition-colors hover:bg-night hover:text-accent"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p data-big aria-hidden className="display select-none whitespace-nowrap text-center text-[26.5vw] leading-[0.8]">
          {profile.lastName}
        </p>

        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t-2 border-night px-4 py-5 md:px-8">
          <p className="meta font-bold">
            © {year} {profile.firstName} {profile.lastName}
          </p>
          <a
            href="#inicio"
            className="meta inline-flex items-center gap-2 bg-night px-4 py-3 font-bold text-paper transition-transform hover:-translate-y-1"
          >
            {ui.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
