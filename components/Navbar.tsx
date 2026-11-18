"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { navLinks, profile } from "@/data/portfolio";
import { useT } from "@/lib/i18n";
import { setLang, setTheme, useTheme } from "@/lib/prefs";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hace el cambio dentro de una transición animada. Si el navegador cancela la
 * transición antes de aplicarlo, el cambio se aplica igual (sin animación).
 */
function withTransition(update: () => void) {
  let applied = false;
  const apply = () => {
    if (applied) return;
    applied = true;
    update();
  };
  const vt = document.startViewTransition(apply);
  vt.updateCallbackDone.catch(() => {}).finally(apply);
  vt.ready.catch(apply);
  vt.finished.catch(() => {}).finally(apply);
  return vt;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
    </svg>
  );
}

export default function Navbar() {
  const { lang, ui, t } = useT();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "scroll:lock" : "scroll:unlock"));
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Al cambiar de idioma las secciones se vuelven a montar: hay que observarlas de nuevo.
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
  }, [lang]);

  function toggleLang() {
    const next = lang === "es" ? "en" : "es";
    if (!document.startViewTransition || reducedMotion()) {
      setLang(next);
      return;
    }
    withTransition(() => flushSync(() => setLang(next)));
  }

  /** El tema nuevo aparece en un círculo que crece desde el botón. */
  function toggleTheme(e: MouseEvent<HTMLButtonElement>) {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || reducedMotion()) {
      setTheme(next);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.classList.add("theme-vt");
    const vt = withTransition(() => setTheme(next));
    vt.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(.7,0,.25,1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    vt.finished.catch(() => {}).finally(() => root.classList.remove("theme-vt"));
  }

  const iconBtn =
    "flex h-10 shrink-0 items-center justify-center border border-cream/40 text-cream transition-colors hover:border-accent hover:text-accent";

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/70 backdrop-blur-md">
      <nav aria-label={ui.nav.label} className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-4 md:px-8">
        <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label={`${profile.firstName} ${profile.lastName}, ${ui.nav.home}`}>
          <span className="display flex h-9 w-9 items-center justify-center bg-accent text-xl text-night">
            {profile.initials}
          </span>
          <span className="meta hidden text-cream sm:block lg:hidden xl:block">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`meta relative py-2 transition-colors hover:text-accent ${
                  active === l.id ? "text-accent" : "text-cream/70"
                }`}
              >
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={ui.nav.switchLang}
            title={ui.nav.switchLang}
            className={`${iconBtn} meta gap-0 px-1`}
          >
            {(["es", "en"] as const).map((l) => (
              <span
                key={l}
                className={`px-1.5 py-1 transition-colors ${lang === l ? "bg-accent font-bold text-night" : ""}`}
              >
                {l.toUpperCase()}
              </span>
            ))}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? ui.nav.toLight : ui.nav.toDark}
            title={theme === "dark" ? ui.nav.toLight : ui.nav.toDark}
            className={`${iconBtn} w-10`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={t(profile.cv)}
            download
            className="meta hidden h-10 items-center border border-cream/40 px-4 text-cream transition-colors hover:border-accent hover:bg-accent hover:text-night sm:flex"
          >
            CV ↓
          </a>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
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
                {t(l.label)}
              </a>
            </li>
          ))}
          <li className="pt-6 sm:hidden">
            <a
              href={t(profile.cv)}
              download
              className="meta inline-flex items-center gap-3 bg-accent px-6 py-4 font-bold text-night"
            >
              CV ↓
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
