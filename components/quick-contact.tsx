"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
export function QuickContact() {
  const panel = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (panel.current) panel.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && panel.current?.open) {
        panel.current.open = false;
        panel.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (panel.current?.open && !panel.current.contains(event.target as Node))
        panel.current.open = false;
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  if (!siteConfig.whatsapp && !siteConfig.phone) return null;
  return (
    <details ref={panel} className="quick-contact">
      <summary aria-label="Hızlı iletişim seçenekleri">
        <MessageCircle size={22} />
        <span>Birlikte konuşalım</span>
        <X size={21} className="quick-close" />
      </summary>
      <div className="quick-contact-panel">
        <p className="eyebrow">UTKU KARAKOÇ · DİYETİSYEN</p>
        <h2>İlk adım bir mesaj.</h2>
        <p>Online danışmanlık ve görüşme süreci hakkında bilgi alın.</p>
        {siteConfig.whatsapp && (
          <a
            className="action"
            href={
              "https://wa.me/" +
              siteConfig.whatsapp +
              "?text=" +
              encodeURIComponent(
                "Merhaba, online beslenme danışmanlığı hakkında bilgi almak istiyorum.",
              )
            }
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> WhatsApp’ta Yazın{" "}
            <ArrowUpRight size={16} />
          </a>
        )}
        {siteConfig.phone && (
          <a
            className="quick-phone"
            href={"tel:" + siteConfig.phone.replace(/[^+\d]/g, "")}
          >
            <Phone size={16} />
            {siteConfig.phone}
          </a>
        )}
        <Link href="/iletisim">İletişim formunu aç</Link>
        <small>
          WhatsApp bağlantısı harici uygulamayı açar. Mesajınızı orada
          gönderebilirsiniz.
        </small>
      </div>
    </details>
  );
}
