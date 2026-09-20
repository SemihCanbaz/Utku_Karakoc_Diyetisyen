export type Goal = "maintain" | "lose" | "gain";
export type CalculatorInput = {
  age: number;
  height: number;
  weight: number;
  gender: "erkek" | "kadin";
  activity: number;
  goal: Goal;
  proteinPercent: number;
  fatPercent: number;
};
export const activityLevels = [
  {
    value: 1.2,
    label: "Düşük hareket",
    description: "Çoğunlukla oturarak geçirilen günler",
  },
  {
    value: 1.375,
    label: "Hafif hareket",
    description: "Haftada 1–3 gün hafif egzersiz",
  },
  {
    value: 1.55,
    label: "Orta hareket",
    description: "Haftada 3–5 gün egzersiz",
  },
  {
    value: 1.725,
    label: "Yüksek hareket",
    description: "Haftada 6–7 gün yoğun hareket",
  },
];
export function validateInput(input: CalculatorInput) {
  const errors: Partial<Record<keyof CalculatorInput, string>> = {};
  if (
    !Number.isFinite(input.age) ||
    !Number.isInteger(input.age) ||
    input.age < 18 ||
    input.age > 90
  )
    errors.age = "18–90 arasında tam bir yaş girin.";
  if (
    !Number.isFinite(input.height) ||
    input.height < 120 ||
    input.height > 220
  )
    errors.height = "120–220 cm arasında boy girin.";
  if (!Number.isFinite(input.weight) || input.weight < 35 || input.weight > 250)
    errors.weight = "35–250 kg arasında kilo girin.";
  if (!["erkek", "kadin"].includes(input.gender))
    errors.gender = "Formülde kullanılacak cinsiyeti seçin.";
  if (!activityLevels.some((a) => a.value === input.activity))
    errors.activity = "Hareket seviyenizi seçin.";
  if (!["maintain", "lose", "gain"].includes(input.goal))
    errors.goal = "Geçerli bir hedef seçin.";
  if (
    !Number.isFinite(input.proteinPercent) ||
    input.proteinPercent < 15 ||
    input.proteinPercent > 30
  )
    errors.proteinPercent = "Protein oranı %15–30 arasında olmalı.";
  if (
    !Number.isFinite(input.fatPercent) ||
    input.fatPercent < 20 ||
    input.fatPercent > 35
  )
    errors.fatPercent = "Yağ oranı %20–35 arasında olmalı.";
  return errors;
}
export function calculate(input: CalculatorInput) {
  const errors = validateInput(input);
  if (Object.keys(errors).length)
    throw new Error("Geçersiz hesaplama girdisi.");
  const {
    age,
    height,
    weight,
    gender,
    activity,
    goal,
    proteinPercent,
    fatPercent,
  } = input;
  const bmr =
    10 * weight + 6.25 * height - 5 * age + (gender === "erkek" ? 5 : -161);
  const tdee = bmr * activity,
    bmi = weight / (height / 100) ** 2;
  // Adult energy scenarios are not prescribed to younger adults or outside the reference BMI range.
  const canAdjust = age >= 20 && bmi >= 18.5 && bmi < 30;
  const adjustment = canAdjust
    ? goal === "lose"
      ? -Math.min(300, tdee * 0.15)
      : goal === "gain"
        ? 250
        : 0
    : 0;
  const targetCalories = Math.round(tdee + adjustment);
  const carbPercent = 100 - proteinPercent - fatPercent;
  const macros = [
    {
      label: "Protein",
      grams: (targetCalories * proteinPercent) / 100 / 4,
      percent: proteinPercent,
    },
    {
      label: "Karbonhidrat",
      grams: (targetCalories * carbPercent) / 100 / 4,
      percent: carbPercent,
    },
    {
      label: "Yağ",
      grams: (targetCalories * fatPercent) / 100 / 9,
      percent: fatPercent,
    },
  ];
  const bmiLabel =
    age < 20
      ? "Yaşa göre değerlendirme gerekir"
      : bmi < 18.5
        ? "Referans aralığın altında"
        : bmi < 25
          ? "Referans aralık"
          : bmi < 30
            ? "Referans aralığın üzerinde"
            : "Kişisel değerlendirme önerilir";
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories,
    bmi: Number(bmi.toFixed(1)),
    bmiLabel,
    waterMl: Math.round(weight * 30),
    macros,
    adjustment: Math.round(adjustment),
    canAdjust,
  };
}

export function calculateBmi(weight: number, height: number) {
  if (!Number.isFinite(weight) || weight < 35 || weight > 250) throw new Error("Geçerli kilo aralığı 35–250 kg.");
  if (!Number.isFinite(height) || height < 120 || height > 220) throw new Error("Geçerli boy aralığı 120–220 cm.");
  const bmi = weight / (height / 100) ** 2;
  const label = bmi < 18.5 ? "Referans aralığın altında" : bmi < 25 ? "Referans aralık" : bmi < 30 ? "Referans aralığın üzerinde" : "Kişisel değerlendirme önerilir";
  return { value: Number(bmi.toFixed(1)), label };
}

export function calculateBmr(age: number, height: number, weight: number, gender: "erkek" | "kadin") {
  if (!Number.isInteger(age) || age < 18 || age > 90) throw new Error("Geçerli yaş aralığı 18–90.");
  if (height < 120 || height > 220) throw new Error("Geçerli boy aralığı 120–220 cm.");
  if (weight < 35 || weight > 250) throw new Error("Geçerli kilo aralığı 35–250 kg.");
  return Math.round(10 * weight + 6.25 * height - 5 * age + (gender === "erkek" ? 5 : -161));
}

export function calculateTdeeValue(bmr: number, activity: number) {
  if (!activityLevels.some((item) => item.value === activity)) throw new Error("Geçerli hareket düzeyi seçin.");
  return Math.round(bmr * activity);
}

export function calculateWater(weight: number) {
  if (!Number.isFinite(weight) || weight < 35 || weight > 250) throw new Error("Geçerli kilo aralığı 35–250 kg.");
  return Math.round(weight * 30);
}

export function calculateReferenceWeight(height: number) {
  if (!Number.isFinite(height) || height < 120 || height > 220) throw new Error("Geçerli boy aralığı 120–220 cm.");
  return Number((22 * (height / 100) ** 2).toFixed(1));
}

export function calculateWaistHeightRatio(waist: number, height: number) {
  if (!Number.isFinite(waist) || waist < 40 || waist > 200) throw new Error("Geçerli bel çevresi aralığı 40–200 cm.");
  if (!Number.isFinite(height) || height < 120 || height > 220) throw new Error("Geçerli boy aralığı 120–220 cm.");
  const ratio = waist / height;
  return {
    value: Number(ratio.toFixed(2)),
    label: ratio < 0.5 ? "Genel 0,5 tarama eşiğinin altında" : "Genel 0,5 tarama eşiğinde veya üzerinde",
  };
}
