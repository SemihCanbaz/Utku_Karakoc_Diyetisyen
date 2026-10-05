begin;
create table public.articles (
 id uuid primary key default gen_random_uuid(),
 slug text not null unique check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 title text not null, subtitle text not null default '', category text not null,
 description text not null, intro text not null, takeaway text not null default '',
 reading_time text not null default '5 dk',
 sections jsonb not null default '[]' check(jsonb_typeof(sections)='array'),
 sources jsonb not null default '[]' check(jsonb_typeof(sources)='array'),
 cover_image text not null default '', image_alt text not null default '',
 status text not null default 'draft' check(status in ('draft','published','archived')),
 published_at timestamptz, deleted_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
revoke all on public.articles from anon,authenticated;
grant select on public.articles to anon;
grant select,insert,update,delete on public.articles to authenticated;
grant all on public.articles to service_role;
create policy public_read on public.articles for select to anon,authenticated using(status='published' and deleted_at is null);
create policy admin_all on public.articles for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create index articles_public on public.articles(published_at desc) where status='published' and deleted_at is null;
create trigger touch_updated_at before update on public.articles for each row execute function public.touch_updated_at();
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values('article-images','article-images',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy article_images_admin on storage.objects for all to authenticated
 using(bucket_id='article-images' and (select private.is_admin()))
 with check(bucket_id='article-images' and (select private.is_admin()));
commit;
