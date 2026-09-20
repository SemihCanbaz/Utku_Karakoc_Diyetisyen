import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
const errors = [];
let url;
try {
  url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
  if (
    url.protocol !== "https:" ||
    /localhost|127\.0\.0\.1|example\./.test(url.hostname)
  )
    throw new Error();
} catch {
  errors.push("Gerçek HTTPS alan adı: NEXT_PUBLIC_SITE_URL");
}
if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true")
  errors.push("Canlı indeksleme: NEXT_PUBLIC_ALLOW_INDEXING=true");
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
if (!email && !phone)
  errors.push("Gerçek iletişim e-postası veya WhatsApp numarası");
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  errors.push("Geçerli e-posta biçimi");
if (phone && !/^[1-9]\d{7,14}$/.test(phone))
  errors.push("WhatsApp numarası ülke koduyla yalnızca rakam olmalı");
for (const name of ["INSTAGRAM_URL", "LINKEDIN_URL", "BOOKING_URL"]) {
  const value = process.env["NEXT_PUBLIC_" + name];
  if (value) {
    try {
      if (new URL(value).protocol !== "https:") throw new Error();
    } catch {
      errors.push(name + " geçerli HTTPS bağlantısı olmalı");
    }
  }
}
if (errors.length) {
  console.error(
    "Yayın öncesi gerçek bilgi eksikleri:\n- " + errors.join("\n- "),
  );
  process.exitCode = 1;
} else
  console.log(
    "Teknik yayın ayarları tamam. Mesleki içerik, görsel izinleri ve veri aydınlatmasını ayrıca onaylayın.",
  );
