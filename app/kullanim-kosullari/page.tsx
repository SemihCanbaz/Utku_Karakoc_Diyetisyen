import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Kullanım Koşulları",
  "Beslenme içeriklerinin, tariflerin ve hesaplama araçlarının kullanım kapsamı.",
  "/kullanim-kosullari",
);
export default function Terms() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">KULLANIM KAPSAMI</p>
        <h1>
          Bilgiyi doğru
          <br />
          yerde kullanmak.
        </h1>
      </div>
      <article className="container prose-content">
        <h2>Genel bilgilendirme</h2>
        <p>
          Bu sitedeki beslenme içerikleri, tarifler ve hesaplayıcılar genel
          bilgilendirme amacı taşır. Tanı, tedavi veya kişiye özel tıbbi
          değerlendirme yerine geçmez. Gereksinimleriniz sağlık durumunuza ve
          günlük yaşamınıza göre farklılık gösterebilir.
        </p>
        <h2>Tarifler ve hesaplamalar</h2>
        <p>
          Tariflerdeki besin değerleri yaklaşık değerlerdir; kullanılan ürünler,
          gramaj ve hazırlama yöntemi sonucu etkiler. Alerjileriniz varsa tüm
          malzemeleri ve ürün etiketlerini kontrol edin. Hesaplayıcı sonuçları
          ölçüm değil, açıklanan formüllere dayalı tahminlerdir.
        </p>
        <h2>Görüşme talebi</h2>
        <p>
          Mesaj hazırlamak veya randevu sayfasını ziyaret etmek, danışmanlık
          hizmeti satın alındığı veya randevunun onaylandığı anlamına gelmez.
          Görüşme zamanı, kapsamı ve varsa ücret bilgisi karşılıklı iletişimde
          netleştirilir.
        </p>
        <h2>Harici bağlantılar</h2>
        <p>
          Harici bir bağlantıyı açtığınızda ilgili hizmetin kullanım ve gizlilik
          koşulları geçerlidir. Site içeriklerinin kullanımında kaynak
          gösterilmesi ve hak sahiplerinin izinlerine uyulması gerekir.
        </p>
      </article>
    </>
  );
}
