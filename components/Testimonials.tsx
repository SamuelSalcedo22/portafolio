"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials as placeholders, type Testimonial } from "@/data/portfolio";
import { fetchApproved, submitTestimonial } from "@/lib/testimonials";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Card({ t, i, total }: { t: Testimonial; i: number; total: number }) {
  return (
    <figure className="flex h-full flex-col justify-between border-2 border-cream bg-coal p-6 md:p-10">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden className="display text-7xl leading-[0.6] text-accent md:text-9xl">
          “
        </span>
        <span className="meta text-cream/50">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <blockquote className="display my-6 line-clamp-6 text-[clamp(1.3rem,3vw,2.6rem)] leading-[1.08] text-cream">
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
  const [remote, setRemote] = useState<Testimonial[]>([]);
  const [stars, setStars] = useState(5);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    let alive = true;
    fetchApproved().then((rows) => {
      if (alive && rows.length) setRemote(rows);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Los reales van primero; los de ejemplo solo rellenan hasta llegar a tres.
  const list = remote.length >= 3 ? remote : [...remote, ...placeholders.slice(0, 3 - remote.length)];
  const count = list.length;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("sitio")) return; // trampa para bots
    setStatus("sending");
    const ok = await submitTestimonial({
      name: String(data.get("t-nombre") ?? "").trim(),
      role: String(data.get("t-cargo") ?? "").trim(),
      message: String(data.get("t-opinion") ?? "").trim(),
      stars,
    });
    setStatus(ok ? "sent" : "error");
    if (ok) {
      form.reset();
      setStars(5);
    }
  }

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
  }, [count]);

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
          {list.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              data-tcard
              className="will-change-transform group-data-[stacked]/t:absolute group-data-[stacked]/t:inset-0"
              style={{ transformOrigin: "50% 100%" }}
            >
              <Card t={t} i={i} total={count} />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl px-4 md:px-8">
        <div className="border-2 border-cream/25 bg-ink p-6 md:p-10">
          <p className="meta text-accent">¿Trabajamos juntos?</p>
          <h3 className="display mt-2 text-4xl text-cream md:text-6xl">Deja tu opinión</h3>
          <p className="mt-3 max-w-prose text-sm text-cream/60">
            Tu testimonio aparecerá en esta sección cuando Samuel lo apruebe.
          </p>

          <form onSubmit={onSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="t-nombre" className="meta text-cream/60">Nombre</label>
              <input id="t-nombre" name="t-nombre" type="text" required minLength={2} maxLength={60} autoComplete="name" placeholder="Tu nombre" className="field" />
            </div>
            <div>
              <label htmlFor="t-cargo" className="meta text-cream/60">Cargo o relación</label>
              <input id="t-cargo" name="t-cargo" type="text" required minLength={2} maxLength={80} placeholder="Cliente, profesor, compañero…" className="field" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="t-opinion" className="meta text-cream/60">Tu opinión</label>
              <textarea id="t-opinion" name="t-opinion" required minLength={10} maxLength={400} rows={3} placeholder="¿Cómo fue trabajar con Samuel?" className="field resize-none" />
            </div>
            <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <fieldset className="flex items-center gap-3">
              <legend className="meta float-left mr-3 text-cream/60">Calificación</legend>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStars(n)}
                    aria-label={`${n} de 5 estrellas`}
                    aria-pressed={stars === n}
                    className={`text-3xl leading-none transition-transform hover:scale-125 ${n <= stars ? "text-accent" : "text-cream/25"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <button
                type="submit"
                disabled={status === "sending"}
                className="meta group inline-flex items-center gap-3 bg-accent px-8 py-4 font-bold text-ink transition-transform hover:-translate-y-1 disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Enviar testimonio"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <p role="status" aria-live="polite" className="min-h-6 text-sm md:col-span-2">
              {status === "sent" && <span className="text-accent">✓ ¡Gracias! Tu testimonio se envió y aparecerá aquí cuando sea aprobado.</span>}
              {status === "error" && <span className="text-pop-yellow">No se pudo enviar. Inténtalo de nuevo en un momento.</span>}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
