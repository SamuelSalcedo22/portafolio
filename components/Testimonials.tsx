"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials, type Testimonial } from "@/data/portfolio";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="flex h-full flex-col justify-between border-2 border-cream bg-coal p-6 md:p-10">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden className="display text-7xl leading-[0.6] text-accent md:text-9xl">
          “
        </span>
        <span className="meta text-cream/50">
          {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
        </span>
      </div>
      <blockquote className="display my-6 text-[clamp(1.5rem,3.4vw,3rem)] leading-[1.05] text-cream">
        {t.text}
      </blockquote>
      <figcaption className="flex items-center gap-4">
        {t.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={t.photo} alt={`Foto de ${t.name}`} className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <span aria-hidden className="display flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-2xl text-ink">
            {initialsOf(t.name)}
          </span>
        )}
        <span>
          <span className="block text-sm font-bold text-cream">{t.name}</span>
          <span className="meta block text-cream/60">{t.role}</span>
        </span>
        <span className="ml-auto text-accent" aria-label={`${t.stars} de 5 estrellas`}>
          {"★".repeat(t.stars)}
        </span>
      </figcaption>
    </figure>
  );
}

/** Pila 3D: cada testimonio sale volando hacia arriba y el siguiente avanza al frente. */
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const stage = el.querySelector<HTMLElement>("[data-stack]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-tcard]");
      if (!stage || cards.length === 0) return;
      el.dataset.stacked = "1";
      const n = cards.length;

      const render = (progress: number) => {
        const p = progress * (n - 1);
        cards.forEach((c, j) => {
          const d = j - p;
          if (d >= 0) {
            gsap.set(c, {
              yPercent: d * 9,
              z: -d * 140,
              rotateX: 0,
              opacity: Math.max(0, 1 - d * 0.38),
              zIndex: n - j,
            });
          } else {
            gsap.set(c, {
              yPercent: d * 115,
              z: 0,
              rotateX: -d * 38,
              opacity: Math.max(0, 1 + d * 1.4),
              zIndex: n - j,
            });
          }
        });
      };
      render(0);

      ScrollTrigger.create({
        trigger: stage,
        start: "center center",
        end: () => `+=${window.innerHeight * 0.8 * (n - 1)}`,
        pin: el.querySelector<HTMLElement>("[data-pin]"),
        scrub: 0.5,
        onUpdate: (s) => render(s.progress),
      });
    }, el);
    return () => {
      delete el.dataset.stacked;
      ctx.revert();
    };
  }, []);

  return (
    <section id="testimonios" ref={root} className="group/t grid-lines relative overflow-hidden py-24 md:py-36">
      <div data-pin className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="meta text-accent">( 03 ) — Testimonios</p>
            <h2 className="display mt-3 text-[clamp(3rem,9vw,8rem)] text-cream">
              Lo que <span className="outline-text">dicen</span>
            </h2>
          </div>
          <p className="meta hidden text-cream/50 group-data-[stacked]/t:block">Sigue bajando ↓</p>
        </div>

        <ul
          data-stack
          className="relative mx-auto mt-10 flex max-w-4xl flex-col gap-6 group-data-[stacked]/t:block group-data-[stacked]/t:h-[min(62vh,30rem)]"
          style={{ perspective: "1100px" }}
        >
          {testimonials.map((t, i) => (
            <li
              key={i}
              data-tcard
              className="will-change-transform group-data-[stacked]/t:absolute group-data-[stacked]/t:inset-0"
              style={{ transformOrigin: "50% 100%" }}
            >
              <Card t={t} i={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
