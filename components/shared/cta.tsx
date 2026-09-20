import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./animated-section";
export function ConsultationCta() {
  return (
    <section className="section-space">
      <div className="container">
        <AnimatedSection className="consultation-cta">
          <div>
            <p className="eyebrow">KÜÇÜK BİR ADIMLA BAŞLAYALIM</p>
            <h2>
              Görüşme planlamak
              <br />
              <em>ister misiniz?</em>
            </h2>
            <p>
              Hedeflerinizi konuşalım, size uygun başlangıcı birlikte
              belirleyelim.
            </p>
          </div>
          <Link href="/randevu" className="action action-gold">
            Görüşme Planla <ArrowUpRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
