import { BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/guides/guide-card";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const metadata = pageMetadata(
  "Hastalıklarda Beslenme Rehberi",
  "Diyabet, insülin direnci, IBS, çölyak, reflü ve hipertansiyonda beslenmeye dair kaynaklı rehberler.",
  "/beslenme-rehberi",
);
export default function GuideIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Hastalıklarda Beslenme Rehberi",
            url: siteConfig.url + "/beslenme-rehberi",
            inLanguage: "tr-TR",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: guides.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: siteConfig.url + "/beslenme-rehberi/" + g.slug,
                name: g.title,
              })),
            },
          }),
        }}
      />
      <div className="container page-top guide-index-intro">
        <p className="eyebrow">BESLENME REHBERİ · KAYNAKLARA DAYANAN BİLGİ</p>
        <h1>
          Daha iyi anlayın.
          <br />
          <em>Bilinçli adımlar atın.</em>
        </h1>
        <p className="intro">
          Hastalıklarda beslenmeye dair sık sorulan konuları sade bir dille
          keşfedin. Günlük yaşamınız için sorular oluşturun, kendi planınızı
          uzmanınızla değerlendirin.
        </p>
        <div className="guide-index-note">
          <BookOpen size={22} />
          <p>
            Bu rehberler genel bilgilendirme içindir. Tanı, tedavi veya kişiye
            özel diyet listesi yerine geçmez. Her yazıda yararlanılan kurum
            kaynağına ulaşabilirsiniz.
          </p>
        </div>
      </div>
      <section
        className="container guide-library"
        aria-label="Beslenme rehberleri"
      >
        <div className="guide-grid">
          {guides.map((g) => (
            <GuideCard key={g.slug} guide={g} heading="h2" />
          ))}
        </div>
      </section>
      <section className="container section-space">
        <div className="guide-editorial">
          <div>
            <p className="eyebrow">BİLGİDEN GÜNLÜK YAŞAMA</p>
            <h2>
              Okuduğunuz bilgiyi,
              <br />
              <em>kendi hayatınıza uyarlayın.</em>
            </h2>
          </div>
          <div>
            <p>
              Bir rehber başlangıç noktasıdır. Sağlık geçmişiniz, tedaviniz ve
              günlük ihtiyaçlarınızla birlikte değerlendirilmesi gerekir.
            </p>
            <Link className="text-link" href="/vip-diyet">
              Danışmanlık sürecini tanıyın <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
