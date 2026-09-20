import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Leaf,
  CalendarDays,
  BookOpen,
  Activity,
  Calculator,
} from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Brand } from "@/components/shared/brand";
import { ConsultationCta } from "@/components/shared/cta";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { recipes } from "@/lib/recipes";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/guides/guide-card";
import { ArticleCard } from "@/components/articles/article-card";
import { ServiceCard } from "@/components/services/service-card";
import { articles } from "@/lib/articles";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools";
import { siteConfig } from "@/lib/site-config";
import { jsonLd, pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Kişisel Beslenme ve Online Danışmanlık",
  siteConfig.description,
  "/",
);
const featuredRecipes = [
  "kremali-ispanakli-somon",
  "firinda-yaban-mersinli-pankek",
  "tavuk-sote-ve-bulgur-pilavi",
  "ev-yapimi-dana-kofte",
].flatMap((slug) => recipes.filter((r) => r.slug === slug));
const process = [
  ["Tanışma", "Hedeflerinizi ve beklentilerinizi konuşalım."],
  ["Değerlendirme", "Günlük düzeninizi ve ihtiyaçlarınızı anlayalım."],
  ["Planlama", "Tercihlerinize uygun seçenekler oluşturalım."],
  ["Takip", "Deneyimlerinizi birlikte değerlendirelim."],
  ["Güncelleme", "Değişen ihtiyaçlarınıza göre planı uyarlayalım."],
];
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": siteConfig.url + "/#person",
                name: siteConfig.personName,
                jobTitle: siteConfig.role,
                url: siteConfig.url,
              },
              {
                "@type": "WebSite",
                name: siteConfig.siteName,
                url: siteConfig.url,
                inLanguage: "tr-TR",
              },
              {
                "@type": "ProfessionalService",
                name: siteConfig.siteName,
                url: siteConfig.url,
                description: siteConfig.description,
                ...(siteConfig.address ? { address: siteConfig.address } : {}),
                ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
              },
            ],
          }),
        }}
      />
      <section className="hero">
        <div className="container">
          <div className="hero-kicker">
            <span>DİYETİSYEN UTKU KARAKOÇ</span>
            <span>
              <i /> ONLINE BESLENME DANIŞMANLIĞI
            </span>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">İyi yaşam, size uygun bir dengeyle.</p>
              <h1>
                Beslenme planınız
                <br />
                <em>hayatınıza uysun.</em>
              </h1>
              <p>
                Hedeflerinizi, alışkanlıklarınızı ve günlük ritminizi birlikte
                ele alalım. Sevdiğiniz sofralara yer açan, sürdürebileceğiniz
                bir beslenme düzeni oluşturalım.
              </p>
              <div className="hero-actions">
                <Link className="action action-gold" href="/randevu">
                  Görüşme Planla <ArrowUpRight size={18} />
                </Link>
                <Link className="text-link" href="/tarifler">
                  Tarifleri Keşfet <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="hero-note">
                <Leaf size={22} />
                <span>
                  Geçici kurallardan çok,
                  <br />
                  günlük hayatınıza uyum sağlayan alışkanlıklar.
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <Image
                  src="/images/home-hero.webp"
                  alt="Sebzeler, tahıllar ve protein kaynaklarıyla hazırlanmış renkli öğün tabakları"
                  fill
                  preload
                  quality={90}
                  sizes="(max-width:767px) 140vw, 900px"
                />
              </div>
              <div className="hero-image-label">
                <Leaf />
                <span>
                  DOĞAL BİR
                  <br />
                  DENGE
                </span>
              </div>
              <div className="hero-image-caption">
                <span>01</span>
                <div>
                  <small>SİZİN HAYATINIZ · SİZİN PLANINIZ</small>
                  <strong>İyi beslenmek, iyi hissetmeye bir adım.</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#yaklasim">
              <ArrowDown size={16} /> Birlikte nasıl ilerliyoruz?
            </a>
            <span>Bilimsel yaklaşım. Gerçek yaşam. Kişisel denge.</span>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="trust-strip">
          {[
            [Leaf, "Kişiye özel yaklaşım", "Yaşamınıza göre planlama"],
            [Activity, "Bilimsel hesaplama", "Açıklanabilir tahmin araçları"],
            [CalendarDays, "Düzenli takip", "Geri bildirimle ilerleme"],
            [BookOpen, "Tarif kütüphanesi", "Günlük sofralara ilham"],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Leaf;
            return (
              <div key={String(title)}>
                <I />
                <span>
                  <strong>{String(title)}</strong>
                  <small>{String(desc)}</small>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <section className="section-space" id="yaklasim">
        <div className="container approach-layout">
          <AnimatedSection>
            <div className="approach-image">
              <Image
                src="/images/home-philosophy.webp"
                alt="Taze meyvelerle hazırlanmış renkli bir sofra"
                fill
                quality={90}
                sizes="(max-width:767px) 140vw, 900px"
              />
            </div>
            <div className="approach-caption">
              <span>SOFRADA ÇEŞİTLİLİK, HAYATTA DENGE.</span>
              <span>UK / 01</span>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <SectionHeading
              label="BESLENMEYE BAKIŞIM"
              title={
                <>
                  Bir liste değil,
                  <br />
                  <em>size ait bir düzen.</em>
                </>
              }
            >
              İyi bir beslenme planı, sizi tanıyarak başlar. İş temponuz,
              sevdiğiniz yemekler ve sosyal yaşamınız bu sürecin bir parçasıdır.
            </SectionHeading>
            <div className="approach-steps">
              {[
                [
                  "Önce sizi anlayalım",
                  "Alışkanlıklarınızı, hedeflerinizi ve ihtiyaçlarınızı konuşalım.",
                ],
                [
                  "Planı hayatınıza uyarlayalım",
                  "Uygulanabilir öğünler ve esnek alternatifler oluşturalım.",
                ],
                [
                  "Birlikte takip edelim",
                  "Geri bildirimlerinizle adım adım ilerleyelim.",
                ],
              ].map(([t, d], i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/hakkimda" className="text-link">
              Yaklaşımımı tanıyın <ArrowUpRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
      <section className="section-space services-section">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              label="BESLENME DANIŞMANLIĞI"
              title={<>Her yaşamın<br /><em>ihtiyacı farklı.</em></>}
            >
              Kilo yönetiminden sporcu beslenmesine, gebelikten klinik başlıklara kadar farklı ihtiyaçlar için kişiselleştirilmiş danışmanlık alanları.
            </SectionHeading>
            <Link href="/danismanlik" className="text-link">
              Tüm danışmanlık alanları <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="service-grid service-grid-expanded">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container tools-layout">
          <AnimatedSection>
            <SectionHeading
              label="7 ÜCRETSİZ ARAÇ"
              title={<>Sayıları anlayın.<br /><em>Dengeyi keşfedin.</em></>}
            >
              BMI, günlük enerji, bazal metabolizma, makro dağılımı, su ihtiyacı, referans ağırlık ve bel/boy oranı için açıklanabilir hesaplama araçları.
            </SectionHeading>
            <Link href="/hesaplayicilar" className="action mt-7">
              Tüm Araçları Aç <ArrowUpRight size={17} />
            </Link>
          </AnimatedSection>
          <div className="tools-list tools-list-seven">
            {tools.map((tool) => (
              <Link href={`/hesaplayicilar/${tool.slug}`} key={tool.slug}>
                <Calculator />
                <span>
                  <strong>{tool.shortTitle}</strong>
                  <small>{tool.description}</small>
                </span>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space recipe-section">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              label="MUTFAKTAN NOTLAR"
              title={
                <>
                  İyi beslenmenin
                  <br />
                  <em>lezzetli tarafı.</em>
                </>
              }
            >
              Porsiyonları, hazırlama adımları ve besin değerleriyle günlük
              sofranıza eşlik eden tarifler.
            </SectionHeading>
            <Link href="/tarifler" className="text-link">
              Tüm tarifleri keşfedin <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="recipe-grid home-recipes">
            {featuredRecipes.map((recipe, i) => (
              <AnimatedSection key={recipe.slug} delay={i * 0.05}>
                <RecipeCard recipe={recipe} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <section className="journey">
        <div className="container">
          <SectionHeading
            label="BİRLİKTE ADIM ADIM"
            title="Başlangıçtan sürdürülebilir bir düzene."
          />
          <div className="journey-grid">
            {process.map(([title, desc], i) => (
              <div className="journey-step" key={title}>
                <small>0{i + 1}</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container about-teaser">
          <AnimatedSection className="brand-plaque">
            <Brand full />
            <p>BESLENME · DENGE · GÜNLÜK YAŞAM</p>
          </AnimatedSection>
          <AnimatedSection>
            <SectionHeading
              label="DİYETİSYEN UTKU KARAKOÇ"
              title={
                <>
                  Beslenmeye,
                  <br />
                  <em>sizin hayatınızdan bakmak.</em>
                </>
              }
            >
              Birlikte çalışırken odağımız yalnızca tabaktakiler değil; günlük
              düzeniniz, tercihleriniz ve sürdürebildiğiniz alışkanlıklar. Daha
              anlaşılır bir beslenme yaklaşımı için tanışalım.
            </SectionHeading>
            <Link href="/hakkimda" className="text-link mt-5">
              Yaklaşımımı tanıyın <ArrowUpRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
      <section className="section-space home-articles">
        <div className="container">
          <div className="section-row">
            <SectionHeading
              label="SON MAKALELER"
              title={<>Popüler sorulara<br /><em>kaynaklı yanıtlar.</em></>}
            >
              Beslenme mitleri, gıda seçimleri ve güncel tartışmaları bilimsel kaynakların sınırlarını koruyarak ele alan içerikler.
            </SectionHeading>
            <Link href="/makaleler" className="text-link">
              Tüm makaleler <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="article-grid home-article-grid">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
      <section className="home-guides section-space">
        <div className="container">
          <div className="home-guides-heading">
            <SectionHeading
              label="HASTALIKLARDA BESLENME"
              title={
                <>
                  Bilgiyi anlayın.
                  <br />
                  <em>Kendi yolunuzu bilinçle çizin.</em>
                </>
              }
            >
              Diyabetten sindirim sağlığına; kaynaklara dayanan, günlük
              yaşamınıza dair sorularınıza başlangıç sunan rehberler.
            </SectionHeading>
            <Link href="/beslenme-rehberi" className="text-link">
              Tüm rehberler <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="guide-grid">
            {[guides[0], guides[2], guides[5]].map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>
      <section className="container faq-section">
        <SectionHeading label="MERAK EDİLENLER" title="Başlamadan önce." />
        <div className="faq-list">
          {[
            [
              "Online danışmanlık nasıl başlar?",
              "İlk iletişimde hedeflerinizi ve beklentilerinizi konuşuruz. Görüşme yöntemi, uygun zaman ve takip kapsamı birlikte netleştirilir.",
            ],
            [
              "Herkese aynı beslenme listesi mi hazırlanır?",
              "Beslenme planı kişisel ihtiyaçlara, günlük düzene ve tercihlere göre şekillenir. Hazır bir tarif veya hesaplama sonucu kişisel plan yerine geçmez.",
            ],
            [
              "Hesaplayıcı sonuçlarını nasıl kullanmalıyım?",
              "Sonuçlar, kullanılan formüllere dayalı genel tahminlerdir. Bir başlangıç bilgisi sağlar; sağlık durumunuza özel kararlar için bireysel değerlendirme gerekir.",
            ],
            [
              "İletişim formunu doldurunca randevum oluşur mu?",
              "Form yalnızca mesajınızı hazırlar. Mesajın ilgili iletişim kanalından gönderilmesi ve görüşme zamanının karşılıklı olarak onaylanması gerekir.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <ConsultationCta />
    </>
  );
}
