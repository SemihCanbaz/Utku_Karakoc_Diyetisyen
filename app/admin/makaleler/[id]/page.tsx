import Link from "next/link";
import { notFound } from "next/navigation";
import { requireRole } from "@/lib/portal/auth";
import { uuid } from "@/lib/portal/validation";
import { PageTitle, Badge } from "@/components/portal/display";
import { ArticleForm, RemoveArticleButton } from "@/components/portal/article-form";
export default async function EditArticle({params}:{params:Promise<{id:string}>}){
 const {client}=await requireRole('admin');const {id}=await params;if(!uuid.safeParse(id).success)notFound();
 const {data,error}=await client.from('articles').select('*').eq('id',id).is('deleted_at',null).maybeSingle();
 if(error)throw new Error('Makale yüklenemedi.');if(!data)notFound();
 return <><Link className="portal-link" href="/admin/makaleler">← Makalelere dön</Link><PageTitle title={data.title} eyebrow="MAKALE DÜZENLE" action={<Badge status={data.status}/>}/><section className="portal-card"><ArticleForm article={data}/><hr/><RemoveArticleButton id={id}/></section></>;
}
