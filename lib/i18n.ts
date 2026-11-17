import { ui } from "@/data/ui";
import { tx, type Text } from "@/data/text";
import { useLang } from "./prefs";

/** Idioma actual, textos de la interfaz y un traductor para el contenido. */
export function useT() {
  const lang = useLang();
  return { lang, ui: ui[lang], t: (v: Text) => tx(v, lang) };
}
