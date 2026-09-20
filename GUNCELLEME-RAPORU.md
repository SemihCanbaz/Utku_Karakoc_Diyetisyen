# İletişim, danışmanlık ve beslenme rehberi güncellemesi
20 Eylül 2026

## Tamamlananlar
- Verilen +90 551 427 21 26 numarası .env.local üzerinden telefon ve WhatsApp için bağlandı.
- İletişim formu kullanıcı bilgileriyle mesaj hazırlar; WhatsApp bağlantısı 905514272126 numarasına ve URL kodlaması yapılmış metne yönelir. Kullanıcı WhatsApp'ta Gönder diyerek iletir. Mesajın otomatik gönderildiği veya teslim edildiği iddia edilmez.
- Tüm sayfalarda hızlı iletişim alanı, telefonla arama ve hazır genel bilgi mesajı bulunur. Panel Escape ile, dışarı tıklayarak veya sayfa değişince kapanır.
- E-posta ve Instagram gerçek adresleri verilmediği için gizlidir; .env.local alanları hazırdır. Otomatik e-posta gönderimi için doğrulanmış alıcı, gönderici alan adı ve e-posta servis hesabı gerekir; bu bilgiler olmadan e-posta gönderildiği gösterilmez.
- Online danışmanlık sayfası yeni kapak, hizmet özeti, üç yaşam düzenine göre değişen etkileşimli alan, dört süreç adımı, görüşmeye hazırlık, rehberler ve altı SSS ile genişletildi.
- /beslenme-rehberi ve altı konu sayfası eklendi: diyabet, insülin direnci, IBS, çölyak, reflü, hipertansiyon.
- Her rehberde konuya özel içerik, içindekiler, görüşmeye hazırlık soruları, kurumsal kaynak bağlantısı, kapsam açıklaması ve ilgili rehberler bulunur. Onaylanmamış uzman incelemesi veya yazarlık bilgisi eklenmedi.

## Görseller
Kaynak fotoğraflar değişmedi. Ana sayfa ve danışmanlık kapaklarında kırpılmış görünümün ihtiyaç duyduğu çözünürlük dikkate alınarak sizes ayarları artırıldı. Kapak/detay fotoğrafları kalite 90, tarif kartları 85 ile sunulur; izin verilen kalite değerleri Next yapılandırmasında tanımlıdır. Küçük marka görselleri ikinci kayıplı sıkıştırma olmadan orijinal dosyadan sunulur. Logo boyut tanımları gerçek 480/240 piksele düzeltildi.

Kaynakların kendi çözünürlüğü (fotoğraflarda 1200–1600 piksel genişlik) nihai ayrıntı sınırıdır. Yapay büyütme veya gerçekte bulunmayan ayrıntı üretimi yapılmadı. Retina ekranlarda daha yüksek ayrıntı için özgün yüksek çözünürlüklü dosyalar kullanılabilir.

## SEO ve bağlantılar
Yeni sayfalara özgün title, description, canonical ve sosyal paylaşım metinleri eklendi. Rehberlerde MedicalWebPage ve BreadcrumbList; rehber merkezinde CollectionPage/ItemList; danışmanlıkta Service yapılandırılmış verisi bulunur. Menü, footer, ana sayfa, danışmanlık ve ilgili yazılar üzerinden iç bağlantılar kuruldu. Rehberler canlı sitemap kapsamına eklendi.

Arama sıralaması garanti edilmez. Gerçek alan adı verilene kadar önizleme noindex kalır. Yayın öncesinde sağlık içeriklerinin diyetisyen tarafından gözden geçirilmesi gerekir.

## Kontroller
Üretim derlemesi, lint ve TypeScript kontrolü başarılı. Otomatik HTTP/HTML taraması: 22 içerik sayfası, 23 iç bağlantı, 14 görsel URL'si ve 14 JSON-LD bloğu geçti. Bulunmayan sayfa/tarif/rehber 404 döndürür.

