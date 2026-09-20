import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { siteConfig } from "@/lib/site-config";
export default function Footer() {
  const hasContact = siteConfig.email || siteConfig.phone || siteConfig.address;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Utku Karakoç ana sayfa">
              <Brand light />
            </Link>
            <p>
              İyi beslenmek, hayatın bir parçası.
              <br />
              Size özgü, uygulanabilir, sürdürülebilir.
            </p>
            <div className="social-links">
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram />
                </a>
              )}
              {siteConfig.linkedin && (
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
              )}
            </div>
          </div>
          <nav aria-label="Footer menüsü">
            <h2>KEŞFEDİN</h2>
            <Link href="/hakkimda">Yaklaşımım</Link>
            <Link href="/danismanlik">Danışmanlık alanları</Link>
            <Link href="/vip-diyet">Online danışmanlık</Link>
            <Link href="/randevu">Görüşme planlayın</Link>
            <Link href="/iletisim">İletişim</Link>
          </nav>
          <nav aria-label="Kaynaklar">
            <h2>GÜNLÜK YAŞAMA İLHAM</h2>
            <Link href="/tarifler">Tarif kütüphanesi</Link>
            <Link href="/makaleler">Bilimsel makaleler</Link>
            <Link href="/hesaplayicilar">7 ücretsiz araç</Link>
            <Link href="/beslenme-rehberi">Hastalıklarda beslenme</Link>
            <Link href="/tarifler/kremali-ispanakli-somon">
              Haftanın tarif fikri <ArrowUpRight size={14} />
            </Link>
          </nav>
          <div className="footer-contact">
            <h2>{hasContact ? "İLETİŞİM" : "TANIŞALIM"}</h2>
            {siteConfig.email && (
              <a href={"mailto:" + siteConfig.email}>{siteConfig.email}</a>
            )}
            {siteConfig.phone && (
              <a href={"tel:" + siteConfig.phone.replace(/[^+\d]/g, "")}>
                {siteConfig.phone}
              </a>
            )}
            {siteConfig.address && <p>{siteConfig.address}</p>}
            {!hasContact && (
              <p>
                Beslenme hedeflerinizi ve günlük düzeninizi birlikte konuşalım.
              </p>
            )}
            <Link href="/iletisim" className="footer-contact-link">
              İlk adımı atın <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <p className="health-footer">
          İçerikler ve hesaplamalar genel bilgilendirme amaçlıdır; kişisel
          beslenme planı, tanı veya tedavi yerine geçmez.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Utku Karakoç</span>
          <div>
            <Link href="/gizlilik">Gizlilik</Link>
            <Link href="/kvkk">Kişisel veriler</Link>
            <Link href="/kullanim-kosullari">Kullanım koşulları</Link>
          </div>
          <span>Beslenmeye özenle.</span>
        </div>
      </div>
    </footer>
  );
}
