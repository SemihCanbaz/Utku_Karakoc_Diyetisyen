import Link from "next/link";
import { ArrowUpRight, HeartPulse, ShieldCheck } from "lucide-react";
import { ServiceCard } from "@/components/services/service-card";
import { services } from "@/lib/services";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata(
  "Beslenme Danışmanlığı",
  "Kilo yönetimi, sporcu beslenmesi, klinik beslenme, gebelik, çocuk ve ergen beslenmesi ile kurumsal danışmanlık alanlarını inceleyin.",
  "/danismanlik",
);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Beslenme danışmanlığı alanları",
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.url}/danismanlik/${service.slug}`,
              name: service.title,
            })),
          }),
        }}
      />
      <div className="container page-top services-index-top">
        <p className="eyebrow">BESLENME DANIŞMANLIĞI</p>
        <h1>Farklı ihtiyaçlar için <em>aynı temel yaklaşım: kişiselleştirme.</em></h1>
        <p className="intro">
          Hedefiniz kilo yönetimi, performans, gebelik dönemi veya klinik bir
          gereksinim olabilir. Süreç; günlük yaşamınız, mevcut tıbbi takip ve
          sürdürebileceğiniz alışkanlıklar üzerinden şekillenir.
        </p>
        <div className="services-index-note">
          <ShieldCheck size={21} />
          <p>Klinik başlıklarda beslenme danışmanlığı tanı ve tıbbi tedavinin yerine geçmez; gerektiğinde hekim takibiyle birlikte yürütülür.</p>
        </div>
      </div>
      <section className="container services-seo-grid" aria-label="Danışmanlık alanları">
        {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
      </section>
      <section className="container section-space service-online-callout">
        <HeartPulse />
        <div>
          <p className="eyebrow">ONLINE GÖRÜŞME</p>
          <h2>Bulunduğunuz yerden sürece başlayın.</h2>
          <p>Online danışmanlığın görüşme, takip ve geri bildirim yapısını ayrı sayfada inceleyebilirsiniz.</p>
        </div>
        <Link className="action" href="/vip-diyet">Online süreci inceleyin <ArrowUpRight size={16} /></Link>
      </section>
    </>
  );
}
