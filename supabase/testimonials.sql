-- Testimonios del portafolio.
-- Ejecuta este archivo una sola vez en Supabase: SQL Editor → New query → pegar → Run.
--
-- Cómo funciona:
--   · Cualquier visitante puede ENVIAR un testimonio, pero queda con approved = false.
--   · La página solo MUESTRA los que tienen approved = true.
--   · Para aprobar uno: Table Editor → testimonials → marca la casilla "approved".

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 60),
  role text not null check (char_length(role) between 2 and 80),
  message text not null check (char_length(message) between 10 and 400),
  stars smallint not null default 5 check (stars between 1 and 5),
  approved boolean not null default false
);

alter table public.testimonials enable row level security;

drop policy if exists "Leer testimonios aprobados" on public.testimonials;
create policy "Leer testimonios aprobados"
  on public.testimonials for select
  to anon, authenticated
  using (approved);

drop policy if exists "Enviar testimonio pendiente" on public.testimonials;
create policy "Enviar testimonio pendiente"
  on public.testimonials for insert
  to anon, authenticated
  with check (approved = false);

grant select, insert on public.testimonials to anon, authenticated;
