import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Baby,
  Building2,
  CalendarDays,
  Dumbbell,
  HeartPulse,
  Leaf,
  Scale,
  ShieldPlus,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import type { Service } from "@/lib/services";

const iconMap: Record<string, typeof Leaf> = {
  "online-beslenme-danismanligi": CalendarDays,
  "kilo-verme": Scale,
  "kilo-alma": TrendingUp,
  "sporcu-beslenmesi": Dumbbell,
  "pcos-beslenmesi": Activity,
  "insulin-direnci": HeartPulse,
  "diyabette-beslenme": ShieldPlus,
  "bobrek-hastaliklarinda-beslenme": HeartPulse,
  "kalp-damar-hastaliklarinda-beslenme": HeartPulse,
  "gebelikte-beslenme": Baby,
  "cocuk-ve-ergen-beslenmesi": UsersRound,
  "kurumsal-beslenme-danismanligi": Building2,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.slug] || Leaf;
  return (
    <Link href={`/danismanlik/${service.slug}`} className="service-seo-card">
      <div>
        <span className="icon-badge"><Icon /></span>
        <span className="service-seo-category">{service.category}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="service-seo-link">Detayları inceleyin <ArrowUpRight size={16} /></span>
    </Link>
  );
}
