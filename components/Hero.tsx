"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/portfolio";
import { useT } from "@/lib/i18n";
import Poster from "./Poster";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { ui, t } = useT();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-letter]", { yPercent: 110 });
      gsap.set("[data-pop]", { opacity: 0 });
      gsap.set("[data-rise]", { y: 30, opacity: 0 });
      gsap.set("[data-script]", { opacity: 0, scale: 0.7, rotate: -14 });
      gsap.set("[data-avatar]", { opacity: 0, y: 60, rotate: 12 });

      const intro = gsap.timeline({ paused: true });
      intro
        .to("[data-letter]", { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.06 })
        .to("[data-pop]", { opacity: 1, duration: 0.6 }, "-=0.3")
        .to("[data-script]", { opacity: 1, scale: 1, rotate: -8, duration: 0.8, ease: "back.out(2)" }, "-=0.5")
        .to("[data-avatar]", { opacity: 1, y: 0, rotate: 5, duration: 0.9, ease: "expo.out" }, "-=0.7")
        .to("[data-rise]", { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.7");

      const play = () => intro.play();
      if (document.documentElement.dataset.loaded) play();
      else window.addEventListener("preloader:done", play, { once: true });

      // La franja de color que recorre el apellido sigue al cursor
      const win = el.querySelector<HTMLElement>("[data-window]");
      const pos = { x: 15 };
      const paint = () => {
        if (win) win.style.clipPath = `inset(0 ${Math.max(0, 100 - pos.x - 11)}% 0 ${Math.max(0, pos.x - 11)}%)`;
      };
      const loop = gsap.to(pos, { x: 85, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, onUpdate: paint });
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        loop.pause();
        gsap.to(pos, { x: (e.clientX / window.innerWidth) * 100, duration: 0.6, ease: "power3.out", onUpdate: paint, overwrite: true });
      };
      el.addEventListener("pointermove", onMove);

      // Al hacer scroll, el titular se separa
      gsap.to("[data-name]", {
        yPercent: -25,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-avatar-wrap]", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        el.removeEventListener("pointermove", onMove);
        window.removeEventListener("preloader:done", play);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  const letters = profile.lastName.toUpperCase().split("");

  return (
    <section
      id="inicio"
      ref={root}
      className="grid-lines relative flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden px-4 pb-8 pt-6 md:px-8"
    >
      <div className="meta flex flex-wrap justify-between gap-x-8 gap-y-2 text-cream/60">
        <span data-rise>{ui.hero.kicker}</span>
        <span data-rise className="hidden sm:block">{profile.location}</span>
        <span data-rise className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> {ui.hero.available}
        </span>
      </div>

      <div className="relative my-6">
        <h1 data-name className="relative origin-bottom" aria-label={`${profile.firstName} ${profile.lastName}`}>
          <span aria-hidden className="display block overflow-hidden whitespace-nowrap text-center text-[26.5vw] text-cream">
            {letters.map((c, i) => (
              <span key={i} data-letter className="inline-block">
                {c}
              </span>
            ))}
          </span>
          <span
            aria-hidden
            data-window
            data-pop
            className="display pop-fill pointer-events-none absolute inset-0 block overflow-hidden whitespace-nowrap text-center text-[26.5vw]"
            style={{ clipPath: "inset(0 60% 0 18%)" }}
          >
            {profile.lastName}
          </span>
          <span
            aria-hidden
            data-script
            className="absolute -bottom-[0.32em] right-[4%] block font-script text-[15vw] leading-none text-accent"
            style={{ transform: "rotate(-8deg)" }}
          >
            {profile.firstName}
          </span>
        </h1>
      </div>

      <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <p data-rise className="display text-3xl text-accent md:text-5xl">
            {t(profile.role)}
          </p>
          <p data-rise className="mt-4 text-sm leading-relaxed text-cream/75 md:text-base">
            {t(profile.tagline)}
          </p>
          <div data-rise className="mt-7 flex flex-wrap gap-3">
            <a
              href={profile.cv}
              download
              className="meta group inline-flex items-center gap-3 bg-accent px-6 py-4 font-bold text-night transition-transform hover:-translate-y-1"
            >
              {ui.hero.downloadCv}
              <span className="transition-transform group-hover:translate-y-1">↓</span>
            </a>
            <a
              href="#proyectos"
              className="meta inline-flex items-center gap-3 border border-cream/40 px-6 py-4 text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              {ui.hero.seeProjects}
            </a>
          </div>
        </div>

        <div data-avatar-wrap className="justify-self-start md:justify-self-end">
          <div data-avatar className="relative w-36 rotate-[5deg] border-4 border-cream bg-cream shadow-[10px_10px_0_#ff4321] md:w-52">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={`${ui.hero.photoOf} ${profile.firstName} ${profile.lastName}`} className="aspect-[4/5] w-full object-cover object-top" />
            ) : (
              <Poster kind="initials" label={profile.initials} colors={["#ff4321", "#0a0a0a", "#ffd23f"]} className="aspect-[4/5] w-full" />
            )}
            <p className="meta px-2 py-1.5 text-ink">
              {profile.firstName} {profile.lastName} · {t(profile.role)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
