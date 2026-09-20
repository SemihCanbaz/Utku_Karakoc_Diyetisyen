import Link from "next/link";
import { CalendarDays, MessageCircle, ArrowUpRight } from "lucide-react";
import { BookingWidget } from "@/components/booking-widget";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Görüşme Planlayın",
  "Hedeflerinizi paylaşın, görüşme yöntemi ve uygun zamanı birlikte belirleyin. Kişisel beslenme danışmanlığına ilk adım.",
  "/randevu",
);
export default function Booking() {
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">YENİ BİR BAŞLANGIÇ</p>
        <h1>
          Size uygun bir zaman.
          <br />
          <em>Size ayrılan bir görüşme.</em>
        </h1>
        <p className="intro">
          Önce tanışalım. Beklentilerinizi ve danışmanlık sürecini konuşup uygun
          görüşme yöntemini birlikte belirleyelim.
        </p>
      </div>
      <section className="container pb-24">
        {siteConfig.bookingUrl ? (
          <BookingWidget url={siteConfig.bookingUrl} />
        ) : (
          <div className="booking-fallback">
            <div className="copy-block">
              <span className="icon-badge">
                <CalendarDays />
              </span>
              <h2 className="mt-6">
                İlk görüşmeyi
                <br />
                birlikte planlayalım.
              </h2>
              <p>
                Hedefinizi kısaca iletin. Görüşme zamanı, yöntemi ve danışmanlık
                detayları karşılıklı iletişimle netleşsin.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <Link href="/iletisim" className="action">
                  Ön Görüşme İçin İletişim <ArrowUpRight size={17} />
                </Link>
                {siteConfig.whatsapp && (
                  <a
                    href={"https://wa.me/" + siteConfig.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="action action-outline"
                  >
                    <MessageCircle size={17} />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
            <ol className="booking-steps">
              {[
                [
                  "Hedefinizi paylaşın",
                  "Nasıl bir destek aradığınızı birkaç cümleyle anlatın.",
                ],
                [
                  "Detayları konuşalım",
                  "Görüşme yöntemi, kapsamı ve uygun zaman netleşsin.",
                ],
                [
                  "Sürece başlayalım",
                  "İlk değerlendirmeyle kişisel ihtiyaçlarınızı ele alalım.",
                ],
              ].map(([t, d], i) => (
                <li key={t}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
}
