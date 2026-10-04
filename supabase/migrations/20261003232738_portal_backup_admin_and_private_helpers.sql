begin;
-- A primary and a backup administrator; no public account may grant this role.
alter table public.profiles add column if not exists admin_slot smallint;
update public.profiles set admin_slot=1 where role='admin' and admin_slot is null;
drop index if exists public.profiles_one_admin;
do $$ begin
 if not exists(select 1 from pg_constraint where conname='profiles_admin_slot_check' and conrelid='public.profiles'::regclass) then
 alter table public.profiles add constraint profiles_admin_slot_check check
 ((role='admin' and admin_slot is not null and admin_slot in (1,2)) or (role='client' and admin_slot is null));
 end if;
end $$;
create unique index if not exists profiles_admin_slot_unique on public.profiles(admin_slot) where role='admin';

-- RLS helpers remain callable by policies, but are outside the exposed API schema.
create schema if not exists private;
revoke all on schema private from public,anon;
grant usage on schema private to authenticated,service_role;
do $$ begin
 if to_regprocedure('public.is_admin()') is not null then alter function public.is_admin() set schema private; end if;
 if to_regprocedure('public.current_client_id()') is not null then alter function public.current_client_id() set schema private; end if;
 if to_regprocedure('public.rls_auto_enable()') is not null then
   revoke all on function public.rls_auto_enable() from public,anon,authenticated;
 end if;
end $$;
revoke all on function private.is_admin(),private.current_client_id() from public,anon;
grant execute on function private.is_admin(),private.current_client_id() to authenticated,service_role;
create schema if not exists extensions;
alter extension btree_gist set schema extensions;
commit;
