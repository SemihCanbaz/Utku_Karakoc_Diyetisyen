"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Droplets, Flame, Scale, Sparkles, Utensils, Ruler, ShieldCheck } from "lucide-react";
import {
  activityLevels,
  calculateBmi,
  calculateBmr,
  calculateReferenceWeight,
  calculateTdeeValue,
  calculateWaistHeightRatio,
  calculateWater,
} from "@/lib/calculations";
import type { ToolDefinition } from "@/lib/tools";

const iconMap: Record<string, typeof Scale> = {
  "bmi-hesaplama": Scale,
  "gunluk-kalori-ihtiyaci": Activity,
  "bazal-metabolizma-hizi": Flame,
  "makro-besin-ihtiyaci": Utensils,
  "su-ihtiyaci": Droplets,
  "ideal-kilo-hesaplama": Sparkles,
  "bel-boy-orani": Ruler,
};

type Gender = "erkek" | "kadin";

export function StandaloneCalculator({ tool }: { tool: ToolDefinition }) {
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [waist, setWaist] = useState("80");
  const [gender, setGender] = useState<Gender>("kadin");
  const [activity, setActivity] = useState("1.375");
  const [calories, setCalories] = useState("2000");
  const [proteinPct, setProteinPct] = useState("25");
  const [fatPct, setFatPct] = useState("30");
  const [result, setResult] = useState<{ title: string; value: string; note: string; extras?: string[] } | null>(null);
  const [error, setError] = useState("");
  const Icon = iconMap[tool.slug] || Scale;
  const reduced = useReducedMotion();

  const fields = useMemo(() => ({
    bmi: tool.slug === "bmi-hesaplama",
    energy: ["gunluk-kalori-ihtiyaci", "bazal-metabolizma-hizi"].includes(tool.slug),
    macro: tool.slug === "makro-besin-ihtiyaci",
    water: tool.slug === "su-ihtiyaci",
    reference: tool.slug === "ideal-kilo-hesaplama",
    waist: tool.slug === "bel-boy-orani",
  }), [tool.slug]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const h = Number(height), w = Number(weight), a = Number(age);
      if (fields.bmi) {
        const bmi = calculateBmi(w, h);
        setResult({ title: "BMI / VKİ", value: String(bmi.value), note: bmi.label, extras: ["BMI tek başına sağlık durumunu veya vücut kompozisyonunu göstermez."] });
      } else if (tool.slug === "bazal-metabolizma-hizi") {
        const bmr = calculateBmr(a, h, w, gender);
        setResult({ title: "Tahmini BMR", value: `${bmr.toLocaleString("tr-TR")} kcal/gün`, note: "Dinlenme enerji harcaması için Mifflin–St Jeor tahmini.", extras: ["Gerçek enerji harcaması bireysel farklılık gösterebilir."] });
      } else if (tool.slug === "gunluk-kalori-ihtiyaci") {
        const bmr = calculateBmr(a, h, w, gender);
        const tdee = calculateTdeeValue(bmr, Number(activity));
        setResult({ title: "Tahmini günlük enerji", value: `${tdee.toLocaleString("tr-TR")} kcal/gün`, note: "BMR × seçilen hareket katsayısı.", extras: [`BMR: ${bmr.toLocaleString("tr-TR")} kcal/gün`, "Bu değer kişisel diyet reçetesi değildir."] });
      } else if (fields.macro) {
        const kcal = Number(calories), p = Number(proteinPct), f = Number(fatPct);
        if (!Number.isFinite(kcal) || kcal < 1000 || kcal > 6000) throw new Error("Enerji değerini 1000–6000 kcal arasında girin.");
        if (!Number.isFinite(p) || p < 10 || p > 40) throw new Error("Protein yüzdesini %10–40 arasında girin.");
        if (!Number.isFinite(f) || f < 15 || f > 45) throw new Error("Yağ yüzdesini %15–45 arasında girin.");
        const c = 100 - p - f;
        if (c < 15) throw new Error("Karbonhidrat yüzdesi en az %15 kalmalı.");
        setResult({ title: "Makro dağılımı", value: `${Math.round((kcal * p / 100) / 4)} g protein`, note: `${Math.round((kcal * c / 100) / 4)} g karbonhidrat · ${Math.round((kcal * f / 100) / 9)} g yağ`, extras: [`Dağılım: Protein %${p} · Karbonhidrat %${c} · Yağ %${f}`, "Yüzdeler örnek planlama içindir; kişisel gereksinimler değişebilir."] });
      } else if (fields.water) {
        const ml = calculateWater(w);
        setResult({ title: "Kaba sıvı referansı", value: `${ml.toLocaleString("tr-TR")} ml/gün`, note: "30 ml/kg üzerinden yaklaşık hesap.", extras: ["İklim, aktivite, gebelik/emzirme ve sağlık durumu ihtiyacı değiştirebilir.", "Sıvı kısıtlamanız varsa bu sonucu kullanmayın; sağlık ekibinizin önerisi önceliklidir."] });
      } else if (fields.reference) {
        const ref = calculateReferenceWeight(h);
        setResult({ title: "Referans ağırlık tahmini", value: `${ref.toLocaleString("tr-TR")} kg`, note: "BMI 22 orta noktası üzerinden matematiksel referans.", extras: ["Bu sonuç 'olmanız gereken kilo' anlamına gelmez.", "Kas kütlesi, yaş, sağlık durumu ve vücut kompozisyonu değerlendirilmez."] });
      } else if (fields.waist) {
        const whtr = calculateWaistHeightRatio(Number(waist), h);
        setResult({ title: "Bel / boy oranı", value: String(whtr.value).replace(".", ","), note: whtr.label, extras: ["0,5 değeri genel tarama amacıyla kullanılan pratik bir eşiktir; tanı koymaz."] });
      }
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Hesaplama yapılamadı.");
    }
  }

  return (
    <div className="standalone-calculator">
      <form onSubmit={submit} className="standalone-form panel" noValidate>
        <div className="calculator-form-title"><span className="icon-badge"><Icon /></span><div><p className="eyebrow">BİLGİLERİNİZ</p><h2>Hesaplamayı yapın</h2></div></div>
        <div className="standalone-fields">
          {(fields.bmi || fields.energy || fields.reference || fields.waist) && (
            <label className="field"><span>Boy (cm)</span><input type="number" min="120" max="220" value={height} onChange={(e) => setHeight(e.target.value)} required /></label>
          )}
          {(fields.bmi || fields.energy || fields.water) && (
            <label className="field"><span>Kilo (kg)</span><input type="number" min="35" max="250" value={weight} onChange={(e) => setWeight(e.target.value)} required /></label>
          )}
          {fields.energy && (
            <>
              <label className="field"><span>Yaş</span><input type="number" min="18" max="90" value={age} onChange={(e) => setAge(e.target.value)} required /></label>
              <label className="field"><span>Formülde kullanılan cinsiyet</span><select value={gender} onChange={(e) => setGender(e.target.value as Gender)}><option value="kadin">Kadın</option><option value="erkek">Erkek</option></select></label>
            </>
          )}
          {tool.slug === "gunluk-kalori-ihtiyaci" && (
            <label className="field field-wide"><span>Hareket düzeyi</span><select value={activity} onChange={(e) => setActivity(e.target.value)}>{activityLevels.map((level) => <option key={level.value} value={level.value}>{level.label} · {level.description}</option>)}</select></label>
          )}
          {fields.macro && (
            <>
              <label className="field"><span>Günlük enerji (kcal)</span><input type="number" min="1000" max="6000" value={calories} onChange={(e) => setCalories(e.target.value)} required /></label>
              <label className="field"><span>Protein (%)</span><input type="number" min="10" max="40" value={proteinPct} onChange={(e) => setProteinPct(e.target.value)} required /></label>
              <label className="field"><span>Yağ (%)</span><input type="number" min="15" max="45" value={fatPct} onChange={(e) => setFatPct(e.target.value)} required /></label>
            </>
          )}
          {fields.waist && <label className="field"><span>Bel çevresi (cm)</span><input type="number" min="40" max="200" value={waist} onChange={(e) => setWaist(e.target.value)} required /></label>}
        </div>
        {error && <p className="calculator-error" role="alert">{error}</p>}
        <button className="action w-full">Hesapla</button>
      </form>

      <div className="standalone-result" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {result ? (
            <motion.div
              key="standalone-result-ready"
              className="standalone-result-inner"
              initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ duration: reduced ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="icon-badge"><Icon /></span>
              <p className="eyebrow">SONUÇ</p>
              <h2>{result.title}</h2>
              <strong>{result.value}</strong>
              <p>{result.note}</p>
              {result.extras?.map((item) => <div key={item} className="result-note"><ShieldCheck size={15} />{item}</div>)}
            </motion.div>
          ) : (
            <motion.div
              key="standalone-result-empty"
              className="standalone-result-inner"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="icon-badge"><Icon /></span>
              <p className="eyebrow">GENEL TAHMİN</p>
              <h2>Sonucunuz burada görünecek.</h2>
              <p>Bilgilerinizi girin ve hesaplamayı başlatın. Veriler bu araç tarafından site sunucusuna kaydedilmez.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
