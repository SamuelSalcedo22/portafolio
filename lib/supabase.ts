/*
 * Conexión con Supabase (testimonios y mensajes de contacto).
 * La clave "publishable" está pensada para usarse en el navegador: lo que protege
 * los datos son las políticas RLS de la carpeta supabase/.
 */
const SUPABASE_URL = "https://nnflmssycvtfszepgkjy.supabase.co";
const SUPABASE_KEY = "sb_publishable_bifakr9h3RVaxWUYK0DwYg_sYiG6Qlg";

export const HEADERS = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

export function tableUrl(table: string) {
  return `${SUPABASE_URL}/rest/v1/${table}`;
}

/** Inserta una fila; devuelve true si se guardó. */
export async function insertRow(table: string, row: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(tableUrl(table), {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    return res.ok;
  } catch {
    return false;
  }
}