Yeni sayfalar ve ana sayfa/iletişim 375, 390, 768, 1100, 1280 ve 1440 piksel genişliklerde taşma açısından test edildi. Etkileşimli danışmanlık seçenekleri, WhatsApp formunun alıcı ve mesaj üretimi, mobil hızlı iletişim görünümü kontrol edildi. Test mesajı dışarı gönderilmedi; numaranın WhatsApp hesabının varlığı veya alıcıda teslimat doğrulanmadı.

## Yeni ve değişen dosyalar
Yeni: lib/guides.ts, components/guides/guide-card.tsx, components/consultation-explorer.tsx, components/quick-contact.tsx, app/beslenme-rehberi/page.tsx, app/beslenme-rehberi/[slug]/page.tsx, .env.local, bu rapor.

Güncellenen: app/vip-diyet/page.tsx, app/page.tsx, app/layout.tsx, app/globals.css, app/sitemap.ts, app/tarifler/page.tsx, app/tarifler/[slug]/page.tsx, components/recipe/recipe-card.tsx, components/shared/brand.tsx, components/layout/footer.tsx, lib/site-config.ts, next.config.ts, scripts/check-site.mjs.

## İçerik kaynakları
- NIDDK: https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes
- NIDDK: https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance
- NIDDK: https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/eating-diet-nutrition
- NIDDK: https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition
- NIDDK: https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/eating-diet-nutrition
- NHLBI: https://www.nhlbi.nih.gov/health/dash-eating-plan

## Canlı yayın için kalanlar
Gerçek HTTPS alan adı ve NEXT_PUBLIC_ALLOW_INDEXING=true. İsteğe bağlı gerçek Instagram, e-posta ve takvim adresleri. Mesleki içerik son incelemesi ve işletmeye özgü veri aydınlatması. Barındırma hesabına dağıtım yapılmadı. Ortam değişiklikleri sonrası yeniden build gerekir.

Bu belge önceki TESLIM-RAPORU.md belgesinin iletişim eksikleri ve sayfa sayılarıyla ilgili eski durumunu günceller.

---

# 20 Eylül 2026 – Makale, danışmanlık, ücretsiz araçlar ve e-posta geliştirmesi

## Yeni içerik mimarisi
- `/makaleler` ve `/makaleler/[slug]` eklendi. Kullanıcı tarafından sağlanan 7 bilimsel içerik web makalesine dönüştürüldü: ev yoğurdu vs market yoğurdu, aralıklı oruç, GDO/tavuk/yumurta, yumurta üretim kodları, detoks diyetleri, aç karnına spor ve peynir tüketimi.
- Makale sayfalarında içindekiler, bölüm numaraları, kaynakça, genel bilgilendirme kapsamı ve Article/Breadcrumb yapılandırılmış verileri bulunur.
- Kaynak belgelerde eksik bibliyografik bilgi bulunan alanlar tahmin edilerek tamamlanmadı.

## Danışmanlık sayfaları
- `/danismanlik` ve 12 ayrı danışmanlık alanı sayfası eklendi.
- Kilo verme, kilo alma, sporcu beslenmesi, PCOS, insülin direnci, diyabet, böbrek hastalıkları, kalp-damar sağlığı, gebelik, çocuk/ergen, kurumsal ve online danışmanlık alanları ayrı SEO sayfalarıdır.
- Klinik sayfalarda tanı/tedavi iddiası kullanılmadı; gerekli yerlerde hekim takibi ve bireysel değerlendirme uyarıları görünür tutuldu.

## Ücretsiz araçlar
- `/hesaplayicilar` dizini 7 araçla genişletildi.
- Ayrı SEO sayfaları eklendi: BMI, günlük kalori ihtiyacı, BMR, makro besin, su ihtiyacı, referans ağırlık ve bel/boy oranı.
- Mevcut birleşik hesaplayıcı korunarak ayrıca tek araç odaklı sayfalar oluşturuldu.
- Yeni formüller için test senaryoları eklendi.

