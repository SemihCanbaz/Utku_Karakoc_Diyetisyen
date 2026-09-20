# Teslim raporu — Utku Karakoç Diyetisyen
20 Eylül 2026

Mevcut proje, kullanıcının eklediği logo, fotoğraflar ve beş tarif korunarak geliştirildi. Çalışan üretim derlemesi yerel önizlemeye alındı. İnternete dağıtım yapılmadı; gerçek alan adı ve iletişim bilgileri henüz verilmedi.

## 1. Değiştirilen dosyalar
- app/page.tsx, app/layout.tsx, app/globals.css: ana sayfa, ortak yapı ve tasarım sistemi.
- app/hakkimda/page.tsx, app/vip-diyet/page.tsx, app/hesaplayicilar/page.tsx, app/iletisim/page.tsx, app/randevu/page.tsx: içerik, sayfa düzenleri, etkileşimler ve metadata.
- app/tarifler/page.tsx, app/tarifler/[slug]/page.tsx: tarif kütüphanesi ve tarif detayları.
- components/layout/header.tsx, footer.tsx: masaüstü ve mobil gezinme.
- components/shared/animated-section.tsx, page-transition.tsx: hareket sistemi.
- components/ui/input.tsx, textarea.tsx: tip tanımı/lint düzeltmeleri; diğer mevcut yardımcı dosyalarda biçim düzenlemeleri.
- lib/recipes.ts: korunan tarif verileri ve genişletilen model.
- package.json, tsconfig.json, next-env.d.ts, tailwind.config.ts: sürüm, araç ve tasarım ayarları. Mevcut PostCSS yapılandırmasının eksik autoprefixer bağımlılığı tamamlandı.
- Kullanıcının mevcut WebP logo ve fotoğrafları değiştirilmedi.

## 2. Yeni dosyalar
- components/shared/brand.tsx, section-heading.tsx, cta.tsx.
- components/recipe/recipe-card.tsx, recipe-library.tsx, recipe-actions.tsx.
- components/calculator/calculator-panel.tsx, components/contact-form.tsx, components/booking-widget.tsx.
- lib/site-config.ts, lib/seo.ts, lib/calculations.ts.
- app/template.tsx, not-found.tsx, error.tsx, loading.tsx, sitemap.ts, robots.ts.
- app/gizlilik/page.tsx, app/kvkk/page.tsx, app/kullanim-kosullari/page.tsx.
- next.config.ts, eslint.config.mjs, package-lock.json, .env.example, .gitignore, .prettierignore.
- scripts/test-calculations.mjs, check-site.mjs, check-release.mjs.
- README.md, KURULUM-VE-SEO.md ve bu rapor.
- public/fonts: Manrope ve Playfair Display değişken yazı tipleri ve SIL Open Font lisansları. Derleme Google Fonts erişimi istemez.

## 3. Ana tasarım değişiklikleri
Krem, koyu yeşil, adaçayı ve ölçülü altın tonlarından oluşan ortak renk sistemi uygulandı. Playfair Display başlıklarla Manrope metinler eşleştirildi. Ana sayfada özgün asimetrik giriş alanı, mevcut yemek görseli, yaklaşım bölümü, hizmetler, hesaplama araçları, tarif seçkisi, danışmanlık adımları, marka alanı, sık sorulan sorular ve görüşme çağrısı yer alır.

Hakkımda ve danışmanlık sayfaları aynı görsel dilde tamamlandı. Gerçek olmayan telefon, adres, çalışma süresi, danışan sayısı, başarı iddiası ve yorum kullanılmadı. Marka logosu header, footer ve hakkımda alanlarında kullanıldı.

## 4. Tarif sistemi
Beş mevcut tarif, görselleri ve sayısal besin değerleri korundu. Arama Türkçe büyük/küçük harfe duyarlılığı gözetir; tarif adı ve malzemeler aranabilir. Kategoriler gerçek tarif verisinden oluşur. Sonuç sayısı, boş sonuç açıklaması ve filtre sıfırlama eklendi.

Detaylarda porsiyon, hazırlık/pişirme/toplam süre, zorluk, işaretlenebilir malzemeler, adımlar, yaklaşık besin değerleri, alerjenler, öneriler ve ilgili tarifler bulunur. Yazdırma görünümü ve bağlantı kopyalama eklendi. Eksik besin değerleri sahte sıfır olarak gösterilmez.

