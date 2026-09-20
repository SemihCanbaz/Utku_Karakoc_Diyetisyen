import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Video,
  NotebookPen,
  MessagesSquare,
  RefreshCw,
} from "lucide-react";
import { ConsultationCta } from "@/components/shared/cta";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ConsultationExplorer } from "@/components/consultation-explorer";
import { GuideCard } from "@/components/guides/guide-card";
import { guides } from "@/lib/guides";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const metadata = pageMetadata(
  "Online Diyet ve Beslenme Danışmanlığı",
  "Diyetisyen Utku Karakoç ile online beslenme danışmanlığı: kişisel değerlendirme, günlük yaşamınıza uygun planlama, takip ve görüşmeye hazırlık.",
  "/vip-diyet",
);
const steps = [
  {
    title: "Önce tanışalım.",
    label: "01 / İLK İLETİŞİM",
    text: "Beklentilerinizi ve görüşme biçimini konuşalım. Süreç, görüşme sıklığı ve ücret bilgisi başlamadan önce netleşsin.",
  },
  {
    title: "Günlük hayatınızı anlayalım.",
    label: "02 / DEĞERLENDİRME",
    text: "Öğünleriniz, çalışma saatleriniz, besin tercihleriniz ve sağlık durumunuz birlikte değerlendirilir.",
  },
  {
    title: "Size uygun seçenekler oluşturalım.",
    label: "03 / KİŞİSEL PLAN",
    text: "Günlük düzeninize uyarlanabilecek öğün seçenekleri, porsiyonlar ve alternatifler üzerinde çalışılır.",
  },
  {
    title: "Deneyiminize göre ilerleyelim.",
    label: "04 / TAKİP VE GÜNCELLEME",
    text: "Uygulayabildiklerinizi ve zorlandığınız noktaları konuşuruz. Planı geri bildirimlerinizle yeniden ele alırız.",
  },
];
const faqs = [
  [
    "Online görüşme için neye ihtiyacım var?",
    "İnternet bağlantısı ve görüşme yapabileceğiniz bir cihaz yeterlidir. Kullanılacak uygulama, tarih ve görüşme yöntemi ilk iletişimde birlikte netleştirilir.",
  ],
  [
    "İlk görüşmeden önce tahlil yaptırmalı mıyım?",
    "Herkes için aynı tetkik listesi geçerli değildir. Elinizde mevcut değerlendirmeler varsa paylaşım yöntemini önce konuşun. Gerekli tetkik ve tanı sürecini hekiminiz belirler.",
  ],
  [
    "Takip ve iletişim nasıl ilerliyor?",
    "Görüşme sıklığı, kullanılacak iletişim kanalı ve geri dönüş koşulları süreç başlamadan belirlenir. Planlanan görüşmelerde deneyimleriniz ve ihtiyaç duyulan değişiklikler ele alınır.",
  ],
  [
    "Hazır bir diyet listesi mi alacağım?",
    "Planlama; öğün düzeniniz, tercihleriniz ve ihtiyaçlarınız üzerinden yapılır. Amaç günlük yaşamınızda uygulanabilir seçenekler geliştirmektir.",
  ],
  [
    "Ücret ve görüşme sıklığını nasıl öğrenebilirim?",
    "İletişim sayfasından online danışmanlık hakkında bilgi isteyebilirsiniz. Kapsam ve ücret, sürece başlamadan önce sizinle netleştirilir.",
  ],
  [
    "Kronik hastalığım varsa online görüşebilir miyim?",
    "Online danışmanlığın size uygunluğu bireysel olarak değerlendirilir. Hekim takibi gereken durumlarda beslenme planlaması tıbbi değerlendirmeyle birlikte ele alınır; online görüşme muayenenin yerine geçmez.",
  ],
];
export default function Consultancy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Online Beslenme Danışmanlığı",
            serviceType: "Beslenme danışmanlığı",
            url: siteConfig.url + "/vip-diyet",
            provider: { "@type": "Person", name: siteConfig.personName },
            description:
              "Kişisel değerlendirme, günlük yaşama uygun beslenme planlama ve takip.",
          }),
        }}
      />
      <section className="container consult-hero">
        <div className="consult-hero-copy">
          <p className="eyebrow">ONLINE DANIŞMANLIK · UTKU KARAKOÇ</p>
          <h1>
            Bir ekran kadar yakın.
            <br />
            <em>Tamamen size odaklı.</em>
          </h1>
          <p className="intro">
            Nerede yaşadığınızdan bağımsız, günlük hayatınızın içinden bir
            beslenme düzeni. Sizi tanıyarak başlayalım; planı birlikte
            geliştirelim.
          </p>
          <div className="hero-actions">
            <Link href="/randevu" className="action">
              Görüşme Planla <ArrowUpRight size={17} />
            </Link>
            <a href="#danismanlik-sureci" className="text-link">
              Süreci inceleyin <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="consult-small-note">
            Görüşme yöntemi, takip kapsamı ve ücret başlangıçta netleştirilir.
          </p>
        </div>
        <div className="consult-hero-visual">
          <Image
            src="/images/home-philosophy.webp"
            alt="Meyveler ve farklı besin seçenekleriyle hazırlanmış sofra"
            fill
            preload
            quality={90}
            sizes="(max-width:767px) 140vw, 900px"
          />
          <div className="consult-photo-caption">
            <Video size={24} />
            <div>
              <small>MESAFELERDEN BAĞIMSIZ</small>
              <strong>Kendi hayatınızda, kendi ritminizde.</strong>
            </div>
          </div>
        </div>
      </section>
      <div className="container consult-benefits">
        {[
          [Video, "Online görüşme", "Size uygun görüşme yöntemi"],
          [
            NotebookPen,
            "Kişisel planlama",
            "Tercihlerinizden başlayan seçenekler",
          ],
          [
            MessagesSquare,
            "Birlikte değerlendirme",
            "Deneyimlerinize alan açan takip",
          ],
          [
            RefreshCw,
            "Uyarlanabilir düzen",
            "Değişen ihtiyaçlara göre güncelleme",
          ],
        ].map(([Icon, title, desc]) => {
          const I = Icon as typeof Video;
          return (
            <div key={String(title)}>
              <I size={22} />
              <h2>{String(title)}</h2>
              <p>{String(desc)}</p>
            </div>
          );
        })}
      </div>
      <section className="container section-space">
        <AnimatedSection>
          <div className="section-heading">
            <p className="eyebrow">SİZİN GÜNÜNÜZ NASIL GEÇİYOR?</p>
            <h2>
              Hayatınızın ritmini seçin.
              <br />
              <em>Birlikte neleri konuşabiliriz?</em>
            </h2>
            <p className="section-description">
              Günlük düzeninize yakın bir seçeneğe dokunun. Bunlar görüşme
              başlıklarıdır; kişisel beslenme planı ilk değerlendirmeden sonra
              şekillenir.
            </p>
          </div>
          <ConsultationExplorer />
        </AnimatedSection>
      </section>
      <section className="consult-process" id="danismanlik-sureci">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">BAŞLANGIÇTAN TAKİBE</p>
            <h2>
              Her adımda,
              <br />
              <em>daha anlaşılır bir yol.</em>
            </h2>
          </div>
          <div className="consult-steps">
            {steps.map((s) => (
              <AnimatedSection key={s.title}>
                <span>{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="container section-space consult-preparation">
        <div className="section-heading">
          <p className="eyebrow">İLK GÖRÜŞMEYE HAZIRLIK</p>
          <h2>
            Kusursuz bir başlangıç
            <br />
            <em>yapmanız gerekmiyor.</em>
          </h2>
          <p className="section-description">
            Günlük hayatınızdan birkaç not, birbirimizi daha iyi anlamamız için
            yeterli bir başlangıç olabilir.
          </p>
        </div>
        <div className="consult-checklist">
          {[
            "Sıradan bir gününüzde öğünleriniz nasıl ilerliyor?",
            "Sevdiğiniz, tercih etmediğiniz ve erişebildiğiniz besinler neler?",
            "Gün içinde sizi en çok zorlayan öğün veya saat hangisi?",
            "Bu süreçten beklentiniz ve sormak istediğiniz sorular neler?",
          ].map((t) => (
            <div key={t}>
              <Check size={18} />
              <p>{t}</p>
            </div>
          ))}
          <small>
            Ayrıntılı sağlık bilgilerini ilk iletişim formuna yazmayın. Güvenli
            paylaşım yöntemini görüşme öncesinde birlikte belirleyin.
          </small>
        </div>
      </section>
      <section className="container consult-clinical">
        <div>
          <p className="eyebrow">HASTALIKLARDA BESLENME</p>
          <h2>
            Sağlık durumunuz,
            <br />
            <em>planın bir parçası.</em>
          </h2>
          <p>
            Kronik hastalıklarda beslenme, hekim takibi ve kişisel
            gereksinimlerle birlikte ele alınır. Başlangıç rehberlerimizle temel
            konuları tanıyın.
          </p>
          <Link href="/beslenme-rehberi" className="text-link">
            Tüm beslenme rehberleri <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="guide-grid guide-grid-two">
          {guides.slice(0, 2).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
      <section className="container section-space">
        <div className="consult-faq-layout">
          <div className="section-heading">
            <p className="eyebrow">AKLINIZDAKİ SORULAR</p>
            <h2>
              Başlamadan önce
              <br />
              <em>netleştirelim.</em>
            </h2>
          </div>
          <div className="consult-faq">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
