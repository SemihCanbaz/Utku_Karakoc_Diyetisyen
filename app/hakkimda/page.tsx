import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ConsultationCta } from "@/components/shared/cta";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const metadata = pageMetadata(
  "Diyetisyen Utku Karakoç Hakkında",
  "Diyetisyen Utku Karakoç’un eğitimi, mesleki gelişimi ve bilimsel, kişiye özel, sürdürülebilir beslenme yaklaşımı. İzmir ve online beslenme danışmanlığı.",
  "/hakkimda",
);
const principles = [
  [
    "Bilimsel olmalı.",
    "Beslenme önerilerinin güncel bilimsel kanıtlara dayanması gerektiğine inanıyorum. Moda diyetlerden ve kısa süreli çözümlerden ziyade, güvenilir ve doğru bilgiyi temel alıyorum.",
  ],
  [
    "Kişiye özel olmalı.",
    "Her insanın ihtiyaçları, yaşam tarzı, alışkanlıkları ve hedefleri farklı. Bu nedenle herkese aynı listeyi uygulamak yerine, kişinin kendi hayatına uyabilecek bir düzen oluşturmayı önemsiyorum.",
  ],
  [
    "Sürdürülebilir olmalı.",
    "Bir beslenme programının başarısını yalnızca ilk birkaç haftadaki değişimle değil, kişinin bunu aylar ve yıllar boyunca sürdürebilmesiyle değerlendiriyorum.",
  ],
  [
    "Gerçekçi olmalı.",
    "Her gün kusursuz beslenmek mümkün değil. Dışarıda yemek yemek, yoğun bir gün geçirmek veya sevdiğimiz bir yiyeceği tüketmek sağlıklı beslenmenin dışında olmak anlamına gelmemeli. Önemli olan, bütünün nasıl şekillendiği.",
  ],
];
const internships = [
  ["Ülker Bisküvi San. AŞ.", "İstanbul", "Gıda Güvenliği Stajyeri"],
  [
    "Spice Hotel & Spa",
    "Antalya",
    "Diyetisyen / Hijyen ve Sanitasyon Stajyeri",
  ],
  [
    "İstanbul Şişli Hamidiye Etfal Eğitim ve Araştırma Hastanesi",
    "İstanbul",
    "Diyetisyen Stajyeri",
  ],
  ["İstanbul Bahçelievler Devlet Hastanesi", "İstanbul", "Diyetisyen Stajyeri"],
];
export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Utku Karakoç",
            jobTitle: "Diyetisyen",
            url: siteConfig.url + "/hakkimda",
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "İstanbul Sağlık ve Teknoloji Üniversitesi",
            },
          }),
        }}
      />
      <div className="container page-top">
        <p className="eyebrow">HAKKIMDA</p>
        <h1>
          Beslenmeyi hayatın dışında değil,
          <br />
          <em>hayatın içinde ele alıyorum.</em>
        </h1>
        <p className="intro">Merhaba, ben Diyetisyen Utku Karakoç.</p>
      </div>
      <section className="container split-content pb-12">
        <AnimatedSection className="brand-plaque">
          <Brand full />
          <p>BİLİMSEL YAKLAŞIM · GERÇEK HAYAT</p>
        </AnimatedSection>
        <AnimatedSection className="copy-block">
          <h2>Planın merkezinde gerçek hayat var.</h2>
          <p>
            Beslenmenin yalnızca kilo vermek, kalori hesaplamak ya da bazı
            yiyecekleri hayatımızdan çıkarmaktan ibaret olduğuna inanmıyorum.
          </p>
          <p>
            Günlük hayatımız; işimiz, sosyal çevremiz, alışkanlıklarımız,
            sevdiğimiz yemekler ve bazen de yoğunluğumuzla birlikte
            şekilleniyor. Bu nedenle iyi bir beslenme planının yalnızca kâğıt
            üzerinde doğru olması değil, gerçek hayatta uygulanabilir olması
            gerektiğini düşünüyorum.
          </p>
          <p>
            Benim yaklaşımımın temelinde bilimsel bilgiler ile günlük hayatın
            gerçeklerini bir araya getirmek var.
          </p>
          <Link href="/vip-diyet" className="text-link">
            Danışmanlık yaklaşımımı keşfedin <ArrowUpRight size={17} />
          </Link>
        </AnimatedSection>
      </section>
      <section className="section-space services-section">
        <div className="container">
          <p className="eyebrow">YAKLAŞIMIMIN DÖRT TEMELİ</p>
          <h2 className="font-heading text-4xl mb-12">Benim için beslenme;</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {principles.map(([title, text], i) => (
              <AnimatedSection key={title} className="copy-block">
                <p className="eyebrow">{String(i + 1).padStart(2, "0")} —</p>
                <h3 className="font-heading text-2xl">{title}</h3>
                <p>{text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="container section-space split-content">
        <div>
          <p className="eyebrow">BİR LİSTEDEN DAHA FAZLASI</p>
          <h2 className="font-heading text-4xl">
            Diyetisyenlik benim için
            <br />
            <em>ne ifade ediyor?</em>
          </h2>
        </div>
        <div className="copy-block">
          <p>
            Bir danışana yalnızca “ne yiyeceğini” söylemekten daha fazlasını
            yapabilmek istiyorum.
          </p>
          <p>
            Çünkü çoğu zaman mesele hangi besinin sağlıklı olduğunu bilmek
            değil; onu günlük hayatımıza nasıl dahil edeceğimizi bilmektir.
          </p>
          <p>
            Bu nedenle danışmanlık sürecinde yalnızca bir beslenme listesi
            hazırlamak yerine, kişinin kendi düzenini oluşturmasına yardımcı
            olmayı önemsiyorum.
          </p>
          <p>
            <strong>Hedefimiz;</strong> yasaklarla dolu kısa süreli bir diyet
            değil, uzun vadede sürdürülebilecek bir beslenme alışkanlığı
            oluşturmak.
          </p>
        </div>
      </section>
      <section className="about-credentials section-space">
        <div className="container">
          <p className="eyebrow">EĞİTİM & MESLEKİ GELİŞİM</p>
          <h2 className="font-heading text-4xl mb-10">
            Bilginin üzerine,
            <br />
            <em>deneyim eklemek.</em>
          </h2>
          <div className="credentials-layout">
            <div className="credential-education">
              <GraduationCap size={30} />
              <p className="eyebrow">LİSANS EĞİTİMİ</p>
              <h3>İstanbul Sağlık ve Teknoloji Üniversitesi</h3>
              <p>Beslenme ve Diyetetik</p>
              <div className="credential-certificates">
                <ShieldCheck size={22} />
                <h4>Sertifikalar</h4>
                <ul>
                  <li>Hijyen Sertifikası</li>
                  <li>İş Sağlığı ve Güvenliği Sertifikası</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen size={22} />
                <h3 className="text-lg font-semibold">Staj deneyimleri</h3>
              </div>
              <ol className="credential-timeline">
                {internships.map(([name, city, role], i) => (
                  <li key={name}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <small>{city}</small>
                      <h4>{name}</h4>
                      <p>{role}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="container section-space">
        <div className="about-manifesto">
          <p className="eyebrow">
            BİLİMSEL YAKLAŞIM. GERÇEK HAYAT. KİŞİYE ÖZEL ÇÖZÜMLER.
          </p>
          <h2>
            Hayatınızın içinde
            <br />
            <em>daha iyi beslenebileceğiniz bir düzen.</em>
          </h2>
          <p>
            Benim için sağlıklı beslenme, hayatınızı değiştirmek zorunda
            olduğunuz anlamına gelmez. Hayatınızın içinde daha iyi
            beslenebileceğiniz bir düzen oluşturmak anlamına gelir.
          </p>
          <strong>Diyetisyen Utku Karakoç</strong>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
