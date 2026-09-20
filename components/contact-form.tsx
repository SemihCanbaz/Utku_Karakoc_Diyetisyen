"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", contact: "", topic: "Online danışmanlık", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [prepared, setPrepared] = useState("");
  const [mailto, setMailto] = useState("");
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  function update(patch: Partial<typeof values>) {
    setValues((current) => ({ ...current, ...patch }));
    setPrepared("");
    setMailto("");
    setStatus("");
    setErrors({});
  }

  function buildMessage() {
    return (
      "Merhaba, ben " + values.name.trim() +
      ".\nKonu: " + values.topic +
      (values.contact.trim() ? "\nİletişim: " + values.contact.trim() : "") +
      (values.message.trim() ? "\nNot: " + values.message.trim() : "")
    );
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus(""); setPrepared(""); setMailto("");
    const next: Record<string, string> = {};
    if (values.name.trim().length < 2) next.name = "Lütfen adınızı yazın.";
    if (values.contact.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contact.trim()) && !(/^\+?[\d\s()-]{8,25}$/.test(values.contact.trim()) && /^\d{8,15}$/.test(values.contact.replace(/\D/g, "")))) next.contact = "Geçerli bir telefon veya e-posta yazın.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }

    const message = buildMessage();
    setPrepared(message);
    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.message || "Mesaj gönderilemedi.");
      if (data.delivered) {
        setStatus("Mesajınız e-posta ile iletildi. En kısa sürede dönüş yapılacaktır.");
        setPrepared("");
        setValues({ name: "", contact: "", topic: "Online danışmanlık", message: "", website: "" });
      } else {
        setMailto(data.mailto || "");
        setStatus("Mesajınız hazır. Sunucuda e-posta servisi etkin değil; e-posta uygulamanızdan tek tıkla gönderebilirsiniz.");
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Mesaj gönderilemedi. Lütfen WhatsApp veya e-posta kanalını kullanın.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={form} noValidate onSubmit={submit} className="contact-form panel">
      <p className="eyebrow">TANIŞMAK İÇİN İLK ADIM</p>
      <h2>Bir görüşme planlayalım.</h2>
      <p className="form-hint">Kısaca hedefinizden söz edin. Ayrıntıları ilk görüşmede konuşabiliriz.</p>
      <div className="form-fields">
        <label className="field"><span>Adınız</span><input autoComplete="name" maxLength={100} value={values.name} onChange={(e) => update({ name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <small className="field-error" id="name-error">{errors.name}</small>}</label>
        <label className="field"><span>Telefon veya e-posta <small>(isteğe bağlı)</small></span><input maxLength={180} value={values.contact} onChange={(e) => update({ contact: e.target.value })} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-error" : undefined} />{errors.contact && <small className="field-error" id="contact-error">{errors.contact}</small>}</label>
        <label className="field"><span>Görüşme konusu</span><select value={values.topic} onChange={(e) => update({ topic: e.target.value })}><option>Online danışmanlık</option><option>Kilo yönetimi</option><option>Sporcu beslenmesi</option><option>Klinik beslenme</option><option>Kurumsal danışmanlık</option><option>Diğer</option></select></label>
        <label className="field"><span>Paylaşmak istediğiniz kısa not <small>(isteğe bağlı)</small></span><textarea rows={4} maxLength={1000} value={values.message} onChange={(e) => update({ message: e.target.value })} placeholder="Günlük düzeniniz veya görüşme beklentiniz…" /></label>
        <label className="contact-honeypot" aria-hidden="true"><span>Web sitesi</span><input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => update({ website: e.target.value })} /></label>
        <p className="form-privacy">Form bilgileri yalnızca görüşme talebinizi iletmek amacıyla kullanılır. Tahlil, tanı veya ayrıntılı sağlık bilgisi paylaşmayın. <Link href="/gizlilik">Veri kullanımı hakkında</Link></p>
        <button className="action w-full" disabled={sending}>{sending ? <><LoaderCircle className="contact-spinner" size={17} /> İletiliyor…</> : <><Mail size={17} /> Görüşme Talebini İlet <ArrowUpRight size={17} /></>}</button>
        {status && <div className="contact-result" role="status"><Check size={18} /><p>{status}</p></div>}
        {prepared && mailto && (
          <div className="prepared-message">
            <label className="field"><span>Hazırlanan mesaj</span><textarea readOnly value={prepared} rows={5} /></label>
            <a className="action w-full mt-4" href={mailto}>E-posta Uygulamasında Gönder <ArrowUpRight size={17} /></a>
            {siteConfig.whatsapp && <a className="action action-outline w-full mt-3" href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(prepared)}`} target="_blank" rel="noreferrer">WhatsApp’ta Gönder <ArrowUpRight size={17} /></a>}
            <button type="button" className="text-link contact-copy" onClick={async () => { try { await navigator.clipboard.writeText(prepared); setStatus("Mesaj kopyalandı."); } catch { setStatus("Kopyalama başarısız oldu; mesaj alanından manuel kopyalayabilirsiniz."); } }}><Copy size={15} /> Mesajı kopyala</button>
          </div>
        )}
      </div>
    </form>
  );
}
