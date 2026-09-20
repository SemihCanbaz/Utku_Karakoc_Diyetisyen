export type Service = {
  slug: string;
  title: string;
  category: string;
  description: string;
  intro: string;
  highlights: string[];
  process: string[];
  note?: string;
  relatedGuide?: string;
};

export const services: Service[] = [
  {
    slug: "online-beslenme-danismanligi",
    title: "Online beslenme danışmanlığı",
    category: "Danışmanlık",
    description: "Bulunduğunuz yerden değerlendirme, kişisel planlama ve düzenli geri bildirimle ilerleyen online danışmanlık süreci.",
    intro: "Günlük düzeniniz, hedefleriniz ve beslenme alışkanlıklarınız çevrim içi görüşmelerle birlikte değerlendirilir. Amaç; uygulanabilir, anlaşılır ve sürdürülebilir bir düzen oluşturmaktır.",
    highlights: ["Çevrim içi görüşme", "Kişisel planlama", "Düzenli geri bildirim", "İhtiyaca göre plan güncelleme"],
    process: ["Ön görüşme ve beklentilerin belirlenmesi", "Günlük düzen ve beslenme alışkanlıklarının değerlendirilmesi", "Uygulanabilir seçeneklerin planlanması", "Takip ve geri bildirimlerle güncelleme"],
  },
  {
    slug: "kilo-verme",
    title: "Kilo verme danışmanlığı",
    category: "Kilo yönetimi",
    description: "Katı yasaklar yerine günlük yaşama uyum sağlayan, sürdürülebilir kilo yönetimi yaklaşımı.",
    intro: "Kilo yönetiminde yalnızca tartı değişimine değil; öğün düzeni, tokluk, hareket, uyku, sosyal yaşam ve sürdürülebilir alışkanlıklara birlikte bakılır.",
    highlights: ["Kişisel hedef belirleme", "Porsiyon ve öğün düzeni", "Sürdürülebilir alışkanlıklar", "Düzenli takip"],
    process: ["Mevcut düzenin değerlendirilmesi", "Gerçekçi hedeflerin belirlenmesi", "Günlük yaşama uygun plan", "Takip ve düzenli revizyon"],
  },
  {
    slug: "kilo-alma",
    title: "Kilo alma danışmanlığı",
    category: "Kilo yönetimi",
    description: "Enerji ve besin kalitesini birlikte ele alan, kontrollü ve kişisel kilo artışı yaklaşımı.",
    intro: "Kilo alma sürecinde amaç yalnızca daha fazla yemek değil; enerji yoğunluğu, protein yeterliliği, öğün sıklığı ve sindirim toleransını birlikte değerlendirmektir.",
    highlights: ["Enerji yoğunluğu planlaması", "Protein yeterliliği", "Pratik ara öğünler", "Toleransa göre ilerleme"],
    process: ["Günlük enerji ve öğün düzeninin değerlendirilmesi", "Uygun porsiyon ve öğün sıklığının planlanması", "Pratik enerji artırma stratejileri", "Takip ve toleransa göre güncelleme"],
  },
  {
    slug: "sporcu-beslenmesi",
    title: "Sporcu beslenmesi",
    category: "Performans",
    description: "Antrenman düzeni, hedef ve günlük yaşamla uyumlu enerji, protein ve öğün zamanlaması planlaması.",
    intro: "Sporcu beslenmesinde tek bir makro oranı herkese uymaz. Antrenman türü, sıklığı, hedef, toparlanma ve günlük yaşam birlikte değerlendirilir.",
    highlights: ["Antrenman çevresi öğün planı", "Protein ve enerji yeterliliği", "Hidrasyon", "Performans ve toparlanma odağı"],
    process: ["Antrenman düzeninin analizi", "Enerji ve protein ihtiyacının çerçevelenmesi", "Antrenman öncesi/sonrası seçenekler", "Performans geri bildirimiyle revizyon"],
  },
  {
    slug: "pcos-beslenmesi",
    title: "PCOS beslenmesi",
    category: "Kadın sağlığı",
    description: "PCOS'ta beslenme düzenini günlük yaşam, kilo yönetimi gereksinimi ve hekim takibiyle birlikte ele alan yaklaşım.",
    intro: "PCOS'ta beslenme planı kişisel belirtiler, yaşam tarzı, varsa kilo yönetimi hedefi ve tıbbi takip ile birlikte değerlendirilmelidir. Tek bir beslenme modeli herkes için zorunlu değildir.",
    highlights: ["Öğün düzeni", "Lif ve protein dengesi", "Sürdürülebilir kilo yönetimi", "Hekim takibiyle uyum"],
    process: ["Mevcut beslenme düzeninin değerlendirilmesi", "Kişisel hedef ve önceliklerin belirlenmesi", "Uygulanabilir öğün örüntüsü", "Takip ve toleransa göre düzenleme"],
    note: "PCOS tanısı ve tıbbi tedavisi hekim tarafından yürütülür; beslenme danışmanlığı tedavinin yerine geçmez.",
  },
  {
    slug: "insulin-direnci",
    title: "İnsülin direncinde beslenme",
    category: "Metabolik sağlık",
    description: "İnsülin direncinde günlük öğün düzeni, hareket ve sürdürülebilir alışkanlıkları birlikte ele alan danışmanlık.",
    intro: "İnsülin direnci ve prediyabette beslenme yaklaşımı, kişinin günlük düzeni, fiziksel aktivitesi ve tıbbi değerlendirmesiyle birlikte şekillendirilir.",
    highlights: ["Öğün planlama", "Karbonhidrat farkındalığı", "Lif ve protein dengesi", "Yaşam tarzı düzeni"],
    process: ["Günlük düzenin değerlendirilmesi", "Öğün ve porsiyon örüntüsünün planlanması", "Sürdürülebilir hareket ve beslenme hedefleri", "Takip ve geri bildirim"],
    relatedGuide: "insulin-direnci-beslenme",
  },
  {
    slug: "diyabette-beslenme",
    title: "Diyabette beslenme danışmanlığı",
    category: "Metabolik sağlık",
    description: "Diyabette öğün planlama ve günlük beslenme düzenini mevcut tıbbi tedaviyle uyumlu biçimde değerlendirme.",
    intro: "Diyabette beslenme; öğün zamanı, karbonhidrat miktarı, fiziksel aktivite ve kullanılan ilaçlarla birlikte düşünülmelidir. Beslenme planı hekim tedavisinin yerine geçmez.",
    highlights: ["Öğün zamanı", "Karbonhidrat farkındalığı", "Porsiyon planlama", "Tedavi düzeniyle uyum"],
    process: ["Mevcut öğün düzeninin değerlendirilmesi", "Tedavi ve günlük yaşamla uyumlu plan", "Dışarıda yeme ve alternatiflerin konuşulması", "Takip ve beslenme eğitimi"],
    note: "İlaç ve insülin dozları yalnızca ilgili sağlık profesyoneli tarafından düzenlenmelidir.",
    relatedGuide: "diyabette-beslenme",
  },
  {
    slug: "bobrek-hastaliklarinda-beslenme",
    title: "Böbrek hastalıklarında beslenme",
    category: "Klinik beslenme",
    description: "Böbrek sağlığında protein, sodyum, potasyum ve sıvı gibi başlıkların tıbbi bulgularla birlikte değerlendirilmesine yönelik danışmanlık.",
    intro: "Böbrek hastalıklarında beslenme gereksinimleri hastalığın evresi, laboratuvar sonuçları, kullanılan ilaçlar ve tedavi biçimine göre önemli ölçüde değişebilir.",
    highlights: ["Laboratuvar sonuçlarıyla uyum", "Protein değerlendirmesi", "Sodyum ve mineral dengesi", "Sıvı planlamasında tıbbi yönlendirme"],
    process: ["Hekim tanısı ve mevcut planın gözden geçirilmesi", "Beslenme alışkanlıklarının değerlendirilmesi", "Kişiye uygun besin seçimleri", "Kontrollerle birlikte güncelleme"],
    note: "Böbrek hastalıklarında sıvı, potasyum ve protein kısıtlamaları kişiden kişiye değişir; genel internet önerileriyle uygulanmamalıdır.",
  },
  {
    slug: "kalp-damar-hastaliklarinda-beslenme",
    title: "Kalp-damar sağlığında beslenme",
    category: "Klinik beslenme",
    description: "Kalp-damar sağlığını destekleyen beslenme örüntülerini, sodyum ve yağ kalitesini kişisel ihtiyaçlarla birlikte ele alma.",
    intro: "Kalp-damar sağlığında beslenme planı yalnızca tek bir besini çıkarmaya değil, genel beslenme örüntüsüne, yağ kalitesine, sodyum alımına ve sürdürülebilir alışkanlıklara odaklanır.",
    highlights: ["Yağ kalitesi", "Sodyum farkındalığı", "Sebze ve lif çeşitliliği", "Günlük yaşama uyum"],
    process: ["Mevcut beslenme örüntüsünün değerlendirilmesi", "Öncelikli değişikliklerin belirlenmesi", "Alışveriş ve öğün planı", "Takip ve sürdürülebilirlik"],
    relatedGuide: "hipertansiyonda-beslenme",
  },
  {
    slug: "gebelikte-beslenme",
    title: "Gebelikte beslenme danışmanlığı",
    category: "Kadın sağlığı",
    description: "Gebelik döneminde yeterli ve dengeli beslenmeyi, öğün düzenini ve gıda güvenliğini kişisel gereksinimlerle birlikte değerlendirme.",
    intro: "Gebelikte enerji ve besin gereksinimleri dönemlere göre değişebilir. Beslenme planı tıbbi takip, iştah, bulantı, kilo seyri ve kişisel ihtiyaçlarla birlikte ele alınmalıdır.",
    highlights: ["Yeterli enerji ve protein", "Gıda güvenliği", "Öğün düzeni", "Tıbbi takip ile uyum"],
    process: ["Gebelik haftası ve günlük düzenin değerlendirilmesi", "Öğün ve ara öğün planlama", "Gıda güvenliği ve pratik seçenekler", "Takip ve gerektiğinde güncelleme"],
    note: "Takviye kullanımı ve gebelikte tıbbi takip hekim değerlendirmesi gerektirir.",
  },
  {
    slug: "cocuk-ve-ergen-beslenmesi",
    title: "Çocuk ve ergen beslenmesi",
    category: "Aile beslenmesi",
    description: "Büyüme döneminde öğün düzeni, besin çeşitliliği ve aile ortamını yaşa uygun şekilde ele alan danışmanlık.",
    intro: "Çocuk ve ergenlerde hedef yetişkinlerdeki gibi yalnızca kilo odaklı olmamalıdır. Büyüme, gelişme, aile düzeni, okul yaşamı ve besinle ilişki birlikte değerlendirilir.",
    highlights: ["Yaşa uygun öğün düzeni", "Besin çeşitliliği", "Aile katılımı", "Büyüme ve gelişme odağı"],
    process: ["Aile ve günlük düzenin değerlendirilmesi", "Yaşa uygun beslenme hedefleri", "Okul ve ev öğünlerinin planlanması", "Aileyle birlikte takip"],
    note: "Çocuk ve ergenlerde büyüme eğrileri ve sağlık durumu pediatri ekibiyle birlikte değerlendirilmelidir.",
  },
  {
    slug: "kurumsal-beslenme-danismanligi",
    title: "Kurumsal beslenme danışmanlığı",
    category: "Kurumsal",
    description: "Çalışanlara yönelik beslenme eğitimi, seminer ve iş yaşamına uyarlanmış içerik planlaması.",
    intro: "Kurumsal programlar tek tip diyet listesi dağıtmak yerine, çalışanların günlük iş akışında kullanabileceği beslenme okuryazarlığı ve pratik alışkanlıklar üzerine kurgulanır.",
    highlights: ["Beslenme seminerleri", "Atölye ve eğitim", "İş yaşamına uygun pratikler", "Kuruma özel içerik planı"],
    process: ["Kurum ihtiyacının belirlenmesi", "Hedef kitle ve format planlama", "Eğitim/atölye içeriğinin hazırlanması", "Geri bildirim ve devam planı"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
