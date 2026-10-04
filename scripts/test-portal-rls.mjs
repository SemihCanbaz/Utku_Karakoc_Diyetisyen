import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { btree_gist } from "@electric-sql/pglite/contrib/btree_gist";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
const db=new PGlite({extensions:{btree_gist,pgcrypto}});
await db.exec([
"CREATE ROLE anon NOLOGIN; CREATE ROLE authenticated NOLOGIN; CREATE ROLE service_role NOLOGIN BYPASSRLS;",
"CREATE SCHEMA auth; CREATE TABLE auth.users(id uuid primary key);",
"CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT NULLIF(current_setting('request.jwt.claim.sub',true),'')::uuid $$;",
"GRANT USAGE ON SCHEMA auth,public TO anon,authenticated,service_role;",
"GRANT EXECUTE ON FUNCTION auth.uid() TO anon,authenticated;",
"CREATE SCHEMA storage;",
"CREATE TABLE storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);",
"CREATE TABLE storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);",
"ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;",
"GRANT USAGE ON SCHEMA storage TO anon,authenticated,service_role;",
"GRANT SELECT,INSERT,UPDATE,DELETE ON storage.objects TO authenticated;"
].join("\n"));
const migration=readFileSync("supabase/migrations/202610030001_portal.sql","utf8");
await db.exec(migration);await db.exec(migration);
const admin="10000000-0000-4000-8000-000000000001",a="10000000-0000-4000-8000-000000000002",b="10000000-0000-4000-8000-000000000003";
const ca="20000000-0000-4000-8000-000000000001",cb="20000000-0000-4000-8000-000000000002";
await db.exec([
"INSERT INTO auth.users VALUES('"+admin+"'),('"+a+"'),('"+b+"');",
"INSERT INTO public.clients(id,first_name,last_name,email) VALUES('"+ca+"','Test','A','a@example.invalid'),('"+cb+"','Test','B','b@example.invalid');",
"INSERT INTO public.profiles(auth_user_id,role,client_id,first_name,last_name) VALUES('"+admin+"','admin',NULL,'Admin','Test'),('"+a+"','client','"+ca+"','Test','A'),('"+b+"','client','"+cb+"','Test','B');",
"INSERT INTO public.client_measurements(client_id,measurement_date,weight) VALUES('"+ca+"','2026-10-01',72),('"+cb+"','2026-10-01',83);",
"INSERT INTO public.diet_plans(client_id,week_number,title,start_date,end_date,status) VALUES('"+ca+"',1,'A published','2026-10-01','2026-10-07','published'),('"+ca+"',2,'A draft','2026-10-08','2026-10-14','draft'),('"+ca+"',3,'A archived','2026-10-15','2026-10-21','archived'),('"+cb+"',1,'B published','2026-10-01','2026-10-07','published');",
"INSERT INTO public.appointments(client_id,appointment_date,start_time,end_time,appointment_type) VALUES('"+ca+"','2026-10-05','10:00','11:00','Kontrol'),('"+cb+"','2026-10-05','11:00','12:00','Kontrol');",
"INSERT INTO public.recipes(title,slug,category,status,deleted_at) VALUES('Public','public','Ana Yemek','published',NULL),('Draft','draft','Ana Yemek','draft',NULL),('Archived','archived','Ana Yemek','archived',NULL),('Deleted','deleted','Ana Yemek','published',now());"
].join("\n"));
const backupMigration=readFileSync('supabase/migrations/20261003232738_portal_backup_admin_and_private_helpers.sql','utf8');
await db.exec(backupMigration);await db.exec(backupMigration);
let tests=0;
async function as(role,id=""){await db.exec("RESET ROLE; SELECT set_config('request.jwt.claim.sub','"+id+"',false); SET ROLE "+role+";");}
async function count(table,expected,where=""){const {rows}=await db.query("SELECT count(*)::int AS n FROM public."+table+" "+where);assert.equal(rows[0].n,expected,table+" "+where);tests++;}
async function denied(sql,code="42501"){await assert.rejects(()=>db.exec(sql),e=>e.code===code);tests++;}
await as("anon");await count("recipes",1);await denied("SELECT * FROM public.clients");
for(const [id,clientId,other] of [[a,ca,cb],[b,cb,ca]]){
 await as("authenticated",id);
 await count("profiles",1);await count("clients",1);await count("clients",0,"WHERE id='"+other+"'");
 await count("client_measurements",1);await count("diet_plans",1);await count("appointments",1);await count("recipes",1);
 await denied("INSERT INTO public.client_measurements(client_id,measurement_date,weight) VALUES('"+clientId+"','2026-10-02',60)");
 await denied("UPDATE public.profiles SET role='admin',client_id=NULL");
 await denied("INSERT INTO public.profiles(auth_user_id,role,first_name,last_name) VALUES('"+id+"','admin','X','Y')");
 await denied("INSERT INTO storage.objects(bucket_id,name) VALUES('recipe-images','attack.webp')");
 const update=await db.query("UPDATE public.client_measurements SET weight=999 WHERE client_id='"+clientId+"' RETURNING id");assert.equal(update.rows.length,0);tests++;
 const del=await db.query("DELETE FROM public.recipes RETURNING id");assert.equal(del.rows.length,0);tests++;
}
await as("authenticated",admin);
await count("clients",2);await count("diet_plans",4);await count("recipes",4);
await db.exec("UPDATE public.client_measurements SET weight=71 WHERE client_id='"+ca+"'");
await denied("INSERT INTO public.appointments(client_id,appointment_date,start_time,end_time,appointment_type) VALUES('"+ca+"','2026-10-05','10:30','11:30','Kontrol')","23P01");
await db.exec("UPDATE public.appointments SET status='cancelled' WHERE client_id='"+ca+"';INSERT INTO public.appointments(client_id,appointment_date,start_time,end_time,appointment_type) VALUES('"+ca+"','2026-10-05','10:15','10:45','Ölçüm');");tests++;
await denied("INSERT INTO public.appointments(client_id,appointment_date,start_time,end_time,appointment_type) VALUES('"+ca+"','2026-10-06','12:00','11:00','Kontrol')","23514");
await denied("INSERT INTO public.client_measurements(client_id,measurement_date,weight) VALUES('"+ca+"','2026-10-01',50)","23505");
await db.exec("INSERT INTO storage.objects(bucket_id,name) VALUES('recipe-images','valid.webp')");tests++;
await denied("INSERT INTO storage.objects(bucket_id,name) VALUES('patient-documents','not-allowed.pdf')");
await db.exec("UPDATE public.clients SET status='passive' WHERE id='"+ca+"'");
await as("authenticated",a);await count("clients",0);await count("client_measurements",0);await count("diet_plans",0);await count("appointments",0);
await as("authenticated",admin);await db.exec("UPDATE public.recipes SET status='archived' WHERE slug='public'");
await as("anon");await count("recipes",0);
await db.exec("RESET ROLE");
await db.exec("INSERT INTO auth.users VALUES('10000000-0000-4000-8000-000000000004')");
await db.exec("INSERT INTO public.profiles(auth_user_id,role,first_name,last_name,admin_slot) VALUES('10000000-0000-4000-8000-000000000004','admin','Backup','Admin',2)");
await as('authenticated','10000000-0000-4000-8000-000000000004');await count('clients',2);await count('diet_plans',4);
await db.exec("RESET ROLE; INSERT INTO auth.users VALUES('10000000-0000-4000-8000-000000000005')");
await denied("INSERT INTO public.profiles(auth_user_id,role,first_name,last_name,admin_slot) VALUES('10000000-0000-4000-8000-000000000005','admin','Third','Admin',3)",'23514');
await denied("INSERT INTO public.profiles(auth_user_id,role,first_name,last_name,admin_slot) VALUES('10000000-0000-4000-8000-000000000005','admin','Third','Admin',2)",'23505');
await as('anon');await denied('SELECT private.is_admin()');
await db.close();
console.log("PASS: "+tests+" PostgreSQL/RLS checks; two clients isolated, clients read-only, drafts hidden, passive accounts blocked, storage policy, appointment overlap, repeatable migration.");
