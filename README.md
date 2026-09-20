# Utku Karakoç Diyetisyen
Mevcut marka varlıkları ve beş tarif korunarak geliştirilen Next.js vitrin ve beslenme içerik sitesi.

## Çalıştırma
Node.js 22.17+ ve npm kullanın.

~~~sh
npm ci
npm run dev
~~~

http://localhost:3000

Üretim:
~~~sh
npm run build
npm start
~~~

## İçerik ve ayarlar
- Marka: public/brand/uk-logo.webp, uk-mark.webp
- Görseller: public/images/; mevcut WebP dosyaları değiştirilmedi.
- Tarifler: lib/recipes.ts. Yeni tarif eklemek için bu dosyaya aynı modele uygun veri ekleyin.
- Ortak iletişim ve alan adı: lib/site-config.ts, .env.local
- Hesaplama kuralları: lib/calculations.ts
- Tasarım: app/globals.css, tailwind.config.ts
- SEO: lib/seo.ts, app/layout.tsx, app/sitemap.ts, app/robots.ts
- Testler: scripts/

.env.example dosyasını .env.local olarak kopyalayın ve gerçek bilgileri girin. Boş iletişim/sosyal alanları sitede gösterilmez. Yalnızca gerçek bir HTTPS alan adıyla yayında NEXT_PUBLIC_ALLOW_INDEXING=true kullanın. Ortam değişkenlerini değiştirdiğinizde yeniden build alın.

## Kontroller
~~~sh
npm run typecheck
npm run lint
npm test
npm run build
~~~

Ayrı terminalde npm start çalışırken:
~~~sh
npm run check:site
npm run check:release
~~~

check:release alan adı/iletişim/indeksleme bilgileri eksikse bilerek hata verir. check:site üretim sunucusunun 3000 portunda çalışmasını bekler; farklı adres için CHECK_SITE_URL tanımlayın.

## Yayın
Bu sürümde üyelik, ödeme veya yönetim veritabanı yoktur. İletişim formu tarayıcıda mesaj hazırlar; gerçek kanal tanımlıysa WhatsApp veya e-posta bağlantısı sunar. Gerçek kanal yoksa yalnızca kopyalama yapılır. Randevu sağlayıcısı isteğe bağlıdır ve kullanıcı takvimi açtığında yüklenir.

Barındırma hesabına dağıtım yapılmadı. Gerçek alan adı, iletişim bilgileri, mesleki içerik onayı ve hizmete özgü veri aydınlatması tamamlanmalıdır. Ayrıntılar: KURULUM-VE-SEO.md ve TESLIM-RAPORU.md.

## E-posta formu
Görüşme formu `/api/contact` rotasını kullanır. Alıcı adresi `CONTACT_TO_EMAIL` ile tanımlanır. Sunucudan otomatik e-posta göndermek için barındırma ortamına ayrıca:

```env
RESEND_API_KEY="..."
CONTACT_FROM_EMAIL="Web Sitesi <noreply@alanadiniz.com>"
```

değerlerini ekleyin. `CONTACT_FROM_EMAIL` kullanılan e-posta servisinde doğrulanmış bir alan adına ait olmalıdır. Bu değerler yoksa form, e-posta uygulaması ve WhatsApp için güvenli gönderim yedeği sunar.

## v9.2 iletişim ayarları

Projede varsayılan iletişim bilgileri şu şekilde yapılandırılmıştır:

- Telefon: `0554 206 21 26`
- WhatsApp: `905542062126`
- E-posta: `Dyt.utkukarakoc@outlook.com`
- Instagram: `https://www.instagram.com/dyt.utkukarakoc/`
- Web formu hedefi: `semihcanbaz431043@gmail.com`

Web formunun sunucudan otomatik e-posta göndermesi için `.env.local` içinde `RESEND_API_KEY` ve doğrulanmış bir `CONTACT_FROM_EMAIL` tanımlanmalıdır. Bu bilgiler yoksa form mesajı kaybetmez; hedef adresi içeren e-posta bağlantısı üretir ve WhatsApp alternatifini gösterir.
