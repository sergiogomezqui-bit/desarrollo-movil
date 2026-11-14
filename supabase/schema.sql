-- Challenge 9: tabla de tareas con RLS, realtime y bucket de avatares.
-- Ejecutar completo en Supabase > SQL Editor.

-- 1. Tabla de tareas
create table if not exists public.tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  completada boolean not null default false,
  user_id uuid not null references auth.users on delete cascade default auth.uid(),
  created_at timestamptz not null default now()
);

-- 2. RLS: cada usuario solo ve y modifica sus propias tareas
alter table public.tareas enable row level security;

create policy "ver mis tareas" on public.tareas
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "crear mis tareas" on public.tareas
  for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "editar mis tareas" on public.tareas
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "borrar mis tareas" on public.tareas
  for delete to authenticated using ((select auth.uid()) = user_id);

-- 3. Realtime para la lista en vivo
alter publication supabase_realtime add table public.tareas;
alter table public.tareas replica identity full;

-- 4. Bucket de avatares (publico para poder mostrar la foto)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Cada usuario solo escribe dentro de su carpeta (avatars/<uid>/...)
create policy "subir a mi carpeta" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "reemplazar mis archivos" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "eliminar mis archivos" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
