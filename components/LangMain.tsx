"use client";

import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/prefs";

/**
 * Contenido principal. Al cambiar de idioma se vuelve a montar entero, así cada
 * animación (letras, palabras, pila 3D, física) se arma de nuevo con los textos nuevos.
 */
export default function LangMain({ children }: { children: ReactNode }) {
  const lang = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    gsap.registerPlugin(ScrollTrigger);
    // Los textos cambian de largo: recalcular dónde empieza cada animación de scroll.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return <main key={lang}>{children}</main>;
}
