import assert from "node:assert/strict";
import { calculate, validateInput, calculateBmi, calculateBmr, calculateTdeeValue, calculateWater, calculateReferenceWeight, calculateWaistHeightRatio } from "../lib/calculations.ts";
const base = {
  age: 30,
  height: 170,
  weight: 70,
  gender: "kadin",
  activity: 1.55,
  goal: "maintain",
  proteinPercent: 20,
  fatPercent: 30,
};
assert.equal(calculate(base).bmr, 1452);
assert.equal(calculate({ ...base, gender: "erkek" }).bmr, 1618);
assert.equal(calculate({ ...base, gender: "erkek" }).tdee, 2507);
assert.equal(calculate(base).bmi, 24.2);
assert.equal(calculate(base).bmiLabel, "Referans aralık");
assert.equal(calculate(base).waterMl, 2100);
assert.deepEqual(calculateBmi(70, 170), { value: 24.2, label: "Referans aralık" });
assert.equal(calculateBmr(30, 170, 70, "kadin"), 1452);
assert.equal(calculateTdeeValue(1452, 1.55), 2251);
assert.equal(calculateWater(70), 2100);
assert.equal(calculateReferenceWeight(170), 63.6);
assert.deepEqual(calculateWaistHeightRatio(80, 170), { value: 0.47, label: "Genel 0,5 tarama eşiğinin altında" });
assert.throws(() => calculateWaistHeightRatio(20, 170));
assert.throws(() => calculateReferenceWeight(100));

assert.equal(calculate({ ...base, goal: "lose" }).adjustment, -300);
assert.equal(calculate({ ...base, goal: "gain" }).adjustment, 250);
assert.equal(calculate({ ...base, age: 19, goal: "lose" }).adjustment, 0);
assert.equal(calculate({ ...base, weight: 40, goal: "lose" }).adjustment, 0);
assert.equal(calculate({ ...base, weight: 120, goal: "lose" }).adjustment, 0);
for (const patch of [
  { age: 0 },
  { age: 17 },
  { age: 91 },
  { age: 22.5 },
  { height: 0 },
  { height: 119 },
  { weight: -1 },
  { weight: 251 },
  { weight: NaN },
  { activity: 0 },
  { gender: "" },
  { proteinPercent: 50 },
  { fatPercent: -1 },
]) {
  assert.ok(Object.keys(validateInput({ ...base, ...patch })).length);
  assert.throws(() => calculate({ ...base, ...patch }));
}
let scenarios = 0;
for (const age of [18, 20, 60, 90])
  for (const height of [120, 170, 220])
    for (const weight of [35, 70, 250])
      for (const activity of [1.2, 1.375, 1.55, 1.725])
        for (const goal of ["lose", "maintain", "gain"]) {
          const r = calculate({ ...base, age, height, weight, activity, goal });
          assert.ok(
            r.macros.every(
              (m) =>
                Number.isFinite(m.grams) &&
                m.grams >= 0 &&
                m.percent >= 0 &&
                m.percent <= 100,
            ),
          );
          assert.equal(
            r.macros.reduce((n, m) => n + m.percent, 0),
            100,
          );
          assert.ok(
            Math.abs(
              r.macros[0].grams * 4 +
                r.macros[1].grams * 4 +
                r.macros[2].grams * 9 -
                r.targetCalories,
            ) < 0.001,
          );
          assert.ok(r.targetCalories > 0);
          scenarios++;
        }
assert.notDeepEqual(
  calculate({ ...base, proteinPercent: 25 }).macros,
  calculate(base).macros,
);
console.log(
  "PASS: known formula results, validation, adult scope, goal adjustments and " +
    scenarios +
    " boundary scenarios.",
);
