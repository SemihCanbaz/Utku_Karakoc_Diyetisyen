import { NextResponse } from "next/server";

export const runtime = "nodejs";

function clean(value: unknown, max = 1000) {
  return String(value ?? "").replace(/\0/g, "").trim().slice(0, max);
}
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, message: "Geçersiz istek." }, { status: 400 });

  const name = clean(body.name, 100);
  const contact = clean(body.contact, 180);
  const topic = clean(body.topic, 120);
  const message = clean(body.message, 1200);
  const website = clean(body.website, 100);
  if (website) return NextResponse.json({ ok: true, delivered: true });
  if (name.length < 2) return NextResponse.json({ ok: false, message: "Ad alanını kontrol edin." }, { status: 400 });

  const recipient = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "semihcanbaz431043@gmail.com";
  const subject = `Web sitesi görüşme talebi · ${topic || "Genel"}`;
  const text = [
    `Ad Soyad: ${name}`,
    contact ? `İletişim: ${contact}` : "İletişim: belirtilmedi",
    `Konu: ${topic || "Genel"}`,
    message ? `Mesaj: ${message}` : "Mesaj: belirtilmedi",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (apiKey && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        subject,
        reply_to: contact.includes("@") ? contact : undefined,
        text,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#213829"><h2>Yeni görüşme talebi</h2><p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p><p><strong>İletişim:</strong> ${escapeHtml(contact || "Belirtilmedi")}</p><p><strong>Konu:</strong> ${escapeHtml(topic || "Genel")}</p><p><strong>Mesaj:</strong><br>${escapeHtml(message || "Belirtilmedi").replace(/\n/g, "<br>")}</p></div>`,
      }),
    });
    if (response.ok) return NextResponse.json({ ok: true, delivered: true });
    const detail = await response.text().catch(() => "");
    console.error("Contact email provider error", response.status, detail.slice(0, 300));
  }

  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  return NextResponse.json({ ok: true, delivered: false, mailto });
}
