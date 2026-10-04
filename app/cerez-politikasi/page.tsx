import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Çerez Politikası",
  "Web sitesinde kullanılan zorunlu oturum çerezleri ve tarayıcı tercihleri hakkında bilgi.",
  "/cerez-politikasi",
);
export default function Cookies() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">TARAYICI VE OTURUM</p>
        <h1>Çerez politikası.</h1>
        <p className="intro">
          Oturumunuz için gerekli olanlar, açıkça anlatılmış haliyle.
        </p>
      </div>
      <article className="container prose-content">
        <p>Son güncelleme: 3 Ekim 2026</p>
        <h2>Çerez nedir?</h2>
        <p>
          Çerez, tarayıcınızın siteyle sonraki isteklerde paylaşabildiği küçük
          bir kayıttır. Kimlik doğrulama sırasında oturumunuzu tanımak için
          kullanılabilir.
        </p>
        <h2>Bu sitedeki kullanım</h2>
        <p>
          Genel sayfalarda reklam veya analitik takip çerezi kullanılmaz.
          Danışan veya yönetici girişi etkinleştirildiğinde Supabase oturum
          çerezleri (sb-…-auth-token ve gerektiğinde parçaları; giriş
          doğrulamasında sb-…-code-verifier) kullanılır. Bunların amacı güvenli
          oturumunuzu sürdürmektir; reklam profili oluşturulmaz.
        </p>
        <p>
          Oturum çerezlerinin geçerliliği kimlik hizmetinin oturum ayarlarına ve
          yenilemeye bağlıdır; tarayıcıda daha uzun süre saklanmaları oturumun
          sınırsız geçerli olduğu anlamına gelmez. Güvenli çıkış oturumunuzu
          sonlandırır. Tarayıcınızdan çerezleri silebilir veya
          engelleyebilirsiniz; engelleme panel girişinin çalışmasını
          etkileyebilir.
        </p>
        <h2>Harici hizmetler</h2>
        <p>
          WhatsApp, Instagram veya harici randevu takvimini açtığınızda ilgili
          hizmet kendi çerezlerini kullanabilir. Bu hizmetler, ilgili bağlantı
          seçilmeden site içine takip kodu olarak yüklenmez.
        </p>
        <h2>Tercihleriniz</h2>
        <p>
          Bu sürümde isteğe bağlı izleme bulunmadığından pazarlama çerezi kabul
          penceresi gösterilmez. Böyle bir hizmet eklenirse kullanım ve tercih
          yöntemi buna göre güncellenmelidir.
        </p>
        <p>
          Veri işleme ayrıntıları için{" "}
          <Link href="/gizlilik">gizlilik politikasını</Link> ve{" "}
          <Link href="/kvkk">aydınlatma metnini</Link> okuyabilirsiniz.
        </p>
      </article>
    </>
  );
}
