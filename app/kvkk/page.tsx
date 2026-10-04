import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const metadata = pageMetadata(
  "KVKK Aydınlatma Metni",
  "Diyetisyen Utku Karakoç web sitesindeki kişisel veri işleme amaçları, iletişim talepleri ve ilgili kişi hakları.",
  "/kvkk",
);
export default function Kvkk() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">KİŞİSEL VERİLERİN KORUNMASI</p>
        <h1>Aydınlatma metni.</h1>
        <p className="intro">
          Web sitesi üzerinden paylaştığınız bilgiler ve başvuru haklarınız.
        </p>
      </div>
      <article className="container prose-content">
        <p>Son güncelleme: 3 Ekim 2026</p>
        <h2>Veri sorumlusu ve kapsam</h2>
        <p>
          Bu web sitesindeki iletişim talepleri bakımından veri sorumlusu
          Diyetisyen Utku Karakoç’tur. İletişim:{" "}
          <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
          {siteConfig.address ? "; adres: " + siteConfig.address : ""}. Bu metin
          web sitesi iletişim, güvenlik ve erişim süreçlerini açıklar;
          danışmanlık sırasında alınan sağlık verileri için ayrıca hizmete özgü
          aydınlatma sunulur.
        </p>
        <h2>İşlenen bilgiler ve amaçlar</h2>
        <p>
          Adınız, paylaştığınız iletişim bilgisi, görüşme konusu ve mesajınız;
          talebinizi değerlendirmek, sizinle iletişim kurmak ve görüşme
          organizasyonunu yürütmek için kullanılır. Teknik erişim bilgileri site
          güvenliği ve hizmetin çalışması için işlenebilir. Hesaplayıcı
          sonuçları tarayıcınızda kalır.
        </p>
        <h2>Toplama yöntemi ve hukuki sebepler</h2>
        <p>
          Bilgiler web formu, seçtiğiniz e-posta veya mesajlaşma kanalı ve
          teknik erişim kayıtları aracılığıyla elektronik ortamda toplanır.
          Sözleşme kurulmasına veya hizmetin ifasına doğrudan ilişkin talepler
          6698 sayılı Kanun’un 5/2-c maddesi; güvenlik ve hakkın korunması için
          zorunlu işlemler, uygulanabildiği ölçüde 5/2-e ve 5/2-f maddelerindeki
          şartlar kapsamında değerlendirilir. Yasal bir yükümlülüğün yerine
          getirilmesi gerektiğinde ilgili hukuki yükümlülük esas alınır.
        </p>
        <h2>Aktarım ve hizmet sağlayıcılar</h2>
        <p>
          Talebiniz yetkili diyetisyen ve kullanılan barındırma/e-posta hizmet
          sağlayıcılarınca işlenebilir. Aktif sunucu e-postası Resend,
          barındırma Vercel üzerinden sağlanır. Portal etkinleştirildiğinde
          Supabase kimlik doğrulama ve veri saklama için kullanılır. Hizmet
          sağlayıcıların yurt dışı altyapıları nedeniyle aktarım şartlarının
          ayrıca sağlanması gerekir. Danışan portalında gerçek veri
          kullanılmadan önce hizmete özgü alıcı grupları, veri konumu ve
          uygulanacak aktarım mekanizması tamamlanır.
        </p>
        <h2>Saklama ve silme</h2>
        <p>
          Veriler yalnızca talebin sonuçlandırılması, hizmetin yürütülmesi,
          geçerli mevzuatın gerektirdiği saklama ve hakların korunması için
          gereken süre boyunca tutulur. Danışmanlık kayıtları için uygulanacak
          süre ve silme süreci, hizmet başlamadan önce ayrıca bildirilir.
          Yönetim panelinde bir kaydı pasifleştirmek, veriyi silmek anlamına
          gelmez.
        </p>
        <h2>İlgili kişi hakları</h2>
        <p>
          Kanun’un 11. maddesi kapsamında verilerinizin işlenip işlenmediğini
          öğrenme, işlenmişse bilgi isteme, amacı ve amaca uygun kullanımı
          öğrenme, aktarılan üçüncü kişileri bilme, eksik veya yanlış verilerin
          düzeltilmesini isteme, şartları oluştuğunda silme veya yok etme talep
          etme, düzeltme/silme işlemlerinin alıcılara bildirilmesini isteme,
          otomatik analiz sonucuna itiraz etme ve hukuka aykırı işlemeden doğan
          zarar için giderim talep etme haklarınız vardır.
        </p>
        <p>
          Başvurunuzu kimliğinizin doğrulanmasına imkân verecek şekilde
          yayınlanmış iletişim kanallarından iletebilirsiniz. İlk başvuruda
          gereksiz kimlik belgesi veya sağlık kaydı göndermeyin; gerekli
          doğrulama yöntemi sizinle paylaşılır.
        </p>
        <h2>Danışmanlık ve sağlık verileri</h2>
        <p>
          Ölçüm, beslenme planı ve sağlıkla ilgili notlar için özel nitelikli
          veri işleme şartları ayrıca değerlendirilir. Bir iletişim formu
          göndermek veya bu metni okumak, sağlık verileri için açık rıza
          verdiğiniz anlamına gelmez.
        </p>
        <p>
          Ayrıntılı teknik kullanım için{" "}
          <Link href="/gizlilik">gizlilik politikasını</Link>; resmi açıklamalar
          için{" "}
          <a
            href="https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-"
            target="_blank"
            rel="noreferrer"
          >
            Kişisel Verileri Koruma Kurumunun aydınlatma açıklamasını
          </a>{" "}
          inceleyebilirsiniz.
        </p>
      </article>
    </>
  );
}
