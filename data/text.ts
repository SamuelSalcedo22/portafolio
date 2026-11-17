/** Un texto que puede ser igual en ambos idiomas ("Next.js") o tener una versión por idioma. */
export type Text = string | { es: string; en: string };

export type LangKey = "es" | "en";

/** Devuelve el texto en el idioma pedido. */
export function tx(value: Text, lang: LangKey): string {
  return typeof value === "string" ? value : value[lang];
}
