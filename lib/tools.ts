export type ToolDefinition = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
};

export const tools: ToolDefinition[] = [
  { slug: "bmi-hesaplama", title: "BMI / Vücut Kitle İndeksi Hesaplama", shortTitle: "BMI Hesaplama", description: "Boy ve kilo üzerinden yetişkinler için vücut kitle indeksini ve genel referans aralığını hesaplayın.", category: "Vücut ölçümleri" },
  { slug: "gunluk-kalori-ihtiyaci", title: "Günlük Kalori İhtiyacı Hesaplama", shortTitle: "Günlük Kalori İhtiyacı", description: "Mifflin–St Jeor ve hareket katsayısı kullanılarak yaklaşık günlük toplam enerji harcamanızı görün.", category: "Enerji" },
  { slug: "bazal-metabolizma-hizi", title: "Bazal Metabolizma Hızı Hesaplama", shortTitle: "Bazal Metabolizma Hızı", description: "Mifflin–St Jeor denklemiyle dinlenme enerji harcamanız için yaklaşık BMR değerini hesaplayın.", category: "Enerji" },
  { slug: "makro-besin-ihtiyaci", title: "Makro Besin İhtiyacı Hesaplama", shortTitle: "Makro Besin İhtiyacı", description: "Günlük enerji hedefinizi protein, karbonhidrat ve yağ yüzdelerine göre gram cinsinden dağıtın.", category: "Besin dağılımı" },
  { slug: "su-ihtiyaci", title: "Günlük Su İhtiyacı Hesaplama", shortTitle: "Su İhtiyacı", description: "Kilonuza göre 30 ml/kg temel yaklaşımıyla kaba bir günlük sıvı referansı görün.", category: "Hidrasyon" },
  { slug: "ideal-kilo-hesaplama", title: "Referans Ağırlık / İdeal Kilo Hesaplama", shortTitle: "İdeal Kilo Hesaplama", description: "Boyunuza göre BMI 22 orta noktasını kullanarak yalnızca genel bir referans ağırlık tahmini görün.", category: "Vücut ölçümleri" },
  { slug: "bel-boy-orani", title: "Bel / Boy Oranı Hesaplama", shortTitle: "Bel / Boy Oranı", description: "Bel çevrenizin boyunuza oranını hesaplayın ve sonucu genel tarama eşiğiyle birlikte görün.", category: "Vücut ölçümleri" },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
