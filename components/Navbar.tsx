"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "scroll:lock" : "scroll:unlock"));
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const s = document.getElementById(l.id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/70 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label={`${profile.firstName} ${profile.lastName}, inicio`}>
          <span className="display flex h-9 w-9 items-center justify-center bg-accent text-xl text-ink">
            {profile.initials}
          </span>
          <span className="meta hidden text-cream sm:block">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`meta relative py-2 transition-colors hover:text-accent ${
                  active === l.id ? "text-accent" : "text-cream/70"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.cv}
            download
            className="meta border border-cream/40 px-4 py-2 text-cream transition-colors hover:border-accent hover:bg-accent hover:text-ink"
          >
            CV ↓
          </a>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        className={`fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-ink transition-[clip-path,visibility] duration-500 ease-out lg:hidden ${
          open ? "visible [clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <ul className="flex flex-col px-4 py-6">
          {navLinks.map((l, i) => (
            <li key={l.id} className="border-b border-cream/10">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="display flex items-baseline gap-4 py-3 text-5xl text-cream hover:text-accent"
              >
                <span className="meta text-accent">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
