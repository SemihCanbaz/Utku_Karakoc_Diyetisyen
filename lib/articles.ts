export type ArticleSource = { label: string; url?: string };
export type ArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};
export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  readingTime: string;
  number: string;
  intro: string;
  sections: ArticleSection[];
  takeaway: string;
  sources: ArticleSource[];
};

export const articles: Article[] = [
  {
    slug: "ev-yogurdu-vs-market-yogurdu",
    title: "Ev yoğurdu mu, market yoğurdu mu?",
    subtitle: "Besin değeri, kültür içeriği ve gıda güvenliği açısından bilimsel karşılaştırma",
    category: "Gıda okuryazarlığı",
    description:
      "Ev ve market yoğurdunu besin değeri, mikrobiyal yapı, probiyotik iddiası, hijyen ve etiket bilgileri üzerinden dengeli biçimde karşılaştırın.",
    readingTime: "8 dk",
    number: "01",
    intro:
      "Ev yoğurdu ve market yoğurdu arasında tek başına bir 'kazanan' belirlemek yerine, ürünün içeriği, kullanılan kültürler, üretim hijyeni ve saklama koşulları birlikte değerlendirilmelidir.",
    sections: [
      {
        title: "Besin değeri tek bir standarda indirgenemez",
        paragraphs: [
          "Ev ve market yoğurdunun protein, kalsiyum ve enerji içeriği birçok üründe benzer olabilir; ancak sütün bileşimi, yağ oranı, kuru madde içeriği ve üretim yöntemi besin profilini değiştirir.",
          "Bu nedenle karşılaştırmayı ürün etiketi ve gerçek içerik üzerinden yapmak, genel bir üstünlük iddiasından daha anlamlıdır.",
        ],
      },
      {
        title: "Her yoğurt otomatik olarak probiyotik değildir",
        paragraphs: [
          "Yoğurt kültür içerir; ancak 'probiyotik' iddiası için kullanılan mikroorganizmaların tanımlanması, yeterli canlılık düzeyi ve uygun bilimsel kanıt gerekir.",
          "Ev yoğurdunun mikrobiyal yapısı kullanılan maya, süt, sıcaklık, fermantasyon süresi ve hijyene göre değişebilir. Bu nedenle ev yoğurdunun kesin olarak daha fazla probiyotik içerdiği söylenemez.",
        ],
      },
      {
        title: "Hijyen ve saklama koşulları önemlidir",
        paragraphs: [
          "Kontrollü endüstriyel üretim standardizasyon sağlayabilir. Ev yapımında ise güvenlik; kullanılan sütün niteliği, ekipman temizliği, fermantasyon ve soğuk zincir gibi uygulamalara bağlıdır.",
          "Market yoğurdunun her koşulda daha güvenli olduğu gibi mutlak bir hüküm yerine, kontrollü üretim ve uygun hijyenin riski azalttığını söylemek daha doğrudur.",
        ],
      },
      {
        title: "Sade ve aromalı ürün ayrımı",
        paragraphs: [
          "Sade yoğurt ile aromalı veya şeker ilaveli ürünler aynı kategori içinde değerlendirilmemelidir. İlave şeker ve ek bileşenler marka ve ürüne göre değişir.",
          "Etiket okurken porsiyon, protein, yağ, ilave şeker ve içerik listesini birlikte değerlendirmek yararlıdır.",
        ],
      },
      {
        title: "Kıvam, sindirim üstünlüğü anlamına gelmez",
        paragraphs: [
          "Ev yoğurdu daha değişken, market yoğurdu daha standardize kıvamlı olabilir. Ancak kıvam farkından doğrudan bir sindirim üstünlüğü sonucu çıkarılamaz.",
          "Yoğurdun laktoz sindirimi ve toleransı üzerindeki etkileri fermentasyon ve ürün özellikleriyle ilişkilidir.",
        ],
      },
    ],
    takeaway:
      "'Ev yoğurdu kesinlikle daha sağlıklıdır' veya 'market yoğurdu sağlıksızdır' gibi ikili sonuçlar yerine; sade/şeker ilaveli oluşu, gerçek besin içeriği, kültür bilgisi, hijyen ve saklama koşulları üzerinden ürün bazında değerlendirme yapın.",
    sources: [
      { label: "Savaiano DA, Hutkins RW. Nutrition Reviews (2021)", url: "https://doi.org/10.1093/nutrit/nuaa013" },
      { label: "Aryana KJ, Olson DW. Journal of Dairy Science (2017)", url: "https://doi.org/10.3168/jds.2017-12981" },
      { label: "Nyanzi R, Jooste PJ, Buys EM. Journal of Dairy Science (2021)", url: "https://doi.org/10.3168/jds.2020-19116" },
      { label: "Gallo Ruelas M, et al. Journal of Nutritional Biochemistry (2026)", url: "https://doi.org/10.1016/j.jnutbio.2026.110346" },
    ],
  },
  {
    slug: "aralikli-oruc-bilimsel-degerlendirme",
    title: "Aralıklı oruç gerçekten işe yarıyor mu?",
    subtitle: "Kilo yönetimi, metabolik sağlık ve sürdürülebilirlik açısından bilimsel değerlendirme",
    category: "Kilo yönetimi",
    description:
      "Aralıklı orucun kilo kaybı, metabolik göstergeler, protein alımı ve sürdürülebilirlik açısından mevcut kanıtlarını inceleyin.",
    readingTime: "7 dk",
    number: "02",
    intro:
      "Aralıklı oruç kilo kaybına yardımcı olabilir; ancak mevcut kanıtlar etkinin önemli ölçüde toplam enerji alımındaki azalmayla ilişkili olduğunu ve klasik enerji kısıtlamasına belirgin bir üstünlük göstermediğini düşündürmektedir.",
    sections: [
      {
        title: "Kilo kaybında temel belirleyici enerji dengesi",
        paragraphs: [
          "Beslenme penceresinin daraltılması bazı bireylerde gün boyunca daha az enerji tüketmeyi kolaylaştırabilir. Bu nedenle görülen kilo kaybını yalnızca 'oruç tutma' mekanizmasıyla açıklamak doğru değildir.",
          "Toplam enerji alımı, besin kalitesi, fiziksel aktivite ve yöntemin sürdürülebilirliği birlikte değerlendirilmelidir.",
        ],
      },
      {
        title: "Metabolik sağlık sonuçları",
        paragraphs: [
          "Bazı çalışmalarda insülin duyarlılığında iyileşme ve trigliserit düzeylerinde azalma bildirilmiştir. Bununla birlikte bu değişikliklerin önemli bir bölümü kilo kaybıyla ilişkili olabilir.",
          "Aralıklı orucun klasik enerji kısıtlamasından bağımsız ve belirgin biçimde üstün olduğu sonucu çıkarılmamalıdır.",
        ],
      },
      {
        title: "Protein alımı ve kas kütlesi",
        paragraphs: [
          "Beslenme penceresi daraldığında yeterli enerji ve protein alımını sürdürmek önem kazanır. Özellikle kilo kaybı döneminde yetersiz protein alımı kas kütlesinin korunmasını zorlaştırabilir.",
        ],
      },
      {
        title: "Sürdürülebilirlik kişiden kişiye değişir",
        paragraphs: [
          "Çalışma saatleri, sosyal yaşam, açlık toleransı ve mevcut beslenme alışkanlıkları yöntemin uzun vadede uygulanabilirliğini etkiler.",
          "Bazı kişiler için öğün düzenini sadeleştirebilirken, bazı kişilerde uzun açlık dönemleri günlük yaşamla uyumsuz olabilir.",
        ],
      },
      {
        title: "Klinik yaklaşım",
        paragraphs: [
          "Aralıklı oruç zorunlu veya üstün bir yöntem olarak değil, uygun bireylerde seçeneklerden biri olarak değerlendirilebilir.",
          "Asıl soru 'daha mı iyi?' değil, 'bu birey için yeterli, dengeli ve sürdürülebilir bir düzen kurulabiliyor mu?' olmalıdır.",
        ],
      },
    ],
    takeaway:
      "Aralıklı oruç bazı bireylerde işe yarayabilir; fakat üstün bir yöntem olduğu gösterilmemiştir. Yeterli protein, toplam enerji, besin kalitesi ve sürdürülebilirlik birlikte değerlendirilmelidir.",
    sources: [
      { label: "Tinsley GM, La Bounty PM. Nutrition Reviews (2015)", url: "https://doi.org/10.1093/nutrit/nuv041" },
      { label: "Welton S, et al. Canadian Family Physician (2020)" },
      { label: "Lowe DA, et al. JAMA Internal Medicine (2020)", url: "https://doi.org/10.1001/jamainternmed.2020.4153" },
    ],
  },
  {
    slug: "gdo-tavuk-yumurta-bilimsel-gercekler",
    title: "GDO, tavuk ve yumurta: ne biliyoruz?",
    subtitle: "GDO'lu yem, hayvanın genetiği ve ürün güvenliği arasındaki farklar",
    category: "Gıda okuryazarlığı",
    description:
      "GDO'lu yem tüketen tavuğun veya yumurtasının GDO'lu olup olmadığı, besin değeri ve güvenlik açısından bilimsel çerçeveyi öğrenin.",
    readingTime: "8 dk",
    number: "03",
    intro:
      "Genetik olarak değiştirilmiş bir hayvan ile GDO'lu bitkilerden elde edilen yemleri tüketen hayvan aynı kavram değildir. GDO'lu yem tüketimi tavuğun genomunu GDO'lu hale getirmez.",
    sections: [
      {
        title: "GDO'lu yem, GDO'lu hayvan demek değildir",
        paragraphs: [
          "Bir tavuğun GDO'lu bitkilerden elde edilen yemleri tüketmesi, tavuğun genetik olarak değiştirilmiş bir hayvan olduğu anlamına gelmez.",
          "Yemle alınan DNA ve proteinler sindirim sürecinde parçalanır; bunların hayvanın genomuna aktarılması beklenen bir mekanizma değildir.",
        ],
      },
      {
        title: "Et ve yumurta otomatik olarak GDO'lu hale gelmez",
        paragraphs: [
          "Kanatlı çalışmalarını inceleyen derlemelerde transgenik yemlerle beslenen hayvanların et ve yumurtalarında transgenik DNA veya proteinlerin genel olarak saptanamadığı bildirilmiştir.",
          "Yumurta bileşimi ve besin değeri; yem içeriğinin yanı sıra ırk, yaş ve yetiştirme koşullarından da etkilenir.",
        ],
      },
      {
        title: "Kanser riski hakkında",
        paragraphs: [
          "GDO'lu yemle beslenen hayvanlardan elde edilen tavuk veya yumurtanın kanser riskini artırdığına ilişkin güçlü bir kanıt bulunmamaktadır.",
          "GDO konusu; pestisit kalıntısı, işlenmiş et tüketimi ve genel üretim kalitesi gibi başlıklardan ayrı değerlendirilmelidir.",
        ],
      },
      {
        title: "Asıl değerlendirilmesi gereken noktalar",
        paragraphs: ["Tavuk ve yumurta seçiminde yalnızca GDO başlığına odaklanmak yerine üretim ve tüketim zincirinin tamamına bakmak daha anlamlıdır."],
        bullets: [
          "Yemin genel kalite ve besin özellikleri",
          "Üretim sırasında hijyen ve biyogüvenlik",
          "Pişirme ve saklama koşulları",
          "İşlenmiş tavuk ürünlerinde tuz ve ek bileşenler",
          "Ürünün toplam besin profili ve tüketim miktarı",
        ],
      },
      {
        title: "Köy tavuğu ve market tavuğu",
        paragraphs: [
          "Renk, doku ve lezzet farkları doğrudan GDO ile açıklanamaz. Etin daha koyu veya sert olması yaş, kas kullanımı, yetiştirme koşulları ve miyoglobin gibi birçok faktörle ilişkili olabilir.",
        ],
      },
    ],
    takeaway:
      "GDO'lu yem tüketen tavuğun 'GDO'lu tavuk' haline geldiği düşüncesi bilimsel olarak doğru değildir. Ürünü değerlendirirken güvenilir üretim, hijyen, saklama, işleme düzeyi ve genel besin profiline bakın.",
    sources: [
      { label: "Tufarelli V, et al. Critical Reviews in Food Science and Nutrition (2015)", url: "https://doi.org/10.1080/10408398.2012.667017" },
      { label: "de Vos CJ, Swanenburg M. Food and Chemical Toxicology (2018)", url: "https://doi.org/10.1016/j.fct.2017.08.031" },
      { label: "Nadal A, et al. Food and Chemical Toxicology (2018)", url: "https://doi.org/10.1016/j.fct.2017.08.032" },
      { label: "EFSA statement (2007)", url: "https://doi.org/10.2903/j.efsa.2007.744" },
    ],
  },
  {
    slug: "yumurta-uretim-kodlari-0-1-2-3",
    title: "Yumurtadaki 0–1–2–3 kodları ne anlatır?",
    subtitle: "Üretim sistemi, besin değeri, omega-3 ve hayvan refahı açısından değerlendirme",
    category: "Gıda okuryazarlığı",
    description:
      "Organik, serbest gezen, kafessiz ve kafes yumurtalarını üretim sistemi, besin değeri ve hayvan refahı açısından karşılaştırın.",
    readingTime: "8 dk",
    number: "04",
    intro:
      "Yumurta kabuğundaki 0, 1, 2 ve 3 kodları üretim sistemini belirtir: 0 organik, 1 serbest gezen, 2 kümeste/kafessiz ve 3 kafes sistemi. Kod tek başına besin değerinin üstünlüğünü göstermez.",
    sections: [
      {
        title: "Protein, yağ ve kolesterol",
        paragraphs: [
          "Üretim sistemi yumurtanın besin bileşimini etkileyebilse de protein, toplam yağ ve kolesterol açısından sistemler arasında her zaman büyük ve tutarlı farklar bulunmaz.",
          "Yemin içeriği, tavuğun ırkı, yaşı ve yetiştirme koşulları da besin profilini etkiler.",
        ],
      },
      {
        title: "Omega-3 farkında yem önemli",
        paragraphs: [
          "Bazı çalışmalarda serbest gezen veya organik sistemlerde omega-3 düzeyleri daha yüksek bulunmuştur. Ancak tavuğun tükettiği yem ve özellikle omega-3 yönünden zengin yem bileşenleri güçlü belirleyicilerdir.",
          "Bu nedenle 'serbest gezen yumurta her zaman daha fazla omega-3 içerir' şeklinde kesin bir genelleme yapılmamalıdır.",
        ],
      },
      {
        title: "Vitamin ve mineral farklılıkları değişkendir",
        paragraphs: [
          "Vitamin ve mineral içeriklerinde farklılıklar görülebilir; ancak çalışmalar arasında büyüklük ve yön açısından tutarlılık sınırlıdır. Tek bir üretim sisteminin tüm vitamin ve mineraller açısından belirgin üstünlüğü olduğu söylenemez.",
        ],
      },
      {
        title: "Hayvan refahı tek bir koda indirgenemez",
        paragraphs: [
          "Serbest gezen ve organik sistemler doğal davranışlar için daha fazla fırsat sağlayabilir. Ancak açık alan; parazit, enfeksiyon, yırtıcı ve hava koşulları gibi ek riskler de oluşturabilir.",
          "Refahı değerlendirirken yalnızca açık alana erişime değil, sistemin yönetimine ve hayvanların gerçek yaşam koşullarına bakılmalıdır.",
        ],
      },
      {
        title: "Kodları nasıl okumalı?",
        paragraphs: [
          "0 organik, 1 serbest gezen, 2 kümeste/kafessiz, 3 kafes sistemidir. Kodun daha düşük olması tek başına yumurtanın besin değerinin daha yüksek olduğu anlamına gelmez.",
        ],
      },
    ],
    takeaway:
      "Yumurta seçiminde üretim kodu önemlidir fakat tek başına 'daha sağlıklı' sıralaması yaratmaz. Besin profili, yem, ürün güvenliği, hayvan refahı ve kişisel tercihleri birlikte değerlendirin.",
    sources: [
      { label: "Anderson KE. Poultry Science (2011)", url: "https://doi.org/10.3382/ps.2010-01289" },
      { label: "Bonnefous C, et al. Frontiers in Veterinary Science (2022)", url: "https://doi.org/10.3389/fvets.2022.952922" },
      { label: "Campbell DLM, Bari MS. Animal Production Science (2021)", url: "https://doi.org/10.1071/AN19576" },
      { label: "Rodenburg TB, et al. Poultry Science (2016)", url: "https://doi.org/10.3382/ps/pew082" },
    ],
  },
  {
    slug: "detoks-diyetleri-bilimsel-degerlendirme",
    title: "Detoks diyetleri gerçekten 'toksin' atar mı?",
    subtitle: "Toksin eliminasyonu, kısa vadeli kilo kaybı ve sürdürülebilirlik üzerine bilimsel değerlendirme",
    category: "Beslenme mitleri",
    description:
      "Detoks diyetlerinin toksin eliminasyonu, kilo kaybı ve metabolik sağlık üzerindeki iddialarını mevcut bilimsel çerçeveyle değerlendirin.",
    readingTime: "6 dk",
    number: "05",
    intro:
      "Detoks diyetlerinin vücuttaki toksinlerin uzaklaştırılmasını belirgin biçimde artırdığına ilişkin bilimsel dayanak sınırlıdır. Vücudun normal metabolik ve boşaltım süreçlerinde karaciğer ve böbrekler temel rol oynar.",
    sections: [
      {
        title: "Toksin eliminasyonu iddiası",
        paragraphs: [
          "Mevcut değerlendirmelerde belirli bir kısa süreli detoks programının toksinlerin uzaklaştırılmasını anlamlı ölçüde artırdığına ilişkin yeterli kanıt bulunmamaktadır.",
          "'Detoks' kavramı, tek bir besin veya kısa süreli diyetin özel bir temizleme mekanizması oluşturmasından ziyade vücudun normal fizyolojik süreçleri bağlamında ele alınmalıdır.",
        ],
      },
      {
        title: "Tartıdaki hızlı düşüş ne anlama gelir?",
        paragraphs: [
          "Çok düşük enerjili veya besin çeşitliliği sınırlı programlarda kısa vadeli ağırlık azalması görülebilir. Bunun önemli bir bölümü enerji alımındaki azalma ile su ve glikojen depolarındaki değişikliklerden kaynaklanabilir.",
          "Bu nedenle hızlı tartı düşüşü doğrudan yağ kaybı veya toksin eliminasyonu olarak yorumlanmamalıdır.",
        ],
      },
      {
        title: "Sürdürülebilirlik",
        paragraphs: [
          "Kısa süreli ve yoğun kısıtlamalar uzun vadeli davranış değişikliği sağlamayabilir. Kalıcı kilo yönetiminde günlük yaşama uyarlanabilen, yeterli ve dengeli beslenme alışkanlıkları temel yaklaşımdır.",
        ],
      },
      {
        title: "Karaciğer ve böbreklerin rolü",
        paragraphs: [
          "Karaciğer çeşitli maddelerin metabolize edilmesinde, böbrekler ise birçok metabolik atığın idrar yoluyla uzaklaştırılmasında merkezi rol oynar.",
        ],
      },
      {
        title: "Diyetisyen yaklaşımı",
        paragraphs: [
          "Kişinin kendini daha hafif hissetmesi öznel bir deneyim olarak anlamlı olabilir; fakat tek başına toksin eliminasyonunun arttığını kanıtlamaz. Beslenme danışmanlığında amaç kısa süreli kısıtlamalardan çok uzun vadeli ve sürdürülebilir düzen kurmaktır.",
        ],
      },
    ],
    takeaway:
      "Detoks programlarının özel bir toksin temizleme avantajı gösterilmemiştir. Uzun vadeli sağlık ve kilo yönetiminde dengeli, yeterli ve sürdürülebilir beslenme alışkanlıkları daha temel bir yaklaşımdır.",
    sources: [
      { label: "Klein AV, Kiat H. Journal of Human Nutrition and Dietetics (2015)", url: "https://doi.org/10.1111/jhn.12286" },
      { label: "NCCIH · Detoxes and Cleanses: What You Need To Know", url: "https://www.nccih.nih.gov/health/detoxes-and-cleanses-what-you-need-to-know" },
      { label: "Hall KD, et al. American Journal of Clinical Nutrition (2017)", url: "https://doi.org/10.3945/ajcn.117.155224" },
    ],
  },
  {
    slug: "ac-karnina-spor-yag-yakar-mi",
    title: "Aç karnına spor daha fazla yağ yakar mı?",
    subtitle: "Yağ oksidasyonu, toplam yağ kaybı ve performans arasındaki fark",
    category: "Sporcu beslenmesi",
    description:
      "Aç karnına egzersizin yağ oksidasyonu, toplam vücut yağı kaybı, performans ve kas kütlesi üzerindeki etkilerini ayırarak inceleyin.",
    readingTime: "7 dk",
    number: "06",
    intro:
      "Aç karnına egzersizde yağ oksidasyonu artabilir; ancak egzersiz sırasında daha fazla yağ kullanılması uzun vadede otomatik olarak daha fazla vücut yağı kaybı anlamına gelmez.",
    sections: [
      {
        title: "Egzersiz sırasında yağ kullanımı artabilir",
        paragraphs: [
          "Açlık durumunda daha düşük insülin düzeyi yağ asidi mobilizasyonunu ve egzersiz sırasındaki yağ oksidasyonunu artırabilir.",
          "Bu akut değişim ile haftalar ve aylar içindeki toplam yağ kaybı aynı kavram değildir.",
        ],
      },
      {
        title: "Toplam yağ kaybında belirgin üstünlük gösterilmemiştir",
        paragraphs: [
          "Mevcut çalışmalar aç ve tok egzersiz arasında toplam vücut yağı kaybı açısından belirgin bir üstünlük göstermemektedir. Uzun vadede enerji dengesi temel belirleyicilerden biridir.",
        ],
      },
      {
        title: "Performans etkilenebilir",
        paragraphs: [
          "Özellikle yüksek yoğunluklu veya uzun süreli egzersizlerde egzersiz öncesi beslenme antrenman kalitesini destekleyebilir. Açlığa verilen yanıt kişiden kişiye değişir.",
        ],
      },
      {
        title: "Kas kütlesi ve protein",
        paragraphs: [
          "Kas kütlesini korumak veya artırmak isteyen kişilerde yeterli enerji ve protein alımı, direnç egzersizi ve genel beslenme düzeni birlikte değerlendirilmelidir.",
          "Yalnızca daha fazla yağ okside etme amacıyla sürekli aç egzersiz yapmak gerekli bir strateji değildir.",
        ],
      },
      {
        title: "Kimler için uygun olabilir?",
        paragraphs: [
          "Aç karnına egzersiz bazı sağlıklı bireyler tarafından tolere edilebilir. Performans düşüşü, baş dönmesi, belirgin halsizlik veya egzersiz kalitesinde azalma ortaya çıkıyorsa egzersiz öncesi beslenme yeniden değerlendirilmelidir.",
        ],
      },
    ],
    takeaway:
      "Aç karnına egzersiz zorunlu bir yağ kaybı stratejisi değildir. Tercih; hedef, egzersiz türü, performans, tolerans ve genel beslenme düzenine göre kişiselleştirilmelidir.",
    sources: [
      { label: "Horowitz JF, Klein S. American Journal of Clinical Nutrition (2000)" },
      { label: "Schoenfeld BJ, Aragon AA, Wilborn CD. JISSN (2014)", url: "https://doi.org/10.1186/s12970-014-0054-7" },
      { label: "Paoli A, Marcolin G, Petrone N. Journal of Translational Medicine / fasting-exercise literature (2011)" },
    ],
  },
  {
    slug: "peynir-tuketimi-ve-saglik",
    title: "Peynir tüketimi ve sağlık",
    subtitle: "Gıda matriksi, kardiyometabolik sonuçlar ve peynir seçiminde pratik çerçeve",
    category: "Gıda okuryazarlığı",
    description:
      "Peynir tüketimini yalnızca yağ içeriğiyle değil; gıda matriksi, fermantasyon, tuz, işlenme düzeyi ve porsiyon üzerinden değerlendirin.",
    readingTime: "6 dk",
    number: "07",
    intro:
      "Kaynak makale incelemesine göre peynirin sağlık etkileri yalnızca toplam yağ içeriğine indirgenmemelidir. Gıda matriksi, fermantasyon, tuz içeriği, işlenme düzeyi ve tüketim miktarı birlikte değerlendirilmelidir.",
    sections: [
      {
        title: "Peynir yalnızca yağdan ibaret değildir",
        paragraphs: [
          "Peynir protein, kalsiyum ve çeşitli biyoaktif bileşenler içeren bir süt ürünüdür. İncelenen derlemede mevcut kanıtların, ölçülü peynir tüketiminin kardiyometabolik sonuçlarda nötr veya hafif olumlu ilişkiler gösterebildiği aktarılmaktadır.",
        ],
      },
      {
        title: "Seçimde tuz ve işlenme düzeyi",
        paragraphs: [
          "Düşük tuzlu ve daha az işlenmiş seçenekler genel yaklaşımda öne çıkar. Porsiyon kontrolü ve genel diyet kalitesi, tek bir peynir türüne 'en sağlıklı' etiketi vermekten daha anlamlıdır.",
        ],
      },
      {
        title: "Kaynak metindeki peynir seçim çerçevesi",
        paragraphs: ["Belgede klinik uygulama açısından aşağıdaki gruplar örneklenmiştir; bu sıralama kaynak metnin kendi çerçevesidir."],
        bullets: [
          "Lor / cottage cheese: yüksek protein, düşük yağ ve tuz vurgusu",
          "Az tuzlu beyaz peynir: günlük tüketim için dengeli seçenek olarak aktarılmıştır",
          "Keçi peyniri: farklı yağ asidi profili",
          "Fermente doğal peynirler: probiyotik katkı potansiyeli",
          "Kaşar: ölçülü tüketim",
          "Eritme / ultra işlenmiş peynirler: daha düşük öncelik",
        ],
      },
      {
        title: "Tariflerde uygulama",
        paragraphs: [
          "Peynir tuzluysa tarifte eklenen tuz azaltılabilir. Peynirin enerji ve besin ögesi katkısı toplam tarif porsiyonu içinde değerlendirilmelidir.",
          "Peynir seçimi kişinin sağlık durumu ve beslenme hedeflerine göre bireyselleştirilmelidir.",
        ],
      },
    ],
    takeaway:
      "Tek bir 'en sağlıklı peynir' yerine; düşük tuz, daha az işlenme, porsiyon kontrolü, genel diyet kalitesi ve bireysel gereksinimleri birlikte değerlendirin.",
    sources: [
      { label: "Schwingshackl L, ve ark. (2017) · Kaynak dosyada kısmi bibliyografik bilgi" },
      { label: "Astrup A, ve ark. (2019) · Kaynak dosyada kısmi bibliyografik bilgi" },
      { label: "Guo J, ve ark. (2017) · Kaynak dosyada kısmi bibliyografik bilgi" },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
