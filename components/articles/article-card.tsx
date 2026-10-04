import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Dumbbell,
  Sprout,
  Scale,
  FlaskConical,
} from "lucide-react";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  const Icon =
    article.category === "Sporcu beslenmesi"
      ? Dumbbell
      : article.category === "Kilo yönetimi"
        ? Scale
        : article.category === "Gıda okuryazarlığı"
          ? Sprout
          : FlaskConical;
  return (
    <Link href={`/makaleler/${article.slug}`} className="article-card">
      <div className="article-card-top">
        <span className="article-topic-icon">
          <Icon size={25} aria-hidden="true" />
        </span>
        <span>{article.category}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <div className="article-card-meta">
        <span>
          <Clock3 size={14} /> {article.readingTime}
        </span>
        <span>
          <BookOpen size={14} /> Kaynaklı içerik
        </span>
        <ArrowUpRight size={17} />
      </div>
    </Link>
  );
}
