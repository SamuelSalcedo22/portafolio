"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/portfolio";
import { useT } from "@/lib/i18n";

const COLS = 8;
const ROWS = 5;

/** Pantalla de carga: un mosaico se destapa por bloques mientras sube el contador. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const { ui } = useT();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const finish = () => {
      document.documentElement.dataset.loaded = "1";
      window.dispatchEvent(new Event("scroll:unlock"));
      window.dispatchEvent(new Event("preloader:done"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      el.style.display = "none";
      return;
    }

    const cells = gsap.utils.shuffle(Array.from(el.querySelectorAll<HTMLElement>("[data-cell]")));
    const state = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
      },
    });
    tl.to(state, {
      v: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(state.v));
      },
    })
      .to(cells, { opacity: 0, duration: 0.05, stagger: { each: 2 / cells.length } }, 0.1)
      .to("[data-mosaic]", { scale: 1.08, duration: 0.5, ease: "power2.in" }, ">-0.1")
      .add(finish)
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut" });

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      role="status"
      aria-label={ui.preloader.aria}
    >
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div data-mosaic className="relative aspect-[8/5] w-[min(70vw,34rem)] overflow-hidden bg-accent">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgb(10 10 10 / .35) 28%, transparent 30%)",
            backgroundSize: "12px 12px",
          }}
        />
        <span className="display absolute inset-0 flex items-center justify-center text-[min(34vw,16rem)] text-night">
          {profile.initials}
        </span>
        <div
          className="absolute -inset-px grid"
          style={{ gridTemplateColumns: `repeat(${COLS},1fr)`, gridTemplateRows: `repeat(${ROWS},1fr)` }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => (
            <span key={i} data-cell className="bg-ink" />
          ))}
        </div>
      </div>
      <p className="meta absolute bottom-6 left-6 text-cream/50">
        {profile.firstName} {profile.lastName} — {ui.preloader.portfolio}
      </p>
      <p className="absolute bottom-5 right-6 flex items-end gap-2">
        <span className="meta pb-1 text-cream/50">{ui.preloader.loading}</span>
        <span ref={count} className="display text-4xl text-cream">
          0
        </span>
        <span className="meta pb-1 text-cream/50">%</span>
      </p>
    </div>
  );
}
