import { BookOpenText, ShieldCheck } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";
import { articles } from "@/lib/articles";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata(
  "Bilimsel Beslenme Makaleleri",
  "Beslenme mitleri, gıda okuryazarlığı, kilo yönetimi ve sporcu beslenmesi üzerine kaynaklı ve dengeli makaleler.",
  "/makaleler",
);

export default function ArticlesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Bilimsel Beslenme Makaleleri",
            url: siteConfig.url + "/makaleler",
            inLanguage: "tr-TR",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: articles.map((article, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: siteConfig.url + "/makaleler/" + article.slug,
                name: article.title,
              })),
            },
          }),
        }}
      />
      <div className="container page-top article-index-top">
        <p className="eyebrow">BİLİMSEL BESLENME · KAYNAKLI İÇERİK</p>
        <h1>
          Popüler sorulara,
          <br />
          <em>daha sakin ve kaynaklı yanıtlar.</em>
        </h1>
        <p className="intro">
          Günlük beslenmede sık karşılaşılan iddiaları; mevcut kanıtlar,
          uygulanabilirlik ve kişisel farklılıklar açısından ele alan yazılar.
        </p>
        <div className="article-index-note">
          <ShieldCheck size={21} />
          <p>
            Bu içerikler genel bilgilendirme amaçlıdır. Tanı, tedavi veya kişiye
            özel beslenme planı yerine geçmez. Her makalede kullanılan kaynaklar
            ayrıca listelenir.
          </p>
        </div>
      </div>
      <section className="container article-library" aria-label="Beslenme makaleleri">
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <section className="container section-space article-editorial">
        <div>
          <BookOpenText size={27} />
          <p className="eyebrow">OKURKEN AKLINIZDA OLSUN</p>
          <h2>Tek bir başlık, tek başına bütün resmi anlatmaz.</h2>
        </div>
        <p>
          Beslenme araştırmalarında sonuçlar; çalışma tasarımı, katılımcı grubu,
          süre ve uygulama biçimine göre değişebilir. Bu nedenle içeriklerde
          kesin ve herkese uyan sonuçlar yerine kanıtın sınırları da görünür
          tutulur.
        </p>
      </section>
    </>
  );
}
