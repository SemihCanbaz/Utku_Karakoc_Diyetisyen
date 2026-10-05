import { requireRole } from "@/lib/portal/auth";
import { PageTitle } from "@/components/portal/display";
import { ArticleForm } from "@/components/portal/article-form";
export default async function NewArticle(){await requireRole('admin');return <><PageTitle title="Yeni makale" eyebrow="İÇERİK STÜDYOSU"/><section className="portal-card"><ArticleForm/></section></>;}
