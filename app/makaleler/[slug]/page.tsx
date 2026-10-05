import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen, Clock3, Quote } from "lucide-react";
import Image from "next/image";
import { getPublicArticles, getPublicArticle } from "@/lib/article-data";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;
export const dynamicParams = true;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = await getPublicArticle((await params).slug);
  return article
    ? pageMetadata(article.title, article.description, `/makaleler/${article.slug}`)
    : { title: "Makale bulunamadı" };
}

export default async function ArticleDetailPage({ params }: Props) {
  const article = await getPublicArticle((await params).slug);
  if (!article) notFound();

  const url = siteConfig.url + "/makaleler/" + article.slug;
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: article.title,
                description: article.description,
                articleSection: article.category,
                datePublished: article.publishedAt, dateModified: article.updatedAt,
                image: article.coverImage ? new URL(article.coverImage, siteConfig.url).href : undefined,
                inLanguage: "tr-TR",
                url,
                author: {
                  "@type": "Person",
                  name: siteConfig.personName,
                  jobTitle: siteConfig.role,
                  url: siteConfig.url + "/hakkimda",
                },
                citation: article.sources.flatMap((source) => source.url ? [source.url] : []),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Ana sayfa", item: siteConfig.url },
                  { "@type": "ListItem", position: 2, name: "Makaleler", item: siteConfig.url + "/makaleler" },
                  { "@type": "ListItem", position: 3, name: article.title, item: url },
                ],
              },
            ],
          }),
        }}
      />
      <div className="container page-top article-detail-top">
        <Link href="/makaleler" className="text-link">
          <ArrowLeft size={15} /> Tüm makaleler
        </Link>
        <p className="eyebrow">{article.category} · BİLİMSEL DEĞERLENDİRME</p>
        <h1>{article.title}</h1>
        <p className="article-subtitle">{article.subtitle}</p>
        <p className="intro">{article.intro}</p>
        <div className="article-meta">
          <span><Clock3 size={15} /> {article.readingTime}</span>
          <span><BookOpen size={15} /> {article.sources.length} kaynak</span>
          <span>Genel bilgilendirme</span>
        </div>
      </div>

      {article.coverImage && <div className="container article-cover"><Image src={article.coverImage} alt={article.imageAlt || article.title} width={1400} height={850} sizes="(max-width: 767px) 100vw, 1100px" quality={90}/></div>}
      <div className="container article-reading-layout">
        <aside className="article-toc">
          <p className="eyebrow">İÇİNDEKİLER</p>
          <nav aria-label="Makale içindekiler">
            {article.sections.map((section, index) => (
              <a key={section.title} href={`#bolum-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
            <a href="#kaynaklar"><span>↗</span>Kaynaklar</a>
          </nav>
        </aside>

        <div className="article-reading-body">
          {article.sections.map((section, index) => (
            <section key={section.title} id={`bolum-${index}`}>
              <span className="article-section-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
            </section>
          ))}

          <blockquote className="article-takeaway">
            <Quote size={24} />
            <p>{article.takeaway}</p>
          </blockquote>

          <section id="kaynaklar" className="article-sources">
            <p className="eyebrow">KAYNAKLAR</p>
            <h2>Bilimsel kaynaklar</h2>
            <ol>
              {article.sources.map((source) => (
                <li key={source.label}>
                  {source.url ? (
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.label} <ArrowUpRight size={14} />
                    </a>
                  ) : source.label}
                </li>
              ))}
            </ol>
            <p className="article-scope-note">
              Kaynakların kapsamı ve bibliyografik ayrıntıları kullanıcı
              tarafından sağlanan bilimsel değerlendirme belgelerinde bulunduğu
              şekliyle korunmuştur; eksik bibliyografik alanlar tahmin edilerek
              tamamlanmamıştır.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
