"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditForm, Field, ConfirmButton } from "./forms";
import { saveArticle, removeArticle } from "@/lib/portal/article-actions";
import { slugify } from "@/lib/portal/validation";
import type { ArticleRecord } from "@/lib/portal/article-validation";
export function ArticleForm({ article }: { article?: ArticleRecord }) {
  const router = useRouter();
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [sections, setSections] = useState(article?.sections || [{ title: "", paragraphs: [""], bullets: [] }]);
  const [sources, setSources] = useState(article?.sources || []);
  const [preview, setPreview] = useState(false);
  return <EditForm button="Makaleyi kaydet" onSaved={r => { if (!article && r.id) router.replace('/admin/makaleler/'+r.id); }} action={form => saveArticle({ ...Object.fromEntries(form), title, slug, sections, sources, cover_image: article?.cover_image || "", status: form.get("publish") === "yes" ? "published" : form.get("status") }, article?.id, form)}>
    <label>Başlık<input required maxLength={180} value={title} onChange={e => { setTitle(e.target.value); if (!article && (!slug || slug === slugify(title))) setSlug(slugify(e.target.value)); }} /></label>
    <label>URL adresi<input required value={slug} maxLength={200} readOnly={!!article?.published_at} onChange={e => setSlug(e.target.value)} /><small>/makaleler/{slug || "makale-basligi"}{article?.published_at ? " · Yayımlanan URL korunur." : ""}</small></label>
    <Field name="subtitle" label="Alt başlık" value={article?.subtitle} />
    <Field name="category" label="Kategori" value={article?.category || "Beslenme bilimi"} required />
    <Field name="description" label="SEO açıklaması (20–320 karakter)" type="textarea" value={article?.description} wide />
    <Field name="intro" label="Giriş paragrafı" type="textarea" value={article?.intro} wide />
    <Field name="reading_time" label="Okuma süresi" value={article?.reading_time || "5 dk"} required />
    <Field name="status" label="Yayın durumu" value={article?.status || "draft"} options={["Taslak","Yayında","Arşiv"]} values={["draft","published","archived"]} />
    <label>Kapak fotoğrafı (isteğe bağlı)<input name="image" type="file" accept="image/jpeg,image/png,image/webp" /><small>JPG, PNG veya WebP · En fazla 5 MB. Yeni dosya seçmezseniz mevcut kapak korunur.</small></label>
    <Field name="image_alt" label="Fotoğrafın alternatif metni" value={article?.image_alt} />
    <div className="portal-wide"><h2>Makale bölümleri</h2><p className="portal-muted">Her bölüm H2 başlığı olur. Paragrafları boş satırla, maddeleri satır satır ayırın.</p>
      {sections.map((section,i) => <section className="portal-meal-editor" key={i}>
        <label>Bölüm {i+1} başlığı<input required value={section.title} onChange={e=>setSections(sections.map((s,j)=>j===i?{...s,title:e.target.value}:s))} /></label>
        <label>Bölüm {i+1} metni<textarea rows={7} required value={section.paragraphs.join('\n\n')} onChange={e=>setSections(sections.map((s,j)=>j===i?{...s,paragraphs:e.target.value.split('\n\n')}:s))} /></label>
        <label>Bölüm {i+1} maddeleri (isteğe bağlı)<textarea rows={3} value={section.bullets?.join('\n') || ''} onChange={e=>setSections(sections.map((s,j)=>j===i?{...s,bullets:e.target.value ? e.target.value.split('\n') : []}:s))} /></label>
        <button type="button" className="portal-link" disabled={sections.length===1} onClick={()=>setSections(sections.filter((_,j)=>j!==i))}>Bölümü kaldır</button>
      </section>)}
      <button type="button" className="portal-button portal-button-secondary" onClick={()=>setSections([...sections,{title:'',paragraphs:[''],bullets:[]}])}>+ Bölüm ekle</button>
    </div>
    <Field name="takeaway" label="Öne çıkan sonuç" type="textarea" value={article?.takeaway} wide />
    <div className="portal-wide"><h2>Kaynaklar</h2>{sources.map((source,i)=><div className="portal-meal-editor" key={i}>
      <label>Kaynak {i+1}<input required value={source.label} onChange={e=>setSources(sources.map((s,j)=>j===i?{...s,label:e.target.value}:s))} /></label>
      <label>Kaynak {i+1} bağlantısı<input type="url" value={source.url || ''} onChange={e=>setSources(sources.map((s,j)=>j===i?{...s,url:e.target.value}:s))} /></label>
      <button type="button" className="portal-link" onClick={()=>setSources(sources.filter((_,j)=>j!==i))}>Kaynağı kaldır</button>
    </div>)}<button type="button" className="portal-button portal-button-secondary" onClick={()=>setSources([...sources,{label:'',url:''}])}>+ Kaynak ekle</button></div>
    <div className="portal-wide portal-actions"><button type="button" className="portal-button portal-button-secondary" onClick={()=>setPreview(!preview)}>{preview?'Önizlemeyi kapat':'Metni önizle'}</button><button type="submit" name="publish" value="yes" className="portal-button">Web sitesinde yayımla</button></div>
    {preview && <article className="portal-wide portal-article-preview"><p className="portal-eyebrow">METİN ÖNİZLEMESİ · KAYDEDİLMEDİ</p><h2>{title || 'Makale başlığı'}</h2>{sections.map((s,i)=><section key={i}><h3>{s.title}</h3>{s.paragraphs.map((p,j)=><p key={j}>{p}</p>)}<ul>{s.bullets?.map((b,j)=><li key={j}>{b}</li>)}</ul></section>)}</article>}
  </EditForm>;
}
export function RemoveArticleButton({id}:{id:string}) {
  const router=useRouter();
  return <ConfirmButton label="Makaleyi kaldır" title="Makale yayından kaldırılsın mı?" description="Makale web sitesinden ve yönetim listesinden kaldırılır. Veritabanındaki kopyası korunur." action={async()=>{const result=await removeArticle(id);if(result.success)router.push('/admin/makaleler');return result;}} />;
}
