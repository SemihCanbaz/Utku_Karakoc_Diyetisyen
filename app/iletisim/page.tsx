import { Instagram, Mail, MapPin, MessageCircle, Phone, Leaf } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "İletişim",
  "Online beslenme danışmanlığı hakkında bilgi almak ve görüşme mesajınızı hazırlamak için iletişim seçenekleri.",
  "/iletisim",
);
export default function Contact() {
  const channels = [
    ...(siteConfig.whatsapp
      ? [
          {
            icon: MessageCircle,
            label: "WhatsApp",
            value: "Bir mesajla tanışalım",
            href: "https://wa.me/" + siteConfig.whatsapp,
          },
        ]
      : []),
    ...(siteConfig.phone
      ? [
          {
            icon: Phone,
            label: "Telefon",
            value: siteConfig.phone,
            href: "tel:" + siteConfig.phone.replace(/[^+\d]/g, ""),
          },
        ]
      : []),
    ...(siteConfig.email
      ? [
          {
            icon: Mail,
            label: "E-posta",
            value: siteConfig.email,
            href: "mailto:" + siteConfig.email,
          },
        ]
      : []),
    ...(siteConfig.instagram
      ? [
          {
            icon: Instagram,
            label: "Instagram",
            value: "@dyt.utkukarakoc",
            href: siteConfig.instagram,
          },
        ]
      : []),
  ];
  return (
    <>
      <div className="container page-top">
        <p className="eyebrow">İLETİŞİM</p>
        <h1>
          İyi bir başlangıç,
          <br />
          <em>küçük bir sohbetle.</em>
        </h1>
        <p className="intro">
          Danışmanlık süreci, görüşme yöntemi ve beklentilerinizi konuşmak için
          ilk adımı atın.
        </p>
      </div>
      <section className="container contact-layout pb-24">
        <div>
          <div className="contact-story">
            <Leaf size={30} />
            <h2>
              Önce sizi
              <br />
              dinleyelim.
            </h2>
            <p>
              Her beslenme yolculuğu farklı. İlk iletişimde hedeflerinizi,
              günlük düzeninizi ve size uygun görüşme yöntemini konuşalım.
            </p>
            <div className="contact-channels">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("https:")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  <c.icon size={20} />
                  <span>
                    <small>{c.label}</small>
                    {c.value}
                  </span>
                </a>
              ))}
              {(siteConfig.address || siteConfig.city) && (
                <div>
                  <MapPin size={20} />
                  <span>
                    <small>Lokasyon</small>
                    {[siteConfig.address, siteConfig.city]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="small-note mt-5">
            Görüşme sıklığı ve takip kapsamı ilk iletişimde netleştirilir.
            Formdan mesaj hazırlamak randevu onayı değildir.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
