import Link from "next/link";
import { ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import type { Article } from "@/lib/articles";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/makaleler/${article.slug}`} className="article-card">
      <div className="article-card-top">
        <span>{article.number}</span>
        <span>{article.category}</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <div className="article-card-meta">
        <span><Clock3 size={14} /> {article.readingTime}</span>
        <span><BookOpen size={14} /> Kaynaklı içerik</span>
        <ArrowUpRight size={17} />
      </div>
    </Link>
  );
}
