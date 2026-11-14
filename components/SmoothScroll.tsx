"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scroll suave (Lenis) sincronizado con las animaciones de GSAP, más cursor y barra de progreso. */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ anchors: { offset: -64 }, lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const lock = () => lenis.stop();
    const unlock = () => lenis.start();
    window.addEventListener("scroll:lock", lock);
    window.addEventListener("scroll:unlock", unlock);
    if (!document.documentElement.dataset.loaded) lenis.stop();

    // Cursor personalizado (solo con ratón)
    const dot = document.getElementById("cursor-dot");
    let move: ((e: PointerEvent) => void) | undefined;
    if (dot && window.matchMedia("(pointer: fine)").matches) {
      const x = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3" });
      const y = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3" });
      move = (e) => {
        dot.style.opacity = "1";
        x(e.clientX);
        y(e.clientY);
        const hot = (e.target as HTMLElement | null)?.closest?.("a, button, [data-hot]");
        dot.dataset.hot = hot ? "1" : "";
      };
      window.addEventListener("pointermove", move);
    }

    const bar = document.getElementById("scroll-bar");
    const st = bar
      ? ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (s) => gsap.set(bar, { scaleX: s.progress }),
        })
      : undefined;

    return () => {
      st?.kill();
      if (move) window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll:lock", lock);
      window.removeEventListener("scroll:unlock", unlock);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div
        id="scroll-bar"
        aria-hidden
        className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-accent"
      />
      <div
        id="cursor-dot"
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] -ml-2 -mt-2 hidden h-4 w-4 rounded-full bg-accent opacity-0 mix-blend-difference transition-[width,height,margin] duration-200 data-[hot='1']:-ml-6 data-[hot='1']:-mt-6 data-[hot='1']:h-12 data-[hot='1']:w-12 md:block"
      />
      <div className="grain" aria-hidden />
    </>
  );
}
