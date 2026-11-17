"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/portfolio";
import Poster from "./Poster";
import { useT } from "@/lib/i18n";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const { ui, t } = useT();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-title]",
        { xPercent: 12 },
        { xPercent: -12, ease: "none", scrollTrigger: { trigger: "[data-title]", start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.set("[data-project]", { opacity: 0, y: 90, rotateX: -35, transformOrigin: "50% 0%" });
      ScrollTrigger.batch("[data-project]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "expo.out", stagger: 0.12 }),
      });
    }, el);

    // Inclinación 3D al pasar el ratón
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-tilt]"));
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const c = e.currentTarget as HTMLElement;
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(c, { rotateY: px * 14, rotateX: -py * 14, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = (e: PointerEvent) =>
      gsap.to(e.currentTarget as HTMLElement, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1,0.5)" });
    cards.forEach((c) => {
      c.addEventListener("pointermove", onMove);
      c.addEventListener("pointerleave", onLeave);
    });

    return () => {
      cards.forEach((c) => {
        c.removeEventListener("pointermove", onMove);
        c.removeEventListener("pointerleave", onLeave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section id="proyectos" ref={root} className="relative overflow-hidden bg-cream py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">{ui.projects.label}</p>
      </div>
      <h2 data-title className="display mt-4 whitespace-nowrap text-center text-[22vw] text-ink">
        {ui.projects.title}
      </h2>

      <ul
        className="mx-auto mt-12 grid max-w-[1600px] grid-cols-1 gap-x-6 gap-y-14 px-4 md:grid-cols-2 md:px-8 2xl:grid-cols-4"
        style={{ perspective: "1400px" }}
      >
        {projects.map((p) => (
          <li key={p.title} data-project>
            <article data-tilt className="group flex h-full flex-col will-change-transform" style={{ transformStyle: "preserve-3d" }}>
              <div className="relative overflow-hidden border-2 border-ink">
                <Poster kind="blank" colors={p.colors} label={`${ui.projects.cover} ${p.title}`} className="aspect-[4/3] w-full" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={`${ui.projects.logo} ${p.title}`}
                  loading="lazy"
                  className="absolute left-1/2 top-1/2 h-[46%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-[22%] shadow-[8px_8px_0_#0a0a0a] transition-transform duration-500 group-hover:-translate-y-[58%] group-hover:rotate-[-6deg] group-hover:scale-110"
                />
                <span className="meta absolute left-3 top-3 bg-ink px-2 py-1 text-cream">{p.year}</span>
              </div>

              <h3 className="display mt-5 text-4xl leading-[1.02] md:text-5xl">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">{t(p.description)}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={ui.projects.tech}>
                {p.tags.map((tag) => (
                  <li key={t(tag)} className="meta border border-ink/40 px-2.5 py-1">
                    {t(tag)}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-2">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta flex-1 border-2 border-ink px-4 py-3 text-center font-bold transition-colors hover:bg-ink hover:text-cream"
                >
                  GitHub ↗
                </a>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta flex-1 border-2 border-accent bg-accent px-4 py-3 text-center font-bold text-night transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    {p.demoLabel ? t(p.demoLabel) : ui.projects.demo} ↗
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
