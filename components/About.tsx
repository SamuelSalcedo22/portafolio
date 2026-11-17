"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, interests } from "@/data/portfolio";
import Poster from "./Poster";
import { useT } from "@/lib/i18n";

export default function About() {
  const root = useRef<HTMLElement>(null);
  const { ui, t } = useT();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // El párrafo se enciende palabra por palabra con el scroll
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-para]", start: "top 78%", end: "bottom 45%", scrub: true },
        },
      );

      gsap.from("[data-fact]", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-facts]", start: "top 85%" },
      });
      gsap.from("[data-skill]", {
        scale: 0.6,
        opacity: 0,
        stagger: 0.04,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: { trigger: "[data-skills]", start: "top 88%" },
      });
      gsap.fromTo(
        "[data-portrait]",
        { rotate: -10, yPercent: 12 },
        {
          rotate: 4,
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: "[data-portrait]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // Carrusel 3D de gustos: se desliza y gira con el scroll
      const track = el.querySelector<HTMLElement>("[data-track]");
      const stage = el.querySelector<HTMLElement>("[data-stage]");
      if (track && stage) {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]", track);
        const st = {
          trigger: stage,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        };
        gsap.fromTo(
          track,
          { x: () => window.innerWidth * 0.35 },
          { x: () => -(track.scrollWidth - window.innerWidth * 0.65), ease: "none", scrollTrigger: st },
        );
        cards.forEach((c, i) => {
          gsap.fromTo(
            c,
            { rotateY: 38, z: -160 },
            { rotateY: -38, z: -160, ease: "none", scrollTrigger: { ...st, scrub: 0.6 + i * 0.08 } },
          );
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const words = t(about.paragraph).split(" ");

  return (
    <section id="sobre-mi" ref={root} className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 md:px-8 lg:grid-cols-[minmax(0,18rem)_1fr]">
        <div>
          <p className="meta text-accent">{ui.about.label}</p>
          <div data-portrait className="mt-8 w-48 border-4 border-cream bg-cream md:w-64">
            <Poster kind="code" colors={["#2f6bff", "#f6e6d4", "#ff4321"]} label={ui.about.illustration} className="aspect-[4/5] w-full" />
          </div>
        </div>

        <div>
          <h2 className="sr-only">{ui.about.heading}</h2>
          <p data-para className="display text-[clamp(1.7rem,4.2vw,4rem)] leading-[1.02] text-cream">
            {words.map((w, i) => (
              <span key={i} data-word className="inline-block pr-[0.28em]">
                {w}
              </span>
            ))}
          </p>

          <dl data-facts className="mt-14 grid gap-px bg-cream/15 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_2fr]">
            {about.facts.map((f) => (
              <div key={t(f.label)} data-fact className="bg-ink p-5 last:sm:col-span-2 last:xl:col-span-1">
                <dt className="meta text-accent">{t(f.label)}</dt>
                <dd className="mt-2 text-sm text-cream">{t(f.value)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12">
            <h3 className="meta text-cream/60">{ui.about.tech}</h3>
            <ul data-skills className="mt-4 flex flex-wrap gap-2">
              {about.skills.map((s) => (
                <li
                  key={s}
                  data-skill
                  data-hot
                  className="meta border border-cream/30 px-4 py-2 text-cream transition-colors hover:border-accent hover:bg-accent hover:text-night"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div data-stage className="mt-24 md:mt-32" style={{ perspective: "1200px" }}>
        <p className="meta mb-6 px-4 text-cream/60 md:px-8">{ui.about.moves}</p>
        <ul data-track className="flex w-max gap-5 will-change-transform md:gap-8" style={{ transformStyle: "preserve-3d" }}>
          {interests.map((it, i) => (
            <li key={i} data-card className="w-[62vw] max-w-[22rem] shrink-0 sm:w-[38vw] lg:w-[24vw]">
              <Poster kind={it.kind} colors={it.colors} label={t(it.title)} className="aspect-[4/5] w-full" />
              <p className="display mt-4 text-3xl text-cream">{t(it.title)}</p>
              <p className="mt-1 text-xs text-cream/60">{t(it.caption)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
