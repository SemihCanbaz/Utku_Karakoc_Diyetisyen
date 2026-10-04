import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Gizlilik Politikası",
  "İletişim formu, hesaplayıcılar, danışan portalı ve harici hizmetlerde kişisel verilerin kullanımı.",
  "/gizlilik",
);
export default function Privacy() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">ŞEFFAF VE ANLAŞILIR</p>
        <h1>Gizlilik politikası.</h1>
        <p className="intro">
          Hangi bilgilerin, hangi işlem sırasında kullanıldığını açıkça
          anlatıyoruz.
        </p>
      </div>
      <article className="container prose-content">
        <p>Son güncelleme: 3 Ekim 2026</p>
        <h2>İletişim ve görüşme talepleri</h2>
        <p>
          Formdaki adınız, isteğe bağlı telefon veya e-posta adresiniz, görüşme
          konusu ve kısa notunuz talebinizi iletmek amacıyla site sunucusuna
          gönderilir. E-posta hizmeti etkinse bu bilgiler e-posta sağlayıcısı
          üzerinden iletilir ve alıcı posta kutusunda saklanabilir. Bu form,
          danışan portalında otomatik kayıt veya kesin randevu oluşturmaz.
        </p>
        <p>
          E-posta hizmeti etkin değilse mesajınız hazırlanır ve e-posta
          uygulamanızda ya da WhatsApp’ta gönderimi siz tamamlarsınız. Form
          sonucu hangi yöntemin kullanıldığını gösterir. İlk iletişim formunda
          tahlil, tanı, ilaç veya ayrıntılı sağlık bilgisi paylaşmayın.
        </p>
        <h2>Hesaplayıcılar ve tarif aramaları</h2>
        <p>
          Hesaplayıcılara yazdığınız yaş, boy ve kilo bilgileri tarayıcınızda
          hesaplanır; hesaplama için sunucuya gönderilmez ve danışan dosyanıza
          eklenmez. Tarif aramaları ve işaretlenen malzemeler açık sayfanızın
          durumunda tutulur.
        </p>
        <h2>Danışan portalı</h2>
        <p>
          Portal kullanıma açıldığında hesap erişimi davetle sağlanır.
          Diyetisyen tarafından kaydedilen iletişim bilgileri, hedefler,
          ölçümler, beslenme planları ve randevular yetkili hesaplarla erişilen
          veritabanında tutulur. Danışan yalnızca kendi kayıtlarını ve
          yayınlanmış planlarını görüntüleyebilir. Şifre doğrulaması kimlik
          hizmeti tarafından yürütülür; şifreniz diyetisyen panelinde
          gösterilmez.
        </p>
        <p>
          Bu kayıtlar iletişim formundan ayrı bir danışmanlık sürecine aittir.
          Sağlık verileri alınmadan önce hizmete özgü aydınlatma ve uygun veri
          işleme şartları tamamlanır.
        </p>
        <h2>Hizmet sağlayıcılar ve erişim kayıtları</h2>
        <p>
          Barındırma Vercel; portal etkinleştirildiğinde kimlik, veritabanı ve
          tarif görseli saklama Supabase; sunucu e-postası etkinse Resend
          altyapısını kullanır. Alıcı posta kutusu sağlayıcısı da mesaj
          içeriğini işler. Bu hizmetlerin sunucu konumları yurt dışında
          olabilir. Veri sorumlusu kullanılan hizmetleri, aktarım düzenini ve
          saklama sürelerini hizmete özgü aydınlatmada belirtir.
        </p>
        <p>
          IP adresi, istek zamanı ve tarayıcı bilgisi gibi teknik bilgiler
          güvenlik ve erişim kayıtlarında işlenebilir. Site kişisel sağlık
          verilerini URL parametrelerine veya uygulama günlüklerine yazmak üzere
          tasarlanmamıştır.
        </p>
        <h2>Çerezler ve dış bağlantılar</h2>
        <p>
          Bu sürüm reklam veya analitik izleme kodu içermez. Portal oturumunda
          gerekli kimlik doğrulama çerezleri kullanılır. Ayrıntılar{" "}
          <Link href="/cerez-politikasi">çerez politikasındadır</Link>.
          WhatsApp, Instagram ve harici takvim bağlantıları seçildiğinde ilgili
          hizmetin koşulları geçerlidir.
        </p>
        <h2>Bilgi ve başvuru</h2>
        <p>
          Haklarınız ve iletişim için{" "}
          <Link href="/kvkk">aydınlatma metnini</Link> inceleyebilirsiniz.
          Bilgilerin yanlış olduğunu düşünüyorsanız{" "}
          <Link href="/iletisim">iletişim kanallarından</Link> düzeltme talep
          edebilirsiniz.
        </p>
      </article>
    </>
  );
}
