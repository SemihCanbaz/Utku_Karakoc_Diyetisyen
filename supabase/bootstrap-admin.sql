-- Önce iki migration'ı sırasıyla uygulayın; sonra Auth içinde hesabı oluşturun.
-- Her yönetici için ayrı çalıştırın: ana hesap slot=1, yedek hesap slot=2.
-- Örnek e-posta ve görünen adı kendi bilgilerinizle değiştirin.
-- Şifre bu dosyaya yazılmaz.
do $$
declare
 account uuid;
 requested_slot smallint := 1;
begin
 select id into account from auth.users where lower(email)=lower('yonetici-adresinizi-yazin@example.com');
 if account is null then raise exception 'Bu e-postaya ait Auth kullanıcısı bulunamadı.'; end if;
 if exists(select 1 from public.profiles where auth_user_id=account and role='client') then
  raise exception 'Bu hesap danışan olarak bağlı; yönetici için ayrı hesap kullanın.';
 end if;
 if exists(select 1 from public.profiles where auth_user_id=account and admin_slot<>requested_slot) then
  raise exception 'Bu yönetici başka slota bağlı; önce mevcut atamayı kontrol edin.';
 end if;
 insert into public.profiles(auth_user_id,role,first_name,last_name,admin_slot)
 values(account,'admin','Yönetici','Adı',requested_slot)
 on conflict(auth_user_id) do nothing;
end $$;
