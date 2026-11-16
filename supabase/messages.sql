-- Mensajes del formulario de contacto.
-- Ejecuta este archivo una sola vez en Supabase: SQL Editor → New query → pegar → Run.
--
-- Cómo funciona:
--   · Cualquier visitante puede ENVIAR un mensaje.
--   · Nadie puede LEERLOS desde la página: solo tú, en Table Editor → messages.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 120 and position('@' in email) > 1),
  message text not null check (char_length(message) between 10 and 2000)
);

alter table public.messages enable row level security;

drop policy if exists "Enviar mensaje de contacto" on public.messages;
create policy "Enviar mensaje de contacto"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- Solo insertar: sin permiso de lectura, edición ni borrado para visitantes.
revoke all on public.messages from anon, authenticated;
grant insert on public.messages to anon, authenticated;
