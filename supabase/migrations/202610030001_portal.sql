begin;
create extension if not exists pgcrypto;
create extension if not exists btree_gist;
create table if not exists public.clients (
 id uuid primary key default gen_random_uuid(), first_name text not null check(length(first_name) between 1 and 100),
 last_name text not null check(length(last_name) between 1 and 100), phone text not null default '', email text not null,
 birth_date date, gender text not null default '', start_date date not null default current_date,
 goal text not null default '', target_weight numeric check(target_weight between 20 and 400),
 notes text not null default '', status text not null default 'active' check(status in ('active','passive')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index if not exists clients_email_unique on public.clients(lower(email));
create table if not exists public.profiles (
 id uuid primary key default gen_random_uuid(), auth_user_id uuid not null unique references auth.users(id) on delete cascade,
 client_id uuid unique references public.clients(id) on delete restrict,
 role text not null check(role in ('admin','client')), first_name text not null, last_name text not null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check((role='admin' and client_id is null) or (role='client' and client_id is not null))
);
create unique index if not exists profiles_one_admin on public.profiles(role) where role='admin';
create table if not exists public.client_measurements (
 id uuid primary key default gen_random_uuid(), client_id uuid not null references public.clients(id) on delete restrict,
 measurement_date date not null, weight numeric not null check(weight between 20 and 400),
 waist numeric check(waist between 20 and 300), hip numeric check(hip between 20 and 300),
 body_fat_percentage numeric check(body_fat_percentage between 1 and 75), note text not null default '',
 created_at timestamptz not null default now(), unique(client_id,measurement_date)
);
create table if not exists public.diet_plans (
 id uuid primary key default gen_random_uuid(), client_id uuid not null references public.clients(id) on delete restrict,
 week_number integer not null check(week_number between 1 and 1000), title text not null,
 start_date date not null, end_date date not null check(end_date>=start_date),
 content jsonb not null default '{"meals":[]}'::jsonb check(jsonb_typeof(content)='object' and content ? 'meals' and jsonb_typeof(content->'meals')='array'),
 notes text not null default '', status text not null default 'draft' check(status in ('draft','published','archived')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(client_id,week_number)
);
create table if not exists public.appointments (
 id uuid primary key default gen_random_uuid(), client_id uuid not null references public.clients(id) on delete restrict,
 appointment_date date not null, start_time time not null, end_time time not null check(end_time>start_time),
 appointment_type text not null check(appointment_type in ('İlk Görüşme','Kontrol','Online Görüşme','Ölçüm','Diğer')),
 status text not null default 'scheduled' check(status in ('scheduled','completed','cancelled','no_show')),
 note text not null default '', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
do $$ begin
 if not exists(select 1 from pg_constraint where conname='appointments_no_overlap' and conrelid='public.appointments'::regclass) then
 alter table public.appointments add constraint appointments_no_overlap exclude using gist
 (tsrange(appointment_date+start_time,appointment_date+end_time,'[)') with &&) where (status='scheduled');
 end if;
end $$;
create table if not exists public.recipes (
 id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 subtitle text not null default '', description text not null default '', hero_description text not null default '',
 category text not null, cover_image text not null default '', image_alt text not null default '',
 servings text not null default '', prep_time text not null default '', cook_time text not null default '',
 total_time text not null default '', difficulty text not null default '', tags jsonb not null default '[]',
 ingredients jsonb not null default '[]' check(jsonb_typeof(ingredients)='array'),
 steps jsonb not null default '[]' check(jsonb_typeof(steps)='array'),
 calories numeric check(calories>=0), protein numeric check(protein>=0), carbs numeric check(carbs>=0),
 fat numeric check(fat>=0), fiber numeric check(fiber>=0),
 dietitian_note text not null default '', allergens text not null default '', nutrition_type text not null default '',
 micro_nutrients jsonb not null default '[]', serving_suggestion text not null default '', calculation_note text not null default '',
 tip text not null default '', featured boolean not null default false,
 status text not null default 'draft' check(status in ('draft','published','archived')),
 published_at timestamptz, deleted_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index if not exists measurements_client_date on public.client_measurements(client_id,measurement_date);
create index if not exists plans_client_date on public.diet_plans(client_id,start_date);
create index if not exists appointments_client on public.appointments(client_id);
create index if not exists appointments_date on public.appointments(appointment_date);
create index if not exists recipes_public on public.recipes(status) where deleted_at is null;
create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path='' as $$
begin new.updated_at=now(); return new; end $$;
do $$ declare t text; begin
 foreach t in array array['clients','profiles','diet_plans','appointments','recipes'] loop
 execute format('drop trigger if exists touch_updated_at on public.%I',t);
 execute format('create trigger touch_updated_at before update on public.%I for each row execute function public.touch_updated_at()',t);
 end loop;
end $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where auth_user_id=(select auth.uid()) and role='admin');
$$;
create or replace function public.current_client_id() returns uuid language sql stable security definer set search_path='' as $$
 select p.client_id from public.profiles p join public.clients c on c.id=p.client_id
 where p.auth_user_id=(select auth.uid()) and p.role='client' and c.status='active';
$$;
revoke all on function public.is_admin() from public;
revoke all on function public.current_client_id() from public;
grant execute on function public.is_admin(),public.current_client_id() to anon,authenticated;
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.client_measurements enable row level security;
alter table public.diet_plans enable row level security;
alter table public.appointments enable row level security;
alter table public.recipes enable row level security;
revoke all on public.profiles,public.clients,public.client_measurements,public.diet_plans,public.appointments,public.recipes from anon,authenticated;
grant select on public.profiles to authenticated;
grant select,insert,update,delete on public.clients,public.client_measurements,public.diet_plans,public.appointments,public.recipes to authenticated;
grant select on public.recipes to anon;
grant all on public.profiles,public.clients,public.client_measurements,public.diet_plans,public.appointments,public.recipes to service_role;
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using(auth_user_id=(select auth.uid()) or (select public.is_admin()));
do $$ declare t text; begin
 foreach t in array array['clients','client_measurements','diet_plans','appointments','recipes'] loop
 execute format('drop policy if exists admin_all on public.%I',t);
 execute format('create policy admin_all on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',t);
 end loop;
end $$;
drop policy if exists client_read on public.clients;
create policy client_read on public.clients for select to authenticated using(id=(select public.current_client_id()));
drop policy if exists client_read on public.client_measurements;
create policy client_read on public.client_measurements for select to authenticated using(client_id=(select public.current_client_id()));
drop policy if exists client_read on public.diet_plans;
create policy client_read on public.diet_plans for select to authenticated using(client_id=(select public.current_client_id()) and status='published');
drop policy if exists client_read on public.appointments;
create policy client_read on public.appointments for select to authenticated using(client_id=(select public.current_client_id()));
drop policy if exists public_read on public.recipes;
create policy public_read on public.recipes for select to anon,authenticated using(status='published' and deleted_at is null);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('recipe-images','recipe-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;
drop policy if exists recipe_images_admin on storage.objects;
create policy recipe_images_admin on storage.objects for all to authenticated using(bucket_id='recipe-images' and (select public.is_admin())) with check(bucket_id='recipe-images' and (select public.is_admin()));
commit;
