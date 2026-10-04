# Danışan ve yönetim portalı kurulumu

Bu sürüm tek diyetisyen ve en fazla iki yönetici hesabı (ana + yedek) içindir. Her hesabın ayrı şifresi ve oturumu vardır; iki yönetici de danışanları, planları, randevuları ve tarifleri yönetebilir. Mevcut web sitesi Supabase kurulmadan çalışır. Portal için örnek şifre veya herkese açık kayıt yolu yoktur.

## 1. Supabase projesi ve veritabanı

1. Kendi Supabase hesabınızda bir proje oluşturun. Bölgeyi, yedekleme seçeneğini ve veri aktarımı koşullarını gerçek danışan verisi girmeden önce belirleyin.
2. SQL Editor içinde `supabase/migrations/202610030001_portal.sql` dosyasını çalıştırın.
3. Ardından `supabase/migrations/20261003232738_portal_backup_admin_and_private_helpers.sql` dosyasını çalıştırın. İlk migration altı tabloyu ve `recipe-images` Storage alanını; ikincisi iki yönetici slotunu ve özel şemadaki erişim yardımcılarını kurar. Migration'ları sırasıyla uygulayın; ikinci migration sonrasında ilkini yeniden çalıştırmayın. Şema değişirse yeni migration kullanın.
4. Authentication ayarlarında herkese açık yeni kullanıcı kaydını kapatın. Davetle hesap oluşturma Admin API üzerinden devam eder.
5. E-posta/parola sağlayıcısını açın. Üretimde kendi SMTP sağlayıcınızı bağlayın; test e-posta hizmetinin alıcı/rate limit sınırlarına güvenmeyin. E-posta doğrulamasını koruyun. Güçlü parola ve oturum süresi ayarlarını belirleyin.

## 2. Ortam değişkenleri

Yerelde `.env.local`, Vercel projesinde ilgili ortamın Environment Variables alanı:

| Değişken | Değer / kullanım |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | Üretimde https://diyetisyen-utku-karakoc.vercel.app |
| NEXT_PUBLIC_ALLOW_INDEXING | Üretimde true; yerel/preview ortamında false |
| NEXT_PUBLIC_SUPABASE_URL | Supabase Project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Projenin publishable anahtarı (sb_publishable_...) veya eski anon anahtarı |
| SUPABASE_SERVICE_ROLE_KEY | Yalnızca sunucuya özel service_role anahtarı; hesap daveti ve seed |
| RECIPES_SOURCE | İlk kurulumda static; aktarım doğrulanınca supabase |

Service role anahtarına NEXT_PUBLIC_ öneki eklemeyin; GitHub'a, mesaja veya tarayıcı koduna koymayın. Kod bu anahtarı `server-only` modülde kullanır. Mevcut telefon, e-posta, Resend ve Instagram ayarlarını koruyun.

`NEXT_PUBLIC_` değişkenleri derlemeye girdiğinden değişiklikten sonra Vercel'de yeniden deploy gerekir. Preview ortamını üretim danışan veritabanına bağlamayın. Yerel test için ayrı proje tercih edin.

## 3. Davet ve şifre yenileme bağlantıları

Authentication → URL Configuration:
- Site URL: üretim sitenizin HTTPS adresi.
- Redirect allowlist: üretim adresi + `/sifre-belirle`; yerel test için kullandığınız localhost adresi + `/sifre-belirle`.
- Genel joker alan adı yerine sahip olduğunuz tam adresleri kullanın.

Authentication → Email Templates:
**Invite user** bağlantısı:
```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite">Hesabımı etkinleştir</a>
```

**Reset password** bağlantısı:
```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Şifremi yenile</a>
```

Portal bu iki bağlantıyı sunucuda doğrulayıp sabit `/sifre-belirle` sayfasına yönlendirir. Üretim Site URL ayarını doğru tutun. Yerel projede onun kendi Site URL ayarını kullanın.

## 4. Ana ve yedek yönetici

1. Authentication → Users içinde kendi gerçek yönetici e-postanızla kullanıcı oluşturun. Şifreyi siz belirleyin; repoda varsayılan şifre yoktur.
2. `supabase/bootstrap-admin.sql` dosyasında örnek e-postayı, görünen adı ve requested_slot değerini değiştirin. Ana hesap için 1, yedek hesap için 2 kullanıp her hesap için ayrı çalıştırın. Kişisel e-postaları ve şifreleri Git'e kaydetmeyin.
3. `/giris` sayfasından giriş yapın. Yönetici `/admin`, danışan `/danisan` alanına yönlendirilir.
4. Üçüncü yönetici veya aynı slota ikinci hesap veritabanı constraint ve unique index'i ile engellenir. Danışanlar rolünü değiştiremez; profiles tablosuna yazma izni yalnızca sunucu yönetim anahtarındadır.

## 5. Mevcut tarifleri aktarın

Node 22.17+ ve projenin kök klasöründe:

```powershell
npm ci
npm run seed:recipes
```

Seed `.env.local` dosyasını okur. Toplam 24 tarif aynı slug'larla aktarılır. `onConflict: slug, ignoreDuplicates: true` kullanılır: komutu tekrar çalıştırmak yönetici düzenlemelerini veya silindi işaretini ezmez. Önce panelden kontrol edin; sonra `RECIPES_SOURCE=supabase` yapıp yeniden deploy edin.

