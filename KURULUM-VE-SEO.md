# Kurulum ve canlı yayın
## 1. Teknoloji
Next.js 16.3.5, React 19, TypeScript, Tailwind CSS 3, Framer Motion 12 ve Lucide. Eski 14.2.3 sürümü, kullanıcının güncelleme izniyle değiştirildi. Yeni backend eklenmedi. Manrope ve Playfair Display yazı tipleri lisanslarıyla public/fonts içinde bulunur; next/font/local ile aynı siteden sunulur. Derlemede Google Fonts bağlantısı gerekmez.

## 2. Gerçek bilgiler
.env.example dosyasını .env.local olarak kopyalayın:
- NEXT_PUBLIC_SITE_URL: gerçek HTTPS alan adı, sonuna yol eklemeyin.
- NEXT_PUBLIC_CONTACT_EMAIL veya NEXT_PUBLIC_WHATSAPP_NUMBER: en az bir doğrulanmış iletişim kanalı. WhatsApp için ülke kodu ve yalnızca rakam.
- NEXT_PUBLIC_PHONE: yayınlanacak gerçek telefon (isteğe bağlı).
- NEXT_PUBLIC_OFFICE_ADDRESS / NEXT_PUBLIC_CITY: varsa gerçek çalışma lokasyonu.
- NEXT_PUBLIC_INSTAGRAM_URL / NEXT_PUBLIC_LINKEDIN_URL: gerçek HTTPS profil bağlantıları.
- NEXT_PUBLIC_BOOKING_URL: gerçek randevu takvimi. Boşsa iletişim üzerinden planlama gösterilir. Sağlayıcı embed'i engelliyorsa ayrı sayfada aç bağlantısı kullanılabilir.
- NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: Search Console kodu.
- NEXT_PUBLIC_ALLOW_INDEXING: gerçek yayında true; önizlemede false.

İletişim formu sayfada mesaj üretir. Son adımda WhatsApp/e-posta açılması paylaşım anlamına gelir; gönderim kullanıcı tarafından tamamlanır. Otomatik kayıt veya e-posta gönderimi yapılmaz. Yanlış bir gerçek numara yayınlamamak için kanal bağlantısını yayından önce elinizdeki gerçek bilgilerle kontrol edin.

## 3. İçerik yönetimi
lib/recipes.ts içindeki Recipe modeli kullanılır. Mevcut 5 tarifin kalori/protein/karbonhidrat/yağ/lif ve süre bilgileri korunmuştur. Besin değerleri yaklaşık olarak gösterilir. Kaynakta olmayan besin değeri alanını boş bırakın; sıfırla doldurmayın. Yeni kategoriler veri üzerinden otomatik görünür. Tarif görselini public/images/recipes içine ekleyin; image ve imageAlt tanımlayın.

Kremalı Ispanaklı Somon: 2 porsiyon; 10 dk hazırlık, 15–20 dk pişirme, 25–30 dk toplam; orta zorluk; bir porsiyonda yaklaşık 510 kcal, 7 g karbonhidrat, 35 g protein, 38 g yağ, 2 g lif. Bu değerler değişmedi. Mevcut sayısal mikro besinler korundu; promptta belirtilen diğer mikro besin adları sayısal değer uydurulmadan eklendi.

Pankek ve bulgurda buğday/gluten alerjeni tamamlandı. Tariflerin asıl PDF dosyaları mevcut klasörde bulunmadığından dosyalardaki değerler bağımsız PDF karşılaştırmasıyla doğrulanmadı. İçerik sahibi yayın öncesi kaynaklarını ve porsiyon hesaplarını son kez kontrol etmelidir.

## 4. Sayfalar ve SEO
Ana sayfa, hakkımda, online danışmanlık (/vip-diyet), hesaplayıcılar, tarif kütüphanesi, 5 tarif detayı, iletişim, randevu, gizlilik, kişisel veriler ve kullanım koşulları.

Her içerik sayfasında title, açıklama, canonical ve Open Graph/Twitter bilgileri bulunur. Tariflerde Recipe JSON-LD; ana sayfada Person/WebSite/ProfessionalService vardır. Sahte puan veya yorum yoktur. Süre aralıkları JSON-LD'de üst sınırlarıyla yaklaşık süreye çevrilir; görünen tarifte aralık korunur.

Yeni tarifler sitemap'e otomatik eklenir. Yeni bağımsız sayfa eklenirse app/sitemap.ts kapsamını güncelleyin. Önizlemede robots indekslemeyi kapatır ve sitemap boş döner. Gerçek HTTPS alan adıyla allowIndexing açıldıktan sonra Search Console'a /sitemap.xml gönderin.

Eski /online-diyet, /calculators, /recipes, /contact, /about, /privacy yolları kalıcı 308 yönlendirmeleriyle korunur. Kullanıcının yeni proje dosyaları mevcut olmayan eski klinik rehber/admin rotalarını içermiyordu; bu sürümün kapsamı yeni projenin rotalarıdır.

## 5. Kontrol ve yayın
npm ci, npm run typecheck, npm run lint, npm test, npm run build.
Ardından npm start ve npm run check:site.
Gerçek ayarlar doldurulduğunda npm run check:release.

Node.js barındırmada build ve start komutlarını kullanın. Platforma özgü alan adı, HTTPS ve ortam değişkenlerini yapılandırın. Dosya sunumu için public/ klasörü gerekir. Public ortam değişkenleri derlemeye gömüldüğünden değişiklik sonrası yeniden build zorunludur.

## 6. Yayından önce
- Gerçek iletişim ve alan adını doğrulayın.
- Logo/fotoğrafların kullanım izinlerini teyit edin.
- Tariflerin değerleri ve sağlık metinleri için diyetisyenin son incelemesini alın.
- Danışmanlığa özgü veri sorumlusu kimliği, iletişim, veri amaçları, hukuki sebepler, alıcılar ve saklama koşullarını gerçek işletme işleyişine göre tamamlayın. /kvkk sayfası genel bilgidir; hizmet aydınlatmasının yerine geçmez.
- Gerçek takvim verilirse embed ve harici takvim akışını sağlayıcı hesabıyla test edin.
- Gerçek WhatsApp/e-posta alıcısını doğrulayın; yerel testlerde mesaj gönderilmemiştir.

Resmi teknik kaynak: https://nextjs.org/support-policy
KVKK bilgi kaynağı: https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-