## Ana sayfa
- Danışmanlık alanları ayrı sayfalara bağlandı.
- 7 ücretsiz araç doğrudan görünür hale getirildi.
- "Son Makaleler" bölümü eklendi.
- Mevcut tarif, rehber, süreç ve iletişim bölümleri korunarak içerik mimarisi genişletildi.

## Görsel ve ikon sistemi
- Lucide ikonları danışmanlık alanlarına göre farklılaştırıldı.
- Makale, danışmanlık ve araç girişlerinde kullanılan hafif botanik çizgi SVG'si eklendi (`public/brand/botanical-line.svg`).
- Hover ve kart geçişleri mevcut animasyon diliyle uyumlu biçimde genişletildi.

## İletişim ve e-posta
- Görüşme formu artık `/api/contact` sunucu rotasına gönderim yapar.
- Alıcı adresi server-only `CONTACT_TO_EMAIL` değişkeni ile tanımlandı ve istenen Gmail adresine bağlandı.
- Gmail adresi `NEXT_PUBLIC_CONTACT_EMAIL` üzerinden herkese açık site içeriğinde yayınlanmaz.
- Otomatik sunucu e-postası için `RESEND_API_KEY` ve doğrulanmış `CONTACT_FROM_EMAIL` gerekir. Bu iki değer yoksa sistem hazırlanan e-postayı kullanıcıya `mailto:` ile açar ve mevcut WhatsApp yedeğini korur. Yanlış biçimde "mesaj gönderildi" iddiası gösterilmez.
- Basit bot azaltma amacıyla honeypot alanı eklendi.

## SEO
- Yeni makaleler, danışmanlık sayfaları ve hesaplama araçları sitemap kapsamına eklendi.
- Makale sayfalarında Article JSON-LD; danışmanlık sayfalarında Service JSON-LD kullanılır.
- Üst menü sadeleştirilerek Danışmanlık, Tarifler, Makaleler ve Araçlar doğrudan erişilebilir hale getirildi.

## Kontroller
- TypeScript: PASS
- ESLint: PASS (0 error, 0 warning)
- Hesaplama testleri: PASS (mevcut 432 sınır senaryosu + yeni araç doğrulamaları)
- İçerik veri kontrolü: PASS (7 makale, 12 hizmet, 7 araç, 5 tarif, 6 rehber, benzersiz slug ve görsel kontrolleri)
- Production build bu Linux çalışma ortamında kod hatası nedeniyle değil, ZIP içindeki `node_modules` Windows SWC paketi içerdiği ve ortamda internet erişimi olmadığı için Linux `@next/swc-*` paketi indirilemediğinden tamamlanamadı. Temiz hedef ortamda `npm ci && npm run build` ile doğrulanmalıdır.
- `check:release`, beklendiği gibi gerçek HTTPS alan adı ve canlı indeksleme açılmadığı için yayını engellemeye devam eder.

## v9.2.0 — İletişim, tarif kütüphanesi ve araç deneyimi

- Telefon: 0554 206 21 26
- WhatsApp: 905542062126
- Genel iletişim e-postası: Dyt.utkukarakoc@outlook.com
- Instagram: https://www.instagram.com/dyt.utkukarakoc/
- Web formu alıcı adresi: semihcanbaz431043@gmail.com
- 10 yeni tarif ve bu tariflere ait optimize WebP görseller eklendi; toplam tarif sayısı 15 oldu.
- Araç kartlarında yeni ikon sistemi, yumuşak hover/focus geçişleri ve stagger section reveal eklendi.
- Birleşik hesaplayıcı ile tekil araç sonuç ekranlarına Framer Motion tabanlı, reduced-motion uyumlu sonuç geçişleri eklendi.
- Sayfa giriş animasyonu daha yumuşak hale getirildi ve prefers-reduced-motion davranışı güçlendirildi.
