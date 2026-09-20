import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { services, getService } from "@/lib/services";
import { getGuide } from "@/lib/guides";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props) {
  const service = getService((await params).slug);
  return service
    ? pageMetadata(service.title, service.description, `/danismanlik/${service.slug}`)
    : { title: "Danışmanlık alanı bulunamadı" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const relatedGuide = service.relatedGuide ? getGuide(service.relatedGuide) : undefined;
  const url = `${siteConfig.url}/danismanlik/${service.slug}`;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            url,
            provider: { "@type": "Person", name: siteConfig.personName, jobTitle: siteConfig.role },
            areaServed: siteConfig.city || undefined,
          }),
        }}
      />
      <div className="container page-top service-detail-top">
        <Link href="/danismanlik" className="text-link"><ArrowLeft size={15} /> Tüm danışmanlık alanları</Link>
        <p className="eyebrow">{service.category} · BESLENME DANIŞMANLIĞI</p>
        <h1>{service.title}</h1>
        <p className="intro">{service.intro}</p>
        {service.note && <div className="service-safety-note"><ShieldCheck size={19} /><p>{service.note}</p></div>}
      </div>

      <div className="container service-detail-layout">
        <section className="service-detail-panel">
          <p className="eyebrow">SÜREÇTE NELERE ODAKLANIYORUZ?</p>
          <h2>Günlük yaşama taşınabilen bir plan.</h2>
          <div className="service-highlight-list">
            {service.highlights.map((item) => <div key={item}><CheckCircle2 size={18} /><span>{item}</span></div>)}
          </div>
        </section>
        <section className="service-detail-panel service-detail-dark">
          <p className="eyebrow">ADIM ADIM</p>
          <h2>Danışmanlık akışı</h2>
          <ol>
            {service.process.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}
          </ol>
        </section>
      </div>

      <section className="container section-space service-detail-cta">
        <div>
          <p className="eyebrow">İLK ADIM</p>
          <h2>Bu alanın size uygun olup olmadığını birlikte değerlendirelim.</h2>
        </div>
        <div className="service-detail-actions">
          <Link href="/randevu" className="action">Görüşme planlayın <ArrowUpRight size={16} /></Link>
          {relatedGuide && <Link href={`/beslenme-rehberi/${relatedGuide.slug}`} className="action action-outline">İlgili rehberi okuyun</Link>}
        </div>
      </section>
    </article>
  );
}
