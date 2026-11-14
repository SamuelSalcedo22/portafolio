"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { academic, work, type ExperienceItem } from "@/data/portfolio";

function Timeline({ title, icon, items }: { title: string; icon: string; items: ExperienceItem[] }) {
  return (
    <div data-timeline>
      <h3 className="display flex items-center gap-3 text-4xl text-cream md:text-5xl">
        <span aria-hidden className="text-3xl">{icon}</span>
        {title}
      </h3>
      <div className="relative mt-8 pl-8">
        <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-0.5 bg-cream/15" />
        <span aria-hidden data-line className="absolute bottom-0 left-[5px] top-2 w-0.5 origin-top bg-accent" />
        <ol className="space-y-10">
          {items.map((it) => (
            <li key={it.title + it.place} data-item className="relative">
              <span aria-hidden data-dot className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink" />
              <p className="meta text-accent">
                {it.start} — {it.end}
              </p>
              <h4 className="display mt-2 text-2xl text-cream md:text-3xl">{it.title}</h4>
              <p className="meta mt-1 text-cream/60">{it.place}</p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-cream/75">{it.description}</p>
              {it.link && (
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta mt-3 inline-block border-b border-accent pb-0.5 text-cream hover:text-accent"
                >
                  Ver repositorio ↗
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((tl) => {
        gsap.fromTo(
          tl.querySelector("[data-line]"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: tl, start: "top 70%", end: "bottom 60%", scrub: true } },
        );
        tl.querySelectorAll<HTMLElement>("[data-item]").forEach((item) => {
          gsap.from(item, {
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
          gsap.from(item.querySelector("[data-dot]"), {
            scale: 0,
            duration: 0.5,
            ease: "back.out(4)",
            scrollTrigger: { trigger: item, start: "top 85%" },
          });
        });
      });
      gsap.fromTo(
        "[data-xp-title]",
        { xPercent: -8 },
        { xPercent: 8, ease: "none", scrollTrigger: { trigger: "[data-xp-title]", start: "top bottom", end: "bottom top", scrub: true } },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" ref={root} className="relative overflow-hidden border-t border-cream/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">( 04 ) — Experiencia académica y laboral</p>
        <h2 data-xp-title className="display mt-3 whitespace-nowrap text-[clamp(3.5rem,13vw,13rem)] text-cream">
          Tra<span className="pop-fill">yec</span>toria
        </h2>
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-10">
          <Timeline title="Académica" icon="🎓" items={academic} />
          <Timeline title="Laboral" icon="💼" items={work} />
        </div>
      </div>
    </section>
  );
}
