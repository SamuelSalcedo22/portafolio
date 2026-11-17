"use client";

import { useSyncExternalStore } from "react";

/*
 * Preferencias del visitante: idioma y tema.
 * Se guardan en localStorage para recordarlas en la próxima visita.
 * El script de app/layout.tsx aplica el tema guardado antes de pintar la página.
 */

export type Lang = "es" | "en";
export type Theme = "dark" | "light";

const listeners = new Set<() => void>();
let lang: Lang | null = null;

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento (modo privado): la preferencia dura solo esta visita.
  }
}

export function getLang(): Lang {
  if (lang === null) {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    lang = saved === "en" ? "en" : "es";
  }
  return lang;
}

export function setLang(next: Lang) {
  lang = next;
  save("lang", next);
  document.documentElement.lang = next;
  emit();
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  save("theme", next);
  emit();
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "es");
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}

