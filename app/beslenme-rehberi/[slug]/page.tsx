import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BookOpen, ArrowLeft } from "lucide-react";
import { guides, getGuide } from "@/lib/guides";
import { GuideCard } from "@/components/guides/guide-card";
import { pageMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: Props) {
  const g = getGuide((await params).slug);
  return g
    ? pageMetadata(g.title, g.description, "/beslenme-rehberi/" + g.slug)
    : { title: "Rehber bulunamadı" };
}
export default async function GuideDetail({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const url = siteConfig.url + "/beslenme-rehberi/" + g.slug;
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MedicalWebPage",
                name: g.title,
                description: g.description,
                url,
                inLanguage: "tr-TR",
                about: { "@type": "MedicalCondition", name: g.title },
                citation: g.source.url,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Ana sayfa",
                    item: siteConfig.url,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Beslenme rehberi",
                    item: siteConfig.url + "/beslenme-rehberi",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: g.title,
                    item: url,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <div className="container page-top guide-detail-top">
        <Link href="/beslenme-rehberi" className="text-link">
          <ArrowLeft size={15} /> Tüm rehberler
        </Link>
        <p className="eyebrow">{g.category} · BİLGİLENDİRME REHBERİ</p>
        <h1>{g.title}</h1>
        <p className="intro">{g.intro}</p>
        <div className="guide-meta">
          <span>
            <BookOpen size={15} /> Kaynak bağlantısı içerir
          </span>
          <span>Genel bilgilendirme</span>
        </div>
      </div>
      <div className="container guide-reading-layout">
        <aside className="guide-toc">
          <p className="eyebrow">BU REHBERDE</p>
          <nav aria-label="Yazı içindekiler">
            {g.sections.map((s, i) => (
              <a key={s.title} href={"#bolum-" + i}>
                <span>0{i + 1}</span>
                {s.title}
              </a>
            ))}
            <a href="#gorusmeye-hazirlik">
              <span>04</span>Görüşmeye hazırlık
            </a>
            <a href="#kaynak">
              <span>05</span>Kaynak ve kapsam
            </a>
          </nav>
        </aside>
        <div className="guide-reading-body">
          {g.sections.map((s, i) => (
            <section key={s.title} id={"bolum-" + i}>
              <span className="guide-section-number">0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <blockquote className="guide-takeaway">{g.takeaway}</blockquote>
          <section id="gorusmeye-hazirlik">
            <p className="eyebrow">GÖRÜŞMENİZE NOT ALIN</p>
            <h2>Uzmanınıza sorabileceğiniz sorular</h2>
            <ul className="guide-questions">
              {g.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
            <p>
              Kendi günlük düzeninizden örneklerle gelmek görüşmeyi daha verimli
              kılabilir. Tahlil ve ayrıntılı sağlık bilgilerinizi açık iletişim
              formlarına yazmayın; paylaşım yöntemini görüşme öncesinde
              netleştirin.
            </p>
            <Link href="/iletisim" className="text-link">
              Görüşme hakkında bilgi alın <ArrowUpRight size={16} />
            </Link>
          </section>
          <section id="kaynak" className="guide-source">
            <p className="eyebrow">KAYNAK VE KAPSAM</p>
            <h2>Bilgiyi kaynağından inceleyin.</h2>
            <a href={g.source.url} target="_blank" rel="noreferrer">
              {g.source.title} <ArrowUpRight size={16} />
            </a>
            <p>
              Bu sayfa, bağlantı verilen kurumsal hasta bilgilendirme
              içeriğinden yararlanılarak hazırlanmıştır. Kişisel tıbbi
              değerlendirme içermez; hekiminizin veya diyetisyeninizin size özel
              önerileri önceliklidir.
            </p>
          </section>
        </div>
      </div>
      <section className="container section-space">
        <div className="section-heading">
          <p className="eyebrow">OKUMAYA DEVAM EDİN</p>
          <h2>İlgili rehberler</h2>
        </div>
        <div className="guide-grid guide-grid-two">
          {g.related
            .map((slug) => getGuide(slug))
            .filter((x) => x !== undefined)
            .map((item) => (
              <GuideCard key={item.slug} guide={item} />
            ))}
        </div>
      </section>
    </article>
  );
}
