import { insertRow } from "./supabase";

/** Guarda un mensaje del formulario de contacto en la tabla "messages" de Supabase. */
export function sendMessage(m: { name: string; email: string; message: string }): Promise<boolean> {
  return insertRow("messages", m);
}
