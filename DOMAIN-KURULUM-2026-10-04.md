# utkukarakoc.com.tr alan adı bağlantısı

4 Ekim 2026: Alan adı Turkticaret.net üzerinde. Yetkili DNS sunucuları ns1/ns2/ns3.turkticaret.net. A ve www kayıtları güncellendi, Resend'in üç doğrulama/gönderim kaydı eklendi. Vercel iki alan için Valid Configuration gösteriyor. Yetkili ns1 sunucusu yeni kayıtları döndürüyor. Vercel IP'sine alan adı ve normal TLS sertifika doğrulamasıyla yapılan HTTPS kontrolü kök adres için 200, www için kök adrese 308 döndü. Yerel DNS önbelleği hâlâ eski 31.186.11.254 adresini döndürdüğünden tarayıcıda açılış doğrulanamadı. DNS yayılımı sürüyor.

## Turkticaret DNS kayıtları

Kayıt adları `utkukarakoc.com.tr` DNS bölgesine göre yazılmıştır. Panel tam alan adı istiyorsa sonuna `.utkukarakoc.com.tr` ekleyin. Kök alan için panelin kullandığı `@`/boş alan biçimini izleyin. TTL varsayılan olabilir. Aynı isimde mevcut kayıt varsa önce kontrol edin; ilgisiz MX/TXT kayıtlarını koruyun.

| Amaç | Tür | Ad | Değer |
| --- | --- | --- | --- |
| Web sitesi | A | @ | 216.198.79.1 |
| www yönlendirmesi | CNAME | www | 8d3598205837854b.vercel-dns-017.com. |
| E-posta doğrulama | TXT | resend._domainkey.mail | Aşağıdaki DKIM değeri |
| E-posta gönderim | CNAME | rsend.mail | rsend-euw1.forge.rmta.net |
| E-posta gönderim | CNAME | send.mail | send.forge.rmta.net |

DKIM değeri (açık DNS anahtarıdır; gizli API anahtarı değildir):

```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKlN8YVjGBwbXFkqVOLBdnTm19fYc1abKMy2l3UWNvhsJQ8Z1efnzO8G1jVNr/wyMpMkppzs9xSU/BAFRkEXl6Yy4xMGiqCsqNIh6xs6kAlX8z3z3jk/hqCQnEDjjJ7ZoJcQHJ7lm6D04Ru5U5sEDxo4B5sg5VX1kauoba+t5KgQIDAQAB
```

Değerler doğrudan proje panellerinden alındı. Resend gönderim bölgesi Ireland (eu-west-1). Receiving etkinleştirilmedi. Resend'in isteğe bağlı kök DMARC önerisi, mevcut politika incelenmeden uygulanmamalı.

## Sonraki adımlar ve durum

1. Vercel alan adı ekranında iki alan için Valid Configuration ve hedef IP üzerinde HTTPS kontrolü tamamlandı. Normal DNS kullanan tarayıcı kontrolü yayılım sonrasında tekrarlanmalı.
2. Resend alan adı ekranında DNS doğrulama başlatıldı, son durum pending. Alan: `mail.utkukarakoc.com.tr`.
3. Resend gönderim anahtarını sunucu ortamına ve Supabase custom SMTP ayarlarına bağlama. Anahtar Git'e veya rapora yazılmaz. Şifre sıfırlama bağlantıları için e-posta tıklama takibi kapatılmalı.
4. Vercel production `NEXT_PUBLIC_SITE_URL` değeri `https://utkukarakoc.com.tr` olarak kaydedildi. Bu değişken `lib/site-config.ts` ve parola sıfırlama işleminde kullanılıyor; yeni derleme gerekir. Mevcut eski sürümün yeniden yayını otomatik onay denetimince reddedildi (yeni admin panelini içermeyen kaynak riski). Yeniden yayın gerçekleşmedi; güncel çalışma yayımlandığında SEO adresleri uygulanacak.
5. Supabase Site URL değerini yeni adrese geçirme, `/auth/callback`, `/auth/confirm` ve `/sifre-belirle` dönüşlerini izin listesine ekleme. Geçiş sırasında mevcut Vercel dönüş adreslerini koruma.
6. Yeni uygulama sürümünü yayımlama; canonical, sitemap, oturum açma, parola sıfırlama ve iletişim formunu canlı ortamda kontrol etme.

## Paneller

- [Vercel alan adları](https://vercel.com/canbaz1/diyetisyen-utku-karakoc/settings/domains)
- [Resend doğrulama](https://resend.com/domains/add/a202931e-6410-43e8-88ea-ae0534937436)
- [Turkticaret giriş](https://www.turkticaret.net/usermanage/userlogin.php)

Bu dosya kurulum durumunu anlatır; e-posta gönderiminin veya güncel admin sürümünün yayımlandığı anlamına gelmez. DNS kayıtları panelden ve yetkili DNS'ten doğrulandı; küresel yayılımın tamamlandığı iddia edilmez.

SMTP hazırlığı: sunucu `smtp.resend.com`, TLS portu `465`, kullanıcı adı `resend`, parola Resend gönderim API anahtarı. Önerilen gönderici `Diyetisyen Utku Karakoç <bildirim@mail.utkukarakoc.com.tr>`. [Resend SMTP belgeleri](https://resend.com/docs/send-with-smtp). Henüz SMTP etkinleştirilmedi.
