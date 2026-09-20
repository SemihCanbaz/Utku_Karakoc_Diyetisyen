export type Guide = {
  slug: string;
  title: string;
  category: string;
  description: string;
  number: string;
  intro: string;
  sections: { title: string; text: string }[];
  questions: string[];
  takeaway: string;
  source: { title: string; url: string };
  related: string[];
};
export const guides: Guide[] = [
  {
    slug: "diyabette-beslenme",
    title: "Diyabette beslenme",
    category: "Metabolik sağlık",
    number: "01",
    description:
      "Diyabette öğün planlama, karbonhidrat farkındalığı ve kişisel beslenme düzenine dair başlangıç rehberi.",
    intro:
      "Diyabette beslenme planı; ne yediğiniz kadar porsiyon, öğün zamanı, ilaçlar ve günlük hareketinizle birlikte değerlendirilir. Herkes için aynı öğün düzeni uygun değildir.",
    sections: [
      {
        title: "Tabağın bütününe bakın",
        text: "Sebze, protein kaynakları ve lif içeren karbonhidratları birlikte düşünmek öğün planlamasını kolaylaştırabilir. Tabak yöntemi veya karbonhidrat sayımı gibi yöntemlerden hangisinin size uygun olduğu sağlık ekibinizle belirlenir.",
      },
      {
        title: "Öğün zamanını tedavinizle birlikte düşünün",
        text: "İnsülin veya bazı diyabet ilaçları kullanıldığında öğün atlamak ya da geciktirmek kan şekerinin düşmesine yol açabilir. Öğün ve egzersiz düzenindeki değişiklikleri sağlık ekibinizle konuşun; ilaç dozunu kendiniz değiştirmeyin.",
      },
      {
        title: "Sürdürülebilir seçenekler oluşturun",
        text: "Sevdiğiniz besinleri tamamen dışlamak yerine porsiyonları ve tüketim sıklığını değerlendirmek mümkün olabilir. Günlük iş düzeni, alışveriş olanakları ve öğün tercihleri uygulanabilir bir planın parçasıdır.",
      },
    ],
    questions: [
      "Öğün saatlerim ilaç düzenimle uyumlu mu?",
      "Benim için hangi öğün planlama yöntemi daha uygun?",
      "Dışarıda yemek yerken porsiyonları nasıl değerlendirebilirim?",
    ],
    takeaway:
      "Tek bir “diyabet menüsü” yerine, tedaviniz ve günlük yaşamınızla uyumlu bir plan üzerinde çalışın.",
    source: {
      title: "NIDDK · Healthy Living with Diabetes",
      url: "https://www.niddk.nih.gov/health-information/diabetes/overview/healthy-living-with-diabetes",
    },
    related: ["insulin-direnci-beslenme", "hipertansiyonda-beslenme"],
  },
  {
    slug: "insulin-direnci-beslenme",
    title: "İnsülin direnci ve beslenme",
    category: "Metabolik sağlık",
    number: "02",
    description:
      "İnsülin direnci ve prediyabette beslenme, hareket ve sürdürülebilir alışkanlıkların rolünü keşfedin.",
    intro:
      "İnsülin direnci, vücudun insüline yanıtının azalmasıdır. Prediyabet ise kan şekerinin normalin üzerinde olduğu, ancak diyabet tanı sınırına ulaşmadığı bir durumdur. Tanı değerlendirmesini hekim yapar.",
    sections: [
      {
        title: "Başlangıç noktası günlük düzeniniz",
        text: "Besin seçimleri, fiziksel aktivite ve yeterli uyku birlikte ele alınır. Düzeninizi gözlemlemek, hangi alışkanlıkları sürdürebildiğinizi ve hangi noktalarda desteğe ihtiyaç duyduğunuzu görmenize yardımcı olur.",
      },
      {
        title: "Hedefler kişisel olmalı",
        text: "Fazla kilosu olan kişilerde sağlık ekibiyle planlanan kilo yönetimi tip 2 diyabet riskinin azaltılmasına yardımcı olabilir. Herkesin kilo vermesi gerektiği veya aynı hızda ilerleyeceği varsayılmaz.",
      },
      {
        title: "Takip yalnızca tartıdan ibaret değildir",
        text: "Kan şekeri kontrolleri ve gerekli tedavi hekim tarafından değerlendirilir. Beslenme danışmanlığında planın uygulanabilirliği, alışkanlıklar ve yaşanan güçlükler konuşulur; tedavi değişiklikleri hekiminizle yapılır.",
      },
    ],
    questions: [
      "Benim için hangi yaşam tarzı hedefleri öncelikli?",
      "Kontrollerimi hangi sıklıkta yaptırmalıyım?",
      "Günlük hareketimi sürdürülebilir biçimde nasıl artırabilirim?",
    ],
    takeaway:
      "Kısa süreli katı kurallar yerine, takip edebileceğiniz küçük ve kalıcı adımlar belirleyin.",
    source: {
      title: "NIDDK · Insulin Resistance & Prediabetes",
      url: "https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/prediabetes-insulin-resistance",
    },
    related: ["diyabette-beslenme", "hipertansiyonda-beslenme"],
  },
  {
    slug: "ibs-beslenme",
    title: "IBS ve beslenme",
    category: "Sindirim sağlığı",
    number: "03",
    description:
      "İrritabl bağırsak sendromunda kişisel tolerans, lif ve düşük FODMAP yaklaşımına dair temel bilgiler.",
    intro:
      "İrritabl bağırsak sendromunda (IBS) aynı besin herkeste aynı etkiyi oluşturmaz. Beslenme değişiklikleri belirtilere ve kişisel toleransa göre planlanır.",
    sections: [
      {
        title: "Belirtileri ve öğünleri birlikte izleyin",
        text: "Ne yediğinizi ve sonrasında nasıl hissettiğinizi kısa notlarla kaydetmek görüşmeyi somutlaştırabilir. Tek bir öğünden kesin sonuç çıkarmak yerine, örüntüleri sağlık uzmanınızla birlikte değerlendirin.",
      },
      {
        title: "Lif miktarı kadar türü de önemlidir",
        text: "Çözünür lif bazı IBS belirtilerinde yardımcı olabilir. Lifin bir anda artırılması gaz ve şişkinliği artırabilir; değişiklikler kademeli ve toleransa göre yapılmalıdır.",
      },
      {
        title: "Düşük FODMAP kalıcı bir yasak listesi değildir",
        text: "Bu yaklaşım bazı kişilerde uzman rehberliğinde kısa süreli denenebilir. Sonraki aşamada besinler tekrar değerlendirilerek tolere edilen seçenekler geri eklenir. Uzun süre geniş besin gruplarını çıkarmak yerine kişiselleştirme hedeflenir.",
      },
    ],
    questions: [
      "Belirti günlüğümde hangi ayrıntıları tutmalıyım?",
      "Lif kaynaklarını nasıl kademeli değiştirebilirim?",
      "Düşük FODMAP benim için uygun mu; geri ekleme nasıl planlanır?",
    ],
    takeaway:
      "Amaç, mümkün olan en geniş ve tolere edilebilir besin çeşitliliğine ulaşmaktır. Tanı konmadan kısıtlayıcı bir diyete başlamayın.",
    source: {
      title: "NIDDK · Eating, Diet, & Nutrition for IBS",
      url: "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/eating-diet-nutrition",
    },
    related: ["colyak-glutensiz-beslenme", "reflude-beslenme"],
  },
  {
    slug: "colyak-glutensiz-beslenme",
    title: "Çölyak ve glutensiz beslenme",
    category: "Sindirim sağlığı",
    number: "04",
    description:
      "Çölyakta glutensiz beslenme, etiket okuma ve çapraz temasın önlenmesi hakkında başlangıç rehberi.",
    intro:
      "Çölyak hastalığında glutensiz beslenme yaşam boyu sürdürülür. Tanı süreci tamamlanmadan gluteni kesmek test sonuçlarını etkileyebileceği için önce hekiminizle görüşün.",
    sections: [
      {
        title: "Gluten kaynaklarını tanıyın",
        text: "Buğday, arpa ve çavdar gluten içerir. Yalnızca ekmek ve makarna değil; soslar, çorbalar ve işlenmiş ürünlerin içerikleri de değerlendirilmelidir. Ürün etiketlerini her alışverişte kontrol etmek yararlıdır.",
      },
      {
        title: "Mutfakta çapraz teması düşünün",
        text: "Glutensiz bir besin, gluten içeren ürünlerle hazırlama veya servis sırasında temas edebilir. Saklama ve hazırlama alanlarının ayrılması, kullanılan ekipmanın değerlendirilmesi ve dışarıda içeriklerin sorulması planın parçasıdır.",
      },
      {
        title: "Glutensiz beslenirken çeşitliliği koruyun",
        text: "Amaç yalnızca gluteni çıkarmak değil, besin gereksinimlerini karşılayan dengeli bir düzen kurmaktır. Hekim ve diyetisyen takibi, uygun besin seçenekleri ve olası eksikliklerin değerlendirilmesi için önemlidir.",
      },
    ],
    questions: [
      "Etikette hangi içerikleri kontrol etmeliyim?",
      "Evde ortak kullanılan hangi ekipmanları değerlendirmeliyim?",
      "Dışarıda yemek öncesinde hangi soruları sormalıyım?",
    ],
    takeaway:
      "“Glutensiz” seçeneğin içeriği kadar nasıl hazırlandığı da önemlidir.",
    source: {
      title: "NIDDK · Eating, Diet, & Nutrition for Celiac Disease",
      url: "https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition",
    },
    related: ["ibs-beslenme", "reflude-beslenme"],
  },
  {
    slug: "reflude-beslenme",
    title: "Reflüde beslenme",
    category: "Sindirim sağlığı",
    number: "05",
    description:
      "Reflüde öğün zamanı, kişisel tetikleyiciler ve beslenme alışkanlıklarını gözden geçirmeye yönelik rehber.",
    intro:
      "Reflüde bazı yiyecek ve içecekler belirtileri artırabilir; ancak herkese uyan tek bir yasak listesi yoktur. Kendi belirtileriniz ve günlük düzeniniz üzerinden ilerleyin.",
    sections: [
      {
        title: "Öğün ile yatma zamanı arasına bakın",
        text: "Gece veya uzanırken yakınması olan kişilerde yatmadan en az üç saat önce yemek yemek belirtilerin azalmasına yardımcı olabilir. İş ve uyku saatlerine uygun bir akış oluşturmak için bu konuyu uzmanınızla değerlendirin.",
      },
      {
        title: "Kişisel tetikleyicileri ayırt edin",
        text: "Kahve, çikolata, nane, yağlı veya baharatlı yiyecekler ve bazı asitli besinler kimi kişilerde belirtilerle ilişkili olabilir. Hepsini birden çıkarmak yerine hangi seçeneklerin sizi etkilediğini konuşun.",
      },
      {
        title: "Beslenme düzeni tedavinin yanında yer alır",
        text: "Fazla kilosu olan kişilerde hekim kilo yönetimini önerebilir. Süregelen yakınmalar için tıbbi değerlendirme gerekir; beslenme değişiklikleri reçete edilen tedavinin yerine geçirilmez.",
      },
    ],
    questions: [
      "Yakınmalarım hangi öğünlerden ve saatlerden sonra artıyor?",
      "Akşam öğününü uyku düzenime nasıl uyarlayabilirim?",
      "Hangi besinleri tek tek değerlendirmek daha anlamlı?",
    ],
    takeaway:
      "Öğün saatlerini ve kişisel toleransı birlikte değerlendirmek, gereksiz kısıtlamaların önüne geçebilir.",
    source: {
      title: "NIDDK · Eating, Diet, & Nutrition for GER & GERD",
      url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/eating-diet-nutrition",
    },
    related: ["ibs-beslenme", "colyak-glutensiz-beslenme"],
  },
  {
    slug: "hipertansiyonda-beslenme",
    title: "Hipertansiyonda beslenme",
    category: "Kalp ve damar sağlığı",
    number: "06",
    description:
      "Hipertansiyonda DASH yaklaşımı, sodyum farkındalığı ve günlük besin seçimleri için temel bir rehber.",
    intro:
      "Kan basıncı yönetiminde beslenme, hareket ve hekim tarafından planlanan tedavi birlikte ele alınır. DASH, kalp sağlığını destekleyen besin çeşitliliğine odaklanan bir beslenme yaklaşımıdır.",
    sections: [
      {
        title: "DASH yaklaşımı neleri kapsar?",
        text: "Sebzeler, meyveler, tam tahıllar, kurubaklagiller, balık, uygun süt ürünleri ve kuruyemişler bu yaklaşımın parçalarıdır. Doymuş yağ, şekerli içecekler ve sodyum içeriği yüksek seçenekler sınırlandırılır.",
      },
      {
        title: "Tuz yalnızca tuzluktan gelmez",
        text: "Hazır ürünler ve işlenmiş besinler günlük sodyum alımına katkıda bulunabilir. Etikette sodyum miktarını ve porsiyon büyüklüğünü birlikte incelemek, benzer ürünleri karşılaştırmanızı sağlar.",
      },
      {
        title: "Değişiklikleri kişisel durumunuza uyarlayın",
        text: "Sodyum ve enerji hedefleri kişisel gereksinimlere göre belirlenir. Eşlik eden hastalıklar veya ilaçlar varsa beslenme değişikliklerini sağlık ekibinizle planlayın; tansiyon ilacını kendiniz bırakmayın.",
      },
    ],
    questions: [
      "Etiketlerde sodyum ve porsiyonu nasıl karşılaştırabilirim?",
      "Evdeki alışveriş listemde hangi değişikliklerden başlayabilirim?",
      "Sağlık durumuma uygun kişisel hedeflerim neler?",
    ],
    takeaway:
      "Tek bir besine odaklanmak yerine, günlük beslenme düzeninin bütününü değerlendirin.",
    source: {
      title: "NHLBI · DASH Eating Plan",
      url: "https://www.nhlbi.nih.gov/health/dash-eating-plan",
    },
    related: ["diyabette-beslenme", "insulin-direnci-beslenme"],
  },
];
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
