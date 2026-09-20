import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Kişisel Veriler Hakkında",
  "Web sitesi kullanımı ve kişisel verilerin korunması hakkında genel bilgilendirme.",
  "/kvkk",
);
export default function Kvkk() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">KİŞİSEL VERİLER</p>
        <h1>
          Bilgileriniz üzerinde
          <br />
          söz sahibi olun.
        </h1>
        <p className="intro">
          Web sitesi araçları ile danışmanlık sırasında yürütülen veri işleme
          süreçleri farklıdır.
        </p>
      </div>
      <article className="container prose-content">
        <h2>Web sitesinin kapsamı</h2>
        <p>
          Hesaplayıcı verileri ve görüşme formu içeriği bu site üzerinden bir
          veritabanına kaydedilmez. Form, seçiminize göre mesaj hazırlamaya
          yardımcı olur. Teknik erişim kayıtları ve harici hizmetler hakkında{" "}
          <Link href="/gizlilik">gizlilik açıklamasını</Link> okuyabilirsiniz.
        </p>
        <h2>Bilgilendirilme ve başvuru</h2>
        <p>
          Kişisel verilerin işlenmesi hakkında; veri sorumlusunun kimliğini,
          işleme amaçlarını ve hukuki nedenlerini, olası aktarımları ve ilgili
          kişi haklarını öğrenme hakkınız bulunur. Danışmanlık kapsamında veri
          toplanmadan önce, gerçek işleyişe özgü aydınlatma ayrıca sunulmalıdır.
        </p>
        <p>
          Verilerinizin işlenip işlenmediğini öğrenme, bilgi isteme, yanlış
          kayıtların düzeltilmesini ve koşulları oluştuğunda silinmesini talep
          etme gibi haklarınız hakkında Kişisel Verileri Koruma Kurumunun
          açıklamalarını inceleyebilirsiniz.
        </p>
        <h2>Bilgi ve iletişim</h2>
        <p>
          Bu sayfa web sitesi hakkında genel bilgilendirmedir; danışmanlık
          hizmetine özgü aydınlatma metni veya açık rıza beyanı değildir.
          Sorularınız için{" "}
          <Link href="/iletisim">yayınlanmış iletişim kanallarını</Link>{" "}
          kullanabilirsiniz.
        </p>
        <p>
          Resmi kaynak:{" "}
          <a
            href="https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-"
            target="_blank"
            rel="noreferrer"
          >
            Kişisel Verileri Koruma Kurumu — Aydınlatma Yükümlülüğü
          </a>
          .
        </p>
      </article>
    </>
  );
}
