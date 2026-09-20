import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Guide } from "@/lib/guides";
export function GuideCard({
  guide,
  heading: Heading = "h3",
}: {
  guide: Guide;
  heading?: "h2" | "h3";
}) {
  return (
    <Link href={"/beslenme-rehberi/" + guide.slug} className="guide-card">
      <div className="guide-card-top">
        <span>{guide.category}</span>
        <span>{guide.number}</span>
      </div>
      <Heading>{guide.title}</Heading>
      <p>{guide.description}</p>
      <span className="guide-card-link">
        Rehberi okuyun <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
