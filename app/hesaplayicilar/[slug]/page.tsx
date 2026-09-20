import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { StandaloneCalculator } from "@/components/calculator/standalone-calculator";
import { getTool, tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props) {
  const tool = getTool((await params).slug);
  return tool ? pageMetadata(tool.title, tool.description, `/hesaplayicilar/${tool.slug}`) : { title: "Araç bulunamadı" };
}

export default async function ToolPage({ params }: Props) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  return (
    <>
      <div className="container page-top tool-detail-top">
        <Link href="/hesaplayicilar" className="text-link"><ArrowLeft size={15} /> Tüm hesaplama araçları</Link>
        <p className="eyebrow">{tool.category} · ÜCRETSİZ ARAÇ</p>
        <h1>{tool.title}</h1>
        <p className="intro">{tool.description}</p>
        <p className="scope-note"><ShieldCheck size={15} /> Bu araç genel tahmin verir; tıbbi değerlendirme veya kişisel beslenme reçetesi değildir.</p>
      </div>
      <section className="container tool-detail-section"><StandaloneCalculator tool={tool} /></section>
    </>
  );
}
