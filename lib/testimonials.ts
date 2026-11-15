import type { Testimonial } from "@/data/portfolio";

/*
 * Conexión con Supabase para los testimonios.
 * La clave "publishable" está pensada para usarse en el navegador: lo que protege
 * los datos son las políticas RLS de supabase/testimonials.sql.
 */
const SUPABASE_URL = "https://nnflmssycvtfszepgkjy.supabase.co";
const SUPABASE_KEY = "sb_publishable_bifakr9h3RVaxWUYK0DwYg_sYiG6Qlg";

const ENDPOINT = `${SUPABASE_URL}/rest/v1/testimonials`;
const HEADERS = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

/** Máximo de testimonios aprobados que se muestran en la pila. */
export const MAX_SHOWN = 8;

type Row = { name: string; role: string; message: string; stars: number };

/** Testimonios aprobados, del más reciente al más antiguo. Devuelve [] si algo falla. */
export async function fetchApproved(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      `${ENDPOINT}?select=name,role,message,stars&approved=eq.true&order=created_at.desc&limit=${MAX_SHOWN}`,
      { headers: HEADERS },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as Row[];
    return rows.map((r) => ({ name: r.name, role: r.role, text: r.message, stars: r.stars }));
  } catch {
    return [];
  }
}

/** Envía un testimonio; queda pendiente hasta que se apruebe en Supabase. */
export async function submitTestimonial(t: Row): Promise<boolean> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(t),
    });
    return res.ok;
  } catch {
    return false;
  }
}
