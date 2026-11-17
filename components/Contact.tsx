"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/portfolio";
import { sendMessage } from "@/lib/messages";
import { useT } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "mail";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const { lang, ui } = useT();
  const [plain, accent] = ui.contact.heading;
  const heading = plain + accent;

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

    if (data.get("sitio")) return; // trampa para bots

    setStatus("sending");
    const ok = await sendMessage({ name: name.trim(), email: email.trim(), message: message.trim() });
    if (ok) {
      setStatus("sent");
      form.reset();
      return;
    }
    // Si no se pudo guardar, se abre la app de correo con el mensaje listo.
    const subject = encodeURIComponent(`${ui.contact.subject} ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("mail");
  }

  const links = [
    { label: ui.contact.email, value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github },
    { label: "LinkedIn", value: "in/samuel-andres-salcedo-martinez", href: profile.linkedin },
    ...(profile.whatsapp ? [{ label: "WhatsApp", value: ui.contact.writeMe, href: profile.whatsapp }] : []),
  ];

  return (
    <section id="contacto" ref={root} className="relative overflow-hidden border-t border-cream/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <p className="meta text-accent">{ui.contact.label}</p>
        <h2 data-heading className={`display mt-3 overflow-hidden whitespace-nowrap text-cream ${lang === "en" ? "text-[clamp(3.5rem,16vw,16rem)]" : "text-[clamp(4rem,19vw,19rem)]"}`} aria-label={heading.replace("\u00a0", " ")}>
          {heading.split("").map((c, i) => (
            <span key={i} data-char aria-hidden className={`inline-block ${i >= plain.length ? "text-accent" : ""}`}>
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
              <label htmlFor="nombre" className="meta text-cream/60">{ui.contact.name}</label>
              <input id="nombre" name="nombre" type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder={ui.contact.namePh} className="field" />
            </div>
            <div>
              <label htmlFor="correo" className="meta text-cream/60">{ui.contact.email}</label>
              <input id="correo" name="correo" type="email" required maxLength={120} autoComplete="email" placeholder={ui.contact.emailPh} className="field" />
            </div>
            <div>
              <label htmlFor="mensaje" className="meta text-cream/60">{ui.contact.message}</label>
              <textarea id="mensaje" name="mensaje" required minLength={10} maxLength={2000} rows={4} placeholder={ui.contact.messagePh} className="field resize-none" />
            </div>
            <input type="text" name="sitio" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
            <button
              type="submit"
              disabled={status === "sending"}
              className="meta group inline-flex items-center gap-3 bg-accent px-8 py-4 font-bold text-night transition-transform hover:-translate-y-1 disabled:opacity-60"
            >
              {status === "sending" ? ui.contact.sending : ui.contact.send}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <p role="status" aria-live="polite" className="min-h-6 text-sm">
              {status === "sent" && <span className="text-accent">{ui.contact.sent}</span>}
              {status === "mail" && (
                <span className="text-accent">{ui.contact.mail}</span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
