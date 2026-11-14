"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/portfolio";

type Status = "idle" | "sending" | "sent" | "mail" | "error";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-char]", {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: "[data-heading]", start: "top 85%" },
      });
      gsap.from("[data-in]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-body]", start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("nombre") ?? "");
    const email = String(data.get("correo") ?? "");
    const message = String(data.get("mensaje") ?? "");

    if (!profile.formEndpoint) {
      // Sin servicio de formularios configurado: se abre la app de correo con el mensaje listo.
      const subject = encodeURIComponent(`Portafolio — mensaje de ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mail");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ nombre: name, correo: email, mensaje: message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const links = [
    { label: "Correo", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github },
    { label: "LinkedIn", value: profile.linkedin.replace("https://www.", ""), href: profile.linkedin },
    ...(profile.whatsapp ? [{ label: "WhatsApp", value: "Escríbeme", href: profile.whatsapp }] : []),
  ];

  return (
    <section id="contacto" ref={root} className="relative overflow-hidden border-t border-cream/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">( 05 ) — Contactos</p>
        <h2 data-heading className="display mt-3 overflow-hidden text-[clamp(4rem,19vw,19rem)] text-cream" aria-label="Hablemos">
          {"Hablemos".split("").map((c, i) => (
            <span key={i} data-char aria-hidden className={`inline-block ${i > 4 ? "text-accent" : ""}`}>
              {c}
            </span>
          ))}
        </h2>

        <div data-body className="mt-14 grid gap-14 lg:grid-cols-2">
          <ul className="self-start border-t border-cream/15">
            {links.map((l) => (
              <li key={l.label} data-in className="border-b border-cream/15">
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 transition-[padding] hover:pl-3"
                >
                  <span className="meta w-24 shrink-0 text-accent">{l.label}</span>
                  <span className="min-w-0 flex-1 truncate text-sm text-cream md:text-base">{l.value}</span>
                  <span aria-hidden className="text-cream transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form onSubmit={onSubmit} className="space-y-6" data-in>
            <div>
              <label htmlFor="nombre" className="meta text-cream/60">Nombre</label>
              <input id="nombre" name="nombre" type="text" required minLength={2} autoComplete="name" placeholder="Tu nombre" className="field" />
            </div>
            <div>
              <label htmlFor="correo" className="meta text-cream/60">Correo</label>
              <input id="correo" name="correo" type="email" required autoComplete="email" placeholder="tu@correo.com" className="field" />
            </div>
            <div>
              <label htmlFor="mensaje" className="meta text-cream/60">Mensaje</label>
              <textarea id="mensaje" name="mensaje" required minLength={10} rows={4} placeholder="Cuéntame tu idea…" className="field resize-none" />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="meta group inline-flex items-center gap-3 bg-accent px-8 py-4 font-bold text-ink transition-transform hover:-translate-y-1 disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p role="status" aria-live="polite" className="min-h-6 text-sm">
              {status === "sent" && <span className="text-accent">✓ ¡Mensaje enviado! Te responderé pronto.</span>}
              {status === "mail" && (
                <span className="text-accent">✓ ¡Listo! Se abrió tu aplicación de correo con el mensaje preparado: solo falta enviarlo.</span>
              )}
              {status === "error" && (
                <span className="text-pop-yellow">No se pudo enviar. Escríbeme directamente a {profile.email}.</span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
