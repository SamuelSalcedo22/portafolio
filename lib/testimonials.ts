import type { Testimonial } from "@/data/portfolio";
import { HEADERS, insertRow, tableUrl } from "./supabase";

/** Máximo de testimonios aprobados que se muestran en la pila. */
export const MAX_SHOWN = 8;

type Row = { name: string; role: string; message: string; stars: number };

/** Testimonios aprobados, del más reciente al más antiguo. Devuelve [] si algo falla. */
export async function fetchApproved(): Promise<Testimonial[]> {
  try {
    const res = await fetch(
      `${tableUrl("testimonials")}?select=name,role,message,stars&approved=eq.true&order=created_at.desc&limit=${MAX_SHOWN}`,
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
export function submitTestimonial(t: Row): Promise<boolean> {
  return insertRow("testimonials", t);
}
