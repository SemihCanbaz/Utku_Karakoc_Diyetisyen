"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  BriefcaseBusiness,
  Plane,
  House,
} from "lucide-react";
const profiles = [
  {
    label: "Yoğun iş günleri",
    icon: BriefcaseBusiness,
    title: "Planınız ajandanıza uyum sağlasın.",
    text: "Toplantılar, yolculuklar ve değişen öğün saatleri… İlk görüşmede gerçek bir iş gününüzü birlikte ele alalım.",
    items: [
      "İş gününüzün öğün haritası",
      "Dışarıda yemek için uygulanabilir alternatifler",
      "Alışveriş ve ön hazırlık alışkanlıkları",
    ],
  },
  {
    label: "Ev ve aile düzeni",
    icon: House,
    title: "Aynı sofrada, size uygun seçenekler.",
    text: "Evde hazırlanan yemekler, aile sofraları ve kişisel tercihleriniz. Planı günlük hayatınızın içinden oluşturalım.",
    items: [
      "Evdeki yemek düzeninin değerlendirilmesi",
      "Porsiyonlar ve alternatif öğün seçenekleri",
      "Sürdürülebilir mutfak hazırlığı",
    ],
  },
  {
    label: "Değişken bir tempo",
    icon: Plane,
    title: "Koşullar değişse de bir yönünüz olsun.",
    text: "Seyahat, vardiya veya farklı şehirler. Tek bir güne bağlı kalmadan, koşullara göre konuşabileceğimiz seçenekler geliştirelim.",
    items: [
      "Değişen saatler için öğün planlama",
      "Ulaşılabilir besin seçeneklerinin belirlenmesi",
      "Geri bildirimlerle planın güncellenmesi",
    ],
  },
];
export function ConsultationExplorer() {
  const [selected, setSelected] = useState(0);
  const profile = profiles[selected];
  return (
    <div className="consult-explorer">
      <div
        className="consult-profile-options"
        role="group"
        aria-label="Günlük yaşam düzeniniz"
      >
        {profiles.map((p, i) => (
          <button
            key={p.label}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <p.icon size={23} />
            <span>{p.label}</span>
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <div className="consult-profile-detail" aria-live="polite">
        <p className="eyebrow">GÖRÜŞMEDE ELE ALABİLECEKLERİMİZ</p>
        <h3>{profile.title}</h3>
        <p>{profile.text}</p>
        <ul>
          {profile.items.map((item) => (
            <li key={item}>
              <Check size={17} />
              {item}
            </li>
          ))}
        </ul>
        <Link className="text-link" href="/iletisim">
          Kendi düzeninizi konuşalım <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
