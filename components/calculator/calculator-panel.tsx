"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Activity,
  Droplets,
  Flame,
  Scale,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  calculate,
  validateInput,
  activityLevels,
  type CalculatorInput,
  type Goal,
} from "@/lib/calculations";
const numberFields = [
  {
    key: "age",
    label: "Yaş",
    unit: "yıl",
    min: 18,
    max: 90,
    step: "1",
    placeholder: "30",
  },
  {
    key: "height",
    label: "Boy",
    unit: "cm",
    min: 120,
    max: 220,
    step: "0.1",
    placeholder: "170",
  },
  {
    key: "weight",
    label: "Kilo",
    unit: "kg",
    min: 35,
    max: 250,
    step: "0.1",
    placeholder: "70",
  },
] as const;
export function CalculatorPanel() {
  const [values, setValues] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    activity: "",
    goal: "maintain" as Goal,
    proteinPercent: 20,
    fatPercent: 30,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CalculatorInput, string>>
  >({});
  const [result, setResult] = useState<ReturnType<typeof calculate> | null>(
    null,
  );
  const [dirty, setDirty] = useState(false);
  const reduced = useReducedMotion();
  const form = useRef<HTMLFormElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  function update(patch: Partial<typeof values>) {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      for (const key of Object.keys(patch) as (keyof CalculatorInput)[])
        delete next[key];
      return next;
    });
    if (result) setDirty(true);
  }
  function submit(event: React.FormEvent) {
    event.preventDefault();
    const input = {
      ...values,
      age: Number(values.age),
      height: Number(values.height),
      weight: Number(values.weight),
      gender: values.gender as CalculatorInput["gender"],
      activity: Number(values.activity),
    };
    const nextErrors = validateInput(input);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setResult(null);
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setResult(calculate(input));
    setDirty(false);
    requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true });
      if (innerWidth < 900)
        panel.current?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
    });
  }
  return (
    <div className="container calculator-layout">
      <form
        ref={form}
        noValidate
        onSubmit={submit}
        className="calculator-form panel"
      >
        <div className="form-section-title">
          <span>01</span>
          <h2>Sizi tanıyalım.</h2>
        </div>
        <p className="form-hint">
          Bilgileriniz bu sayfada hesaplanır ve kaydedilmez.
        </p>
        <div className="form-fields">
          <label className="field">
            <span>Formülde kullanılan cinsiyet</span>
            <select
              aria-label="Formülde kullanılan cinsiyet"
              value={values.gender}
              onChange={(e) => update({ gender: e.target.value })}
              aria-invalid={!!errors.gender}
              aria-describedby={errors.gender ? "error-gender" : undefined}
            >
              <option value="">Seçiniz</option>
              <option value="kadin">Kadın</option>
              <option value="erkek">Erkek</option>
            </select>
            {errors.gender && (
              <small id="error-gender" className="field-error">
                {errors.gender}
              </small>
            )}
          </label>
          <div className="number-fields">
            {numberFields.map((f) => (
              <label className="field" key={f.key}>
                <span>
                  {f.label} <small>({f.unit})</small>
                </span>
                <input
                  aria-label={f.label + " (" + f.unit + ")"}
                  inputMode="decimal"
                  type="number"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  placeholder={f.placeholder}
                  value={values[f.key]}
                  onChange={(e) => update({ [f.key]: e.target.value })}
                  aria-invalid={!!errors[f.key]}
                  aria-describedby={
                    errors[f.key] ? "error-" + f.key : undefined
                  }
                />
                {errors[f.key] && (
                  <small id={"error-" + f.key} className="field-error">
                    {errors[f.key]}
                  </small>
                )}
              </label>
            ))}
          </div>
          <label className="field">
            <span>Hareket seviyesi</span>
            <select
              value={values.activity}
              onChange={(e) => update({ activity: e.target.value })}
              aria-invalid={!!errors.activity}
              aria-describedby="activity-description"
            >
              <option value="">Size uygun düzeyi seçin</option>
              {activityLevels.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <small
              id="activity-description"
              className={errors.activity ? "field-error" : "form-hint"}
            >
              {errors.activity ||
                activityLevels.find((a) => a.value === Number(values.activity))
                  ?.description ||
                "Günlük hareketiniz dahil, ortalama bir haftayı düşünün."}
            </small>
          </label>
          <fieldset className="goal-field">
            <legend>Enerji senaryosu</legend>
            <div>
              {[
                { value: "maintain", label: "Koruma" },
                { value: "lose", label: "Azaltma" },
                { value: "gain", label: "Artırma" },
              ].map((g) => (
                <label key={g.value}>
                  <input
                    type="radio"
                    name="goal"
                    value={g.value}
                    checked={values.goal === g.value}
                    onChange={() => update({ goal: g.value as Goal })}
                  />
                  <span>{g.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <details className="macro-settings">
            <summary>
              <SlidersHorizontal size={16} /> Makro oranlarını düzenle
            </summary>
            <p>
              Bir dağılım örneğidir, kişisel beslenme önerisi değildir. Oranları
              değiştirerek gram karşılıklarını görebilirsiniz.
            </p>
            <label>
              Protein <strong>%{values.proteinPercent}</strong>
              <input
                type="range"
                min="15"
                max="30"
                step="1"
                value={values.proteinPercent}
                onChange={(e) =>
                  update({ proteinPercent: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Yağ <strong>%{values.fatPercent}</strong>
              <input
                type="range"
                min="20"
                max="35"
                step="1"
                value={values.fatPercent}
                onChange={(e) => update({ fatPercent: Number(e.target.value) })}
              />
            </label>
            <p>
              Karbonhidrat: %{100 - values.proteinPercent - values.fatPercent}
            </p>
          </details>
          <button className="action w-full" type="submit">
            Sonuçları Hesapla <ArrowUpRight size={18} />
          </button>
        </div>
      </form>
      <div
        className="calculator-results"
        ref={panel}
        tabIndex={-1}
        aria-label="Hesaplama sonuçları"
      >
        <p className="eyebrow">02 · SİZE AİT GÖSTERGELER</p>
        <AnimatePresence mode="wait" initial={false}>
          {!result ? (
            <motion.div
              key="empty"
              className="calculator-empty"
              initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Activity size={46} />
              <h2>
                Rakamların arkasındaki
                <br />
                <em>dengeyi anlayın.</em>
              </h2>
              <p>
                Bilgilerinizi girin; enerji, su ve makro besin tahminlerini aynı
                yerde görün.
              </p>
              <span>
                <ShieldCheck size={15} /> Üyelik yok. Veri kaydı yok.
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              aria-live="polite"
              initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduced ? undefined : { opacity: 0, y: -8, filter: "blur(2px)" }}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
            {dirty && (
              <p className="result-stale">
                Bilgiler değişti. Güncel sonuçlar için yeniden hesaplayın.
              </p>
            )}
            <div className="energy-result">
              <span>GÜNLÜK ENERJİ SENARYOSU</span>
              <strong>
                {result.targetCalories.toLocaleString("tr-TR")}
                <small>kcal</small>
              </strong>
              <p>
                {result.adjustment === 0
                  ? "Tahmini koruma enerjisi"
                  : result.adjustment < 0
                    ? "Tahmini toplam enerjiden " +
                      Math.abs(result.adjustment) +
                      " kcal daha az"
                    : "Tahmini toplam enerjiden " +
                      result.adjustment +
                      " kcal daha fazla"}
              </p>
            </div>
            <div className="result-grid">
              {[
                {
                  label: "BMR",
                  value: result.bmr,
                  unit: "kcal",
                  desc: "Dinlenme enerjisi",
                  icon: Flame,
                },
                {
                  label: "TDEE",
                  value: result.tdee,
                  unit: "kcal",
                  desc: "Toplam günlük enerji",
                  icon: Activity,
                },
                {
                  label: "Su tahmini",
                  value: result.waterMl,
                  unit: "ml",
                  desc: "Kaba referans · 30 ml/kg",
                  icon: Droplets,
                },
                {
                  label: "BMI / VKİ",
                  value: result.bmi,
                  unit: "kg/m²",
                  desc: result.bmiLabel,
                  icon: Scale,
                },
              ].map((item) => (
                <div key={item.label}>
                  <span>
                    <item.icon size={16} />
                    {item.label}
                  </span>
                  <strong>
                    {item.value.toLocaleString("tr-TR")}{" "}
                    <small>{item.unit}</small>
                  </strong>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="macro-results">
              <h3>Enerjinin dağılımı</h3>
              {result.macros.map((m, i) => (
                <div key={m.label} className={"macro-row macro-" + i}>
                  <div>
                    <span>{m.label}</span>
                    <strong>
                      ≈ {Math.round(m.grams)} g <small>· %{m.percent}</small>
                    </strong>
                  </div>
                  <div
                    role="meter"
                    aria-label={m.label + " enerji oranı"}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={m.percent}
                  >
                    <span style={{ width: m.percent + "%" }} />
                  </div>
                </div>
              ))}
            </div>
            {!result.canAdjust && (
              <p className="result-advice">
                Yaşınız veya BMI değeriniz nedeniyle enerji azaltma/artırma
                uygulanmadı. Size uygun hedef için bireysel değerlendirme
                gerekir.
              </p>
            )}
            <p className="result-advice">
              Tıbbi değerlendirme değildir. Bu değerler genel tahmindir; ölçüm
              veya kişisel beslenme planı olarak kullanılmamalıdır.
            </p>
            <Link href="/randevu" className="text-link">
              Sonuçları birlikte değerlendirelim <ArrowUpRight size={16} />
            </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
