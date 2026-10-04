# Geliştirme ve Supabase bağlantı durumu — 4 Ekim 2026

## 1. Yapılanlar

- Kullanıcının PDF ve fotoğraflarıyla tarif ve makale içerikleri düzenlendi. Toplam 24 tarif ve 12 makale mevcut. Kaynak notları `content-sources/2026-10-03.md` içinde.
- Hakkımda, eğitim, staj ve sertifika bilgileri güncellendi. Metin kontrastı, mobil kartlar, ikonlar ve hareket azaltma tercihini gözeten geçişler iyileştirildi.
- Danışan, ölçüm, haftalık beslenme planı, randevu, tarif ve görsel yönetimi hazırlandı. Danışan portalı kendi yayınlanmış kayıtlarını okur.
- `utku-karakoc-diyetisyen` Supabase projesinde altı tablo, RLS politikaları ve tarif görsel alanı kuruldu. Ana ve yedek yönetici için iki slot tanımlandı.
- 24 tarif Supabase'e aktarıldı; public API ile 24 yayındaki kayıt doğrulandı. Yerel gerçek proje `RECIPES_SOURCE=supabase` kullanıyor.
- Herkese açık kullanıcı kaydı kapatıldı. Auth Site URL canlı Vercel adresine ayarlandı.
- Yönetim paneline haftalık randevu şeridi, takip gerektiren danışanlar, arama ve sayfalama, planı sonraki haftaya taslak kopyalama, kaydedilmemiş form uyarısı, yükleme iskeletleri ve giriş formu geri bildirimleri eklendi.
- `utkukarakoc.com.tr` ve www adresi Vercel'e eklendi; Turkticaret DNS kayıtları güncellendi, Vercel Valid Configuration ve hedef IP üzerinden HTTPS 200/308 doğrulandı. Yerel DNS yayılımı ve Resend doğrulaması bekleniyor. Ayrıntılar `DOMAIN-KURULUM-2026-10-04.md` içinde.
- Değişiklikler kullanıcının Downloads içindeki GitHub'a bağlı gerçek proje klasörüne aktarıldı. GitHub push veya Vercel deploy yapılmadı.

## 2. Tablolar

`profiles`, `clients`, `client_measurements`, `diet_plans`, `appointments`, `recipes`. Hepsinde RLS etkin. `recipe-images` yalnızca tarif fotoğrafları için herkese açık Storage alanıdır; danışan dosyaları için kullanılmaz.

## 3. Routes

- `/giris`, `/sifre-belirle`, `/auth/confirm`, `/auth/callback`
- `/admin`, `/admin/danisanlar`, `/admin/danisanlar/yeni`, `/admin/danisanlar/[id]`
- `/admin/randevular`, `/admin/tarifler`, `/admin/tarifler/yeni`, `/admin/tarifler/[id]`
- `/danisan`, `/danisan/diyet-listelerim`, `/danisan/diyet-listelerim/[id]`, `/danisan/gelisim`, `/danisan/randevularim`

## 4. Ortam değişkenleri

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RECIPES_SOURCE`. Yerelde ve Vercel production ortamında tanımlandı. Gizli anahtar yerelde Git tarafından dışlanan `.env.local` içinde, Vercel'de sensitive türünde tutulur; istemciye açılmaz. Önceki iletişim değişkenleri korundu. Resend anahtarı ve gönderici ayarları tamamlanmayı bekliyor.

## 5. Kalan Supabase adımları

- Ana ve yedek yönetici Auth hesapları kullanıcı tarafından oluşturuldu. E-posta doğrulamaları tamam; hesaplar `profiles` içinde sırasıyla admin_slot 1 ve 2 ile eşleştirildi. Yedek yöneticinin gerçek oturumuyla giriş, geçici danışan oluşturma, taslak plan kaydetme ve sonraki haftaya kopyalama doğrulandı.
- Özel SMTP bağlanmalı. Supabase paneli özel SMTP olmadan davet ve şifre yenileme şablonlarını düzenlemeye izin vermiyor. Gerekli şablon bağlantıları `SUPABASE-KURULUM.md` içinde hazır.
- Davet, parola yenileme ve gerçek oturumla yönetim işlemleri SMTP/hesap kurulumu sonrası uçtan uca doğrulanmalı.
- İlk migration SQL Editor'da çalıştırıldı; ikinci migration MCP ile kaydedildi. CLI üzerinden yeni migration gönderilmeden önce uzak migration geçmişinde ilk kurulumun baz kaydı uzlaştırılmalı; iki yönetici migration'ı sonrasında ilk dosya tekrar çalıştırılmamalı.

## 6. Doğrulama

- Gerçek proje klasöründe Next.js 16.3.6 üretim derlemesi ve TypeScript başarılı.
- ESLint başarılı.
- Portal doğrulama testleri ve 47 PostgreSQL/RLS kontrolü başarılı; iki yönetici sınırı, danışan izolasyonu, taslak gizliliği, pasif hesaplar ve randevu çakışmaları dahil.
- Bağlı üretim önizlemesinde 51 önceden oluşturulan sayfa, 77 iç bağlantı, 29 görsel ve 36 JSON-LD kontrolü başarılı. Dinamik tarif bağlantıları da HTTP 200 döndü; bilinmeyen URL'ler 404, görsel optimizasyonu 200.
- 10 korumalı rota anonim kullanıcıları girişe yönlendiriyor. Özel önbellek kuralları, noindex ve geçersiz doğrulama bağlantısı kontrolleri başarılı.
- Supabase güvenlik danışmanı: sıfır bulgu.
- Haftalık plan tarihi, takip listesi ve sayfalama testleri başarılı. Gerçek oturumla doğrulanan işlemler yukarıda belirtildi; tüm yönetim akışlarının uçtan uca testi henüz tamamlanmadı.

## 7. Gerçek kalan işler

DNS yayılımı sonrası tarayıcı kontrolü, Supabase Site URL geçişi, özel SMTP/şablonlar, kalan panel akışlarının testi ve güncel sürümün yayını. Vercel production Site URL yeni alan adına hazırlandı; derleme bekliyor. Eski sürümün yeniden yayını otomatik onay denetimince reddedildi; eski kaynak yeniden yayımlanmadı. Geçici arayüz test danışanı testler sonunda kaldırılmalı. Kullanıcı tarafından iletilen steak tarifinin kalori/makro tutarsızlığı kaynak notlarında işaretli; işletmenin veri saklama ve aydınlatma ayrıntıları gerçek danışan verisi kullanılmadan netleştirilmeli.
