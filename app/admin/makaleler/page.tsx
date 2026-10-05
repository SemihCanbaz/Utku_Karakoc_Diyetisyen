import Link from "next/link";
import { requireRole } from "@/lib/portal/auth";
import { PageTitle, Badge, Empty } from "@/components/portal/display";
import { Pagination } from "@/components/portal/pagination";
import { paginate } from "@/lib/portal/workflow";
export default async function ArticleAdmin({searchParams}:{searchParams:Promise<{q?:string;status?:string;page?:string}>}){
 const {client}=await requireRole('admin');const search=await searchParams;
 const {data,error}=await client.from('articles').select('id,title,slug,status,category,updated_at').is('deleted_at',null).order('updated_at',{ascending:false});
 if(error)throw new Error('Makaleler yüklenemedi.');
 const filtered=(data||[]).filter(a=>(!search.status||a.status===search.status)&&(!search.q||a.title.toLocaleLowerCase('tr').includes(search.q.toLocaleLowerCase('tr'))));
 const result=paginate(filtered,search.page);
 return <><PageTitle title="Makaleler" eyebrow="İÇERİK STÜDYOSU" action={<Link className="portal-button" href="/admin/makaleler/yeni">+ Yeni makale</Link>}/>
 <section className="portal-card"><p>Bilimsel yazılarınızı düzenleyin, taslak olarak saklayın ve hazır olduğunda web sitesinde paylaşın.</p><form className="portal-filters"><label>Makale ara<input name="q" defaultValue={search.q} placeholder="Başlık…"/></label><label>Yayın durumu<select name="status" defaultValue={search.status||''}><option value="">Tümü</option><option value="draft">Taslak</option><option value="published">Yayında</option><option value="archived">Arşiv</option></select></label><button className="portal-button">Filtrele</button><Link className="portal-link" href="/admin/makaleler">Temizle</Link></form></section>
 <section className="portal-card">{!filtered.length?<Empty>Bu filtrelerle eşleşen makale yok.</Empty>:<div className="portal-table-wrap"><table><thead><tr><th>Makale</th><th>Kategori</th><th>Durum</th><th>İşlem</th></tr></thead><tbody>{result.rows.map(a=><tr key={a.id}><td><strong>{a.title}</strong><small>/{a.slug}</small></td><td>{a.category}</td><td><Badge status={a.status}/></td><td><Link className="portal-link" href={'/admin/makaleler/'+a.id}>Düzenle →</Link>{a.status==='published'&&<Link className="portal-link" href={'/makaleler/'+a.slug}>Sitede gör ↗</Link>}</td></tr>)}</tbody></table></div>}</section>
 <Pagination params={search} page={result.page} pages={result.pages} total={filtered.length}/></>;
}
