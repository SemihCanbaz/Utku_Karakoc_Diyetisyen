function httpsUrl(value?: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
function siteUrl(value?: string) {
  try {
    const url = new URL(value || "http://localhost:3000");
    return ["http:", "https:"].includes(url.protocol)
      ? url.origin
      : "http://localhost:3000";
  } catch {
    return "http://localhost:3000";
  }
}
export const siteConfig = {
  siteName: "Utku Karakoç Diyetisyen",
  personName: "Utku Karakoç",
  role: "Diyetisyen",
  description:
    "Günlük yaşamınıza uyum sağlayan kişisel beslenme danışmanlığı. Online görüşme, sürdürülebilir alışkanlıklar ve mutfağınıza ilham veren tarifler.",
  url: siteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "Dyt.utkukarakoc@outlook.com",
  phone: process.env.NEXT_PUBLIC_PHONE?.trim() || "0554 206 21 26",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "905542062126",
  instagram: httpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL) || "https://www.instagram.com/dyt.utkukarakoc/",
  linkedin: httpsUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS?.trim() || "",
  city: process.env.NEXT_PUBLIC_CITY?.trim() || "",
  bookingUrl: httpsUrl(process.env.NEXT_PUBLIC_BOOKING_URL),
  allowIndexing:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
    /^https:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL || ""),
};
export const navigation = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımda", href: "/hakkimda" },
  { name: "Danışmanlık", href: "/danismanlik" },
  { name: "Tarifler", href: "/tarifler" },
  { name: "Makaleler", href: "/makaleler" },
  { name: "Araçlar", href: "/hesaplayicilar" },
  { name: "İletişim", href: "/iletisim" },
];