Pankek ve bulgur tariflerinde buğday/gluten alerjeni tamamlandı. Meyve içeren pankekte “Şekersiz” ifadesi “İlave şeker yok” olarak düzeltildi. Somonun 510 kcal, 35 g protein, 7 g karbonhidrat, 38 g yağ, 2 g lif değerleri ve süreleri korunmuştur. Kaynak PDF dosyaları mevcut projede bulunmadığından PDF ile bağımsız karşılaştırma yapılamadı.

## 5. Hesaplayıcı
BMR için Mifflin–St Jeor, günlük enerji için aktivite katsayıları, BMI, kaba su referansı ve ayarlanabilir makro dağılımı aynı panelde sunulur. Yaş, boy, kilo, cinsiyet ve hareket için doğrulama ve açık hata mesajları vardır.

Protein/yağ oranları ayarlanabilir; karbonhidrat kalan yüzdeden hesaplanır. Gram karşılıkları 4/4/9 kcal üzerinden hesaplanır. Değer değiştirildiğinde eski sonuç için yeniden hesaplama uyarısı gösterilir. Hesaplar tarayıcıda yapılır, veri kaydedilmez.

Araç kişisel diyet listesi veya tanı üretmez. 18 yaş altına hesap yapmaz; 18–19 yaşta yetişkin BMI sınıflaması sunmaz. Enerji değişimi senaryoları sınırlanmıştır. Su değeri 30 ml/kg kaba referans olarak açıkça etiketlenmiştir. Metot açıklamaları ve birincil kaynak bağlantıları sayfada bulunur.

## 6. Responsive iyileştirmeler
Ana sayfa, tarif listesi/detayı, hesaplayıcı, iletişim, randevu, hakkımda ve danışmanlık sayfaları 375, 390, 430, 768, 1024, 1280, 1440 ve 1920 piksel genişliklerde yatay taşma açısından kontrol edildi; taşma gözlenmedi. Mobil ve masaüstü ekran görüntüleri ayrıca incelendi.

Kartlar, iki sütunlu içerikler, form alanları ve CTA'lar küçük ekranlarda yeniden sıralanır. Mobil menü tam ekran dialog kullanır; arka plan kaydırması kilitlenir, Escape ile kapanır ve odak açma düğmesine döner.

## 7. Animasyon sistemi
Sayfa girişleri, bölüm görünmeleri, kart hareketleri, görsel yakınlaşması, aktif menü vurgusu ve kaydırma ilerleme çizgisi birleştirildi. Hareketler kısa, düşük mesafeli ve içeriğin önüne geçmeyecek biçimde ayarlandı. İlk HTML içeriği görünürdür; JavaScript bekleyen boş ekran oluşturulmaz.

prefers-reduced-motion için CSS ve bileşen seviyesinde azaltılmış hareket desteği vardır. Bu tercih kod üzerinden kontrol edildi; işletim sistemi tercihiyle ayrı bir tarayıcı emülasyonu yapılmadı.

## 8. SEO
15 içerik sayfasında tek H1, başlık, açıklama ve canonical kontrol edildi. Open Graph/Twitter bilgileri eklendi. Ana sayfada Person/WebSite/ProfessionalService, beş tarifte Recipe JSON-LD bulunur; JSON ayrıştırma testleri geçti.

Sitemap ve robots gerçek yayın ayarına bağlıdır. Önizleme varsayılanı noindex'tir. Eski İngilizce yollar ve /online-diyet için 308 yönlendirmeleri tanımlandı. Bulunmayan sayfa ve tarifler HTTP 404 döndürür.

## 9. Erişilebilirlik
Ana içeriğe atlama bağlantısı, semantik başlıklar, form etiketleri, aria-invalid/açıklama bağlantıları, ilk hatalı alana odak, mobil dialog odağı, klavye ile çalışan doğal details alanları ve görünür odak stilleri eklendi. Görsellerin açıklamaları ve dekoratif öğelerin davranışları düzenlendi. Menü açma/kapatma, Escape, malzeme kutucuğu ve FAQ akışları tarayıcıda kontrol edildi.