Bu geçişten sonra web sitesinin tarif listesi, detayları, ana sayfa kartları ve sitemap'i veritabanından okunur. Yalnızca published ve deleted_at boş kayıtlar gösterilir. Veritabanı hatasında eski statik tariflere geri dönülmez. Panel kaydı sonrasında yollar yeniden doğrulanır; ayrıca 60 saniyelik yenileme vardır. Açık bir tarayıcı sekmesinin eski içeriğini görmekteyseniz sayfayı yenileyin.

Statik tarifleri eski sürüme geri döndürmek için `RECIPES_SOURCE=static` seçmek, panelde yayından kaldırılmış eski tarifleri de geri getirir; bunu normal hata giderme yöntemi olarak kullanmayın.

## 6. Günlük kullanım

- Danışanlar → Yeni danışan: bilgileri kaydedin; dosyadan hesap daveti gönderin.
- Genel bilgiler: hedef ve iletişimi düzenleyin; danışanı pasife alabilirsiniz. Pasif hesap kendi verilerine erişemez. Pasifleştirme silme değildir.
- Ölçümler: tarih ve ağırlık ekleyin; bel/kalça/yağ oranı isteğe bağlıdır. Aynı gün için ikinci kayıt yerine mevcut kaydı düzenleyin.
- Diyet planları: her hafta ayrı kayıt; öğün/besin satırları eklenebilir. “Danışanla paylaş” kaydeder ve yayınlar. Taslak/arşiv danışana görünmez.
- Randevular: tüm saatler İstanbul saatidir. Planlanmış randevular birbiriyle çakışamaz. İptal edilen randevunun saati tekrar kullanılabilir.
- Tarifler: taslak/yayında/arşiv durumunu seçin. Başlığı değiştirmek mevcut slug'ı değiştirmez. Yayındaki slug'ı değiştirmemek eski bağlantıları korur.
- Fotoğraf: gerçek JPG/PNG/WebP, en fazla 5 MB. Görsel içeriği kontrol edilir, EXIF yönü düzeltilir ve WebP'ye dönüştürülür. Yeni dosya ve kayıt başarılı olmadan eski dosya kaldırılmaz.
- Silinen tarifler veritabanında deleted_at ile saklanır. Geri alma yalnızca yetkili veritabanı işlemiyle yapılabilir.
- Danışan tarafı: kendi yayınlanmış listelerini, ölçümlerini ve randevularını okur; randevu oluşturamaz veya ölçüm değiştiremez.

Danışanın iletişim e-postasını düzenlemek giriş e-postasını değiştirmez. Giriş adresi değişikliğini kimlik doğrulamasıyla Supabase Auth üzerinden yönetin. Profil görünen adı güncel danışan kaydından okunur.

## 7. Davet eşleştirmesi başarısız olursa

E-posta daveti ile profiles eklemesi iki ayrı işlemdir. İkinci adım başarısız olursa hesap yetkisiz kalır; kod mevcut bir Auth hesabını otomatik silmez. Authentication → Users ile ilgili e-postanın UID'sini doğrulayın. Doğru clients kaydının ID'sini doğrulayın. İlgili UID başka bir profile bağlı değilse, SQL Editor'da rolü **client** ve doğru client_id olacak şekilde profiles kaydını ekleyin. Rolü istemciden veya user_metadata'dan vermeyin. Yeni şifre bağlantısını kullanıcının talebiyle giriş ekranından yeniden gönderebilirsiniz.

## 8. Gerçek veri kullanmadan önce

- İki deneme danışanı oluşturup ayrı oturumlarda A'nın B'nin kayıtlarına erişemediğini kontrol edin.
- Davet → şifre belirleme → giriş → çıkış → şifre yenileme akışlarını gerçek SMTP ile deneyin.
- Taslak planı paylaşın; danışanda göründüğünü, arşivlenince kaybolduğunu kontrol edin.
- Tarif ekleme/düzenleme/görsel değişimi/yayından kaldırma/silme işlemlerini sitede doğrulayın.
- Başarısız görsel yüklemede eski fotoğrafın korunduğunu kontrol edin.
- Veritabanı yedeği alın; danışan verilerini herkese açık Storage alanına koymayın. recipe-images yalnızca tarif fotoğrafları içindir.
- Danışmanlığa özgü veri sorumlusu iletişim/adres bilgisi, saklama-imha süresi, sağlık verisi işleme şartı ve yurt dışı aktarım düzenini gerçek işletme sürecine göre tamamlayın. Web metinleri bu yapılandırmaların yerine geçmez.

## Test komutları

```powershell
npm run lint
npm run typecheck
npm run test
npm run test:portal
npm run check:content
npm run build
# Üretim sunucusu çalışırken:
$env:CHECK_SITE_URL="http://127.0.0.1:3001"
npm run check:site
npm run check:portal
```

`test:portal` sahte kişilere ait bellek içi PostgreSQL verisi kullanır; bir Supabase hesabına bağlanmaz. RLS, takvim çakışması ve doğrulama testleri gerçek hosted Supabase Auth/SMTP/Storage uçtan uca testinin yerine geçmez.
