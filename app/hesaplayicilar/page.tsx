import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Calculator,
  Droplets,
  Flame,
  Gauge,
  PieChart,
  Ruler,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { CalculatorPanel } from "@/components/calculator/calculator-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Beslenme Hesaplayıcıları ve Ücretsiz Araçlar",
  "BMI, BMR, TDEE, günlük kalori ihtiyacı, makro besin, su ihtiyacı, referans ağırlık ve bel/boy oranı için açıklanabilir hesaplama araçları.",
  "/hesaplayicilar",
);

const toolIcons = {
  "bmi-hesaplama": Gauge,
  "gunluk-kalori-ihtiyaci": Flame,
  "bazal-metabolizma-hizi": Activity,
  "makro-besin-ihtiyaci": PieChart,
  "su-ihtiyaci": Droplets,
  "ideal-kilo-hesaplama": Scale,
  "bel-boy-orani": Ruler,
} as const;

export default function Calculators() {
  return (
    <>
      <AnimatedSection className="container page-top calculators-intro" type="fade-up">
        <p className="eyebrow">ÜCRETSİZ BESLENME ARAÇLARI</p>
        <h1>
          Bir başlangıç noktası.
          <br />
          <em>Size ait göstergeler.</em>
        </h1>
        <p className="intro">
          Günlük enerji, vücut ölçümleri, makro dağılım ve sıvı ihtiyacına dair
          genel tahminler. Her aracın neyi hesapladığını ve sınırlarını ayrıca
          görebilirsiniz.
        </p>
        <p className="scope-note">
          <ShieldCheck size={15} /> 18 yaş ve üzeri yetişkinler içindir. Gebelik,
          emzirme, kronik hastalık veya sıvı kısıtlaması durumunda bireysel
          değerlendirme gerekir.
        </p>
      </AnimatedSection>

      <section className="container tool-directory" aria-label="Ücretsiz hesaplama araçları">
        {tools.map((tool, index) => {
          const Icon = toolIcons[tool.slug as keyof typeof toolIcons] || Calculator;
          return (
            <AnimatedSection key={tool.slug} delay={index * 0.045} type="fade-up">
              <Link href={`/hesaplayicilar/${tool.slug}`} className="tool-directory-card">
                <span className="tool-directory-number">0{index + 1}</span>
                <span className="icon-badge tool-icon-badge"><Icon /></span>
                <div>
                  <small>{tool.category}</small>
                  <h2>{tool.shortTitle}</h2>
                  <p>{tool.description}</p>
                </div>
                <ArrowUpRight className="tool-card-arrow" size={18} />
              </Link>
            </AnimatedSection>
          );
        })}
      </section>

      <AnimatedSection className="calculator-suite-section" type="fade-in" delay={0.08}>
        <div className="container">
          <div className="calculator-suite-heading">
            <div>
              <p className="eyebrow">HEPSİNİ BİR ARADA</p>
              <h2>Enerji, BMI, su ve makro dağılımını tek panelde görün.</h2>
            </div>
            <p>
              Ayrı araçlar hızlı ve konu odaklı sonuçlar verir. Aşağıdaki panel
              ise aynı bilgilerden birden fazla göstergeyi birlikte hesaplar.
            </p>
          </div>
        </div>
        <CalculatorPanel />
      </AnimatedSection>

      <AnimatedSection className="container section-space" type="fade-up">
        <details className="calculation-method">
          <summary>Bu hesaplamalar nasıl yapılıyor?</summary>
          <div>
            <p>
              <strong>BMR:</strong> Mifflin–St Jeor denklemi; 10 × kilo + 6,25 ×
              boy − 5 × yaş, erkek için +5, kadın için −161. Dinlenme enerji
              harcamasının tahminidir.
            </p>
            <p>
              <strong>TDEE:</strong> BMR × seçilen hareket katsayısı (1,2 /
              1,375 / 1,55 / 1,725). Günlük gerçek harcama kişiye göre
              değişebilir.
            </p>
            <p>
              <strong>Enerji senaryosu:</strong> Azaltma için en fazla 300 kcal
              veya toplam enerjinin %15’i (küçük olan), artırma için 250 kcal
              kullanılır. 20 yaş altında veya BMI 18,5–30 dışında hedef
              değişikliği uygulanmaz. Bunlar örnek senaryolardır.
            </p>
            <p>
              <strong>Makrolar:</strong> Seçtiğiniz enerji yüzdeleri üzerinden
              protein ve karbonhidrat 4 kcal/g, yağ 9 kcal/g ile hesaplanır.
            </p>
            <p>
              <strong>BMI:</strong> Kilo / boyun metre cinsinden karesi. BMI tek
              başına sağlık veya vücut kompozisyonu göstergesi değildir.
            </p>
            <p>
              <strong>Su:</strong> 30 ml/kg kaba hesaplama örneğidir; iklim,
              aktivite, besinlerden alınan su ve sağlık durumu dikkate alınmaz.
            </p>
            <p>
              <strong>Referans ağırlık:</strong> BMI 22 orta noktası üzerinden
              matematiksel bir tahmindir; “olmanız gereken kilo” olarak
              yorumlanmamalıdır.
            </p>
            <p>
              <strong>Bel/boy oranı:</strong> Bel çevresi / boy. 0,5 değeri
              yaygın kullanılan genel tarama eşiklerinden biridir; tanı koymaz.
            </p>
          </div>
        </details>
      </AnimatedSection>
    </>
  );
}