Bu kontroller tam bir bağımsız WCAG sertifikasyonu veya tüm ekran okuyucu kombinasyonları için uygunluk iddiası değildir.

## 10. Build / lint / typecheck ve testler
| Kontrol | Sonuç |
| --- | --- |
| npm run build | Başarılı; üretim derlemesi ve 19 statik çıktı |
| npm run lint | Başarılı; hata yok |
| npm run typecheck | Başarılı; hata yok |
| npm test | Bilinen formüller, doğrulama ve 432 sınır senaryosu geçti |
| npm run check:site | 15 içerik sayfası, 16 iç bağlantı, 9 görsel, 6 JSON-LD bloğu geçti |
| 404 / kalıcı yönlendirme / optimize görsel | Beklenen HTTP yanıtları doğrulandı |
| Tarayıcı konsolu | Kontrol edilen akışlarda error/warn görülmedi |
| npm run check:release | Gerçek alan adı, indeksleme ve iletişim eksiklerini beklenildiği gibi bildirdi |

Node 22'nin TypeScript strip-types test çalıştırıcısı deneysel özellik/modül türü uyarısı üretir; bunlar test başarısızlığı değildir. Son bağımlılık kurulumunda npm 0 güvenlik açığı bildirdi.

Tarayıcıda tarif filtreleri, arama/boş sonuç, malzeme kutucuğu, boş/hatalı hesaplayıcı, doğru sonuçlar, makro güncellemesi, form hata kontrolü, mesaj hazırlama ve alan değişince mesajın temizlenmesi test edildi. Fiziksel yazıcı/PDF çıktısı ve henüz tanımlanmamış harici takvim/e-posta/WhatsApp sağlayıcısı uçtan uca test edilmedi.

## 11. Kalan gerçek bilgi alanları
- Gerçek alan adı, telefon, e-posta veya WhatsApp numarası.
- Kullanılacaksa gerçek adres/şehir ve sosyal profiller.
- Kullanılacaksa gerçek randevu sağlayıcısı bağlantısı.
- Doğrulanmış biyografi, eğitim ve mesleki ayrıntılar; bunlar uydurulmadı.
- İşletmeye ve danışmanlık sürecine özgü veri aydınlatması.

Boş iletişim ve sosyal alanları gizlenir. Gerçek kanal tanımlı değilken iletişim formu yalnızca mesaj hazırlar/kopyalar ve talebin iletilmediğini açıklar. Form sahte gönderildi mesajı vermez. Randevu akışı onaylanmış randevu oluşturduğunu iddia etmez.

Kullanıcının sağladığı güncel proje yönetim paneli/veritabanı içermiyordu. Bu teslim vitrin, tarif, hesaplayıcı ve iletişim/randevu arayüzlerini kapsar; danışan kayıtları, diyet listeleri, üyelik ve ödeme altyapısı bu sürümde yoktur.

## 12. Canlı yayına geçiş
1. .env.example dosyasını .env.local olarak kopyalayın; gerçek HTTPS alan adını ve en az bir iletişim kanalını girin.
2. Kullanılacak gerçek sosyal bağlantıları, adresi ve takvimi tamamlayın.
3. Tarif kaynaklarını, besin değerlerini, mesleki içerikleri ve görsel kullanım haklarını içerik sahibiyle doğrulayın.
4. İşletmenin gerçek veri işleme koşullarına göre hizmet aydınlatmasını tamamlayın.
5. Gerçek yayında NEXT_PUBLIC_ALLOW_INDEXING=true ayarlayın; npm run check:release çalıştırın.
6. npm run build ile yeniden derleyin. Node barındırmada npm start kullanın; HTTPS ve ortam değişkenlerini yapılandırın.
7. Canlı alan adı üzerinde iletişim/takvim alıcısını ve bağlantıları kontrol edin; sitemap'i Search Console'a gönderin.

OneDrive klasöründe yeniden build sırasında .next kilidi oluşursa önizleme sunucusunu durdurun. Yalnızca proje içindeki üretilmiş .next klasörünü temizleyip tekrar build alın; kaynak veya public dosyalarını silmeyin. Güncel teslim bu temiz derlemeyle başarıyla oluşturuldu.
