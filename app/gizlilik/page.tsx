import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Gizlilik ve Veri Kullanımı",
  "Bu web sitesindeki formlar, hesaplayıcılar, harici bağlantılar ve veri kullanımı hakkında açıklamalar.",
  "/gizlilik",
);
export default function Privacy() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">ŞEFFAF VE ANLAŞILIR</p>
        <h1>Gizlilik ve veri kullanımı.</h1>
        <p className="intro">
          Bu sayfa, web sitesindeki araçların bilgilerinizi nasıl kullandığını
          açıklar.
        </p>
      </div>
      <article className="container prose-content">
        <h2>Formlar ve hesaplamalar</h2>
        <p>
          Hesaplayıcıya yazdığınız yaş, boy ve kilo tarayıcınızda işlenir.
          Hesaplama sonuçları sunucuya gönderilmez ve site tarafından kalıcı
          olarak saklanmaz. Tarif aramaları ve işaretlediğiniz malzemeler de
          yalnızca açık sayfanızda tutulur.
        </p>
        <p>
          İletişim formu adınız, seçtiğiniz konu ve yazdığınız notla bir mesaj
          hazırlar. Site sunucusunda görüşme kaydı açılmaz. Mesajı WhatsApp veya
          e-posta uygulamasında açmayı seçerseniz, veriler o hizmetin koşulları
          kapsamında işlenir. Gönderimi ilgili uygulamada siz tamamlarsınız.
        </p>
        <h2>Çerezler ve harici hizmetler</h2>
        <p>
          Bu sürüm reklam veya analitik izleme kodu kullanmaz. Site fontları ve
          görselleri site üzerinden sunulur. Randevu takvimi yalnızca takvimi
          açmayı seçmeniz halinde yüklenir. Harici takvim, sosyal medya ve
          mesajlaşma hizmetlerinin kendi gizlilik koşulları geçerlidir.
        </p>
        <h2>Teknik erişim kayıtları</h2>
        <p>
          Sayfalara erişirken IP adresi, istek zamanı ve tarayıcı bilgisi gibi
          teknik bilgiler barındırma hizmetinin erişim veya güvenlik
          kayıtlarında işlenebilir. Bunlar form içeriği değildir. Canlı hizmette
          uygulanacak kayıt ve saklama koşulları barındırma yapılandırmasına
          bağlıdır.
        </p>
        <h2>Sağlık bilgileri</h2>
        <p>
          İlk iletişim formuna tahlil, tanı, ilaç bilgisi veya ayrıntılı sağlık
          geçmişi yazmayın. Danışmanlık için gerekli bilgiler ve paylaşım
          yöntemi görüşme sürecinde ayrıca ele alınır.
        </p>
        <h2>İletişim</h2>
        <p>
          Veri kullanımına ilişkin sorularınız için{" "}
          <Link href="/iletisim">iletişim sayfasındaki</Link> yayınlanmış
          kanalları kullanabilirsiniz. Kişisel verilere ilişkin genel bilgi için{" "}
          <Link href="/kvkk">kişisel veriler sayfasını</Link> inceleyin.
        </p>
      </article>
    </>
  );
}
