import {
  Leaf,
  HeartPulse,
  BookOpen,
  CalendarDays,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/shared/brand";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ConsultationCta } from "@/components/shared/cta";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Hakkımda",
  "Diyetisyen Utku Karakoç’un kişisel planlama, sürdürülebilir alışkanlıklar ve düzenli takip odaklı beslenme yaklaşımı.",
  "/hakkimda",
);
export default function About() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">DİYETİSYEN UTKU KARAKOÇ</p>
        <h1>
          Beslenmeye, sizin
          <br />
          <em>hayatınızdan bakmak.</em>
        </h1>
        <p className="intro">
          Herkesin günü, sofrası ve ihtiyaçları farklı. Beslenme danışmanlığına
          bu farklılıkları anlayarak başlayalım.
        </p>
      </div>
      <section className="container split-content pb-12">
        <AnimatedSection className="brand-plaque">
          <Brand full />
          <p>KİŞİSEL YAKLAŞIM · SÜRDÜRÜLEBİLİR DENGE</p>
        </AnimatedSection>
        <AnimatedSection className="copy-block">
          <h2>Planın merkezinde siz varsınız.</h2>
          <p>
            Beslenme düzeninizi konuşurken yalnızca ne yediğinize değil; öğün
            saatlerinize, hazırlık için ayırabildiğiniz zamana, hareketinize ve
            tercihlerinize birlikte bakarız.
          </p>
          <p>
            Amaç, tek tip bir listeyi uygulamak değil; ihtiyaçlarınıza uygun
            seçenekleri anlamak ve günlük hayatınızda kullanabilmektir. Takip
            görüşmeleri, işe yarayan adımları ve zorlandığınız noktaları
            değerlendirmeye alan açar.
          </p>
          <Link href="/vip-diyet" className="text-link">
            Danışmanlık sürecini inceleyin <ArrowUpRight size={17} />
          </Link>
        </AnimatedSection>
      </section>
      <section className="section-space services-section">
        <div className="container">
          <ul className="grid md:grid-cols-2 gap-10 principle-list">
            {[
              {
                icon: HeartPulse,
                title: "Kişiye özel planlama",
                text: "Hedefleriniz, beslenme tercihleriniz ve günlük ihtiyaçlarınız birlikte ele alınır.",
              },
              {
                icon: Leaf,
                title: "Sürdürülebilirlik",
                text: "Uzun vadede uygulayabildiğiniz alışkanlıklara, esnekliğe ve çeşitliliğe yer verilir.",
              },
              {
                icon: CalendarDays,
                title: "Düzenli takip",
                text: "Geri bildirimleriniz değerlendirilir; gerektiğinde öğünler ve alternatifler güncellenir.",
              },
              {
                icon: BookOpen,
                title: "Bilgiyi anlaşılır kılmak",
                text: "Porsiyon, besin seçimi ve öğün düzeni gibi konular günlük örneklerle konuşulur.",
              },
            ].map((item) => (
              <li key={item.title}>
                <span className="icon-badge">
                  <item.icon />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
