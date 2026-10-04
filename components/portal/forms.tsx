"use client";
import { useState, useTransition, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  ActionResult,
  Client,
  Measurement,
  DietPlan,
  Meal,
  Appointment,
} from "@/lib/portal/types";
import {
  saveClient,
  saveMeasurement,
  deleteMeasurement,
  savePlan,
  duplicatePlan,
  saveAppointment,
  inviteClient,
} from "@/lib/portal/actions";
type FieldProps = {
  label: string;
  name: string;
  value?: string | number | null;
  type?: string;
  required?: boolean;
  options?: readonly string[];
  values?: readonly string[];
  wide?: boolean;
};
export function Field({
  label,
  name,
  value,
  type = "text",
  required = false,
  options,
  values,
  wide,
}: FieldProps) {
  return (
    <label className={wide ? "portal-wide" : undefined}>
      {label}
      {options ? (
        <select
          name={name}
          defaultValue={value ?? options[0]}
          required={required}
        >
          {options.map((o, i) => (
            <option key={o} value={values?.[i] ?? o}>
              {o}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          defaultValue={value ?? ""}
          rows={4}
          maxLength={5000}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={value ?? ""}
          required={required}
          step={type === "number" ? "any" : undefined}
          maxLength={type === "email" ? 254 : 2000}
        />
      )}
    </label>
  );
}
export function DuplicatePlanButton({ id }: { id: string }) {
  return (
    <ConfirmButton
      label="Yeni haftaya kopyala"
      title="Yeni hafta taslağı oluşturulsun mu?"
      description="Öğünler ve notlar kopyalanır. Yeni plan son kayıtlı haftanın bitişinden sonraki gün başlar; siz paylaşana kadar danışana görünmez."
      action={() => duplicatePlan(id)}
    />
  );
}
export function EditForm({
  children,
  action,
  onSaved,
  button = "Kaydet",
}: {
  children: React.ReactNode;
  action: (form: FormData) => Promise<ActionResult>;
  onSaved?: (result: ActionResult) => void;
  button?: string;
}) {
  const [result, setResult] = useState<ActionResult>({}),
    [pending, start] = useTransition();
  const router = useRouter();
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  return (
    <form
      className="portal-form portal-form-grid"
      aria-busy={pending}
      onChange={() => {
        setDirty(true);
        setResult({});
      }}
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(
          event.currentTarget,
          (event.nativeEvent as SubmitEvent).submitter,
        );
        start(async () => {
          try {
            const result = await action(form);
            setResult(result);
            if (result.success) {
              setDirty(false);
              router.refresh();
              onSaved?.(result);
            }
          } catch {
            setResult({
              error: "İşlem tamamlanamadı. Yeniden giriş yapıp deneyin.",
            });
          }
        });
      }}
    >
      <fieldset disabled={pending}>{children}</fieldset>
      <div className="portal-form-end">
        <p
          role="status"
          className={result.error ? "portal-error" : "portal-success"}
        >
          {result.error ||
            result.success ||
            (dirty
              ? "Kaydedilmemiş değişiklikler var."
              : "Değişikliklerinizi tamamlayıp kaydedin.")}
        </p>
        <button className="portal-button" disabled={pending}>
          {pending && <span className="portal-spinner" aria-hidden="true" />}
          {pending ? "Kaydediliyor…" : button}
        </button>
      </div>
    </form>
  );
}
export function ConfirmButton({
  label,
  title,
  description,
  action,
}: {
  label: string;
  title: string;
  description: string;
  action: () => Promise<ActionResult>;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    [pending, start] = useTransition(),
    [result, setResult] = useState<ActionResult>({});
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        className="portal-link"
        onClick={() => dialog.current?.showModal()}
      >
        {label}
      </button>
      <dialog ref={dialog} className="portal-dialog">
        <h2>{title}</h2>
        <p>{description}</p>
        <p
          role="status"
          className={result.error ? "portal-error" : "portal-success"}
        >
          {result.error || result.success}
        </p>
        <div className="portal-actions">
          <button
            disabled={pending}
            className="portal-button portal-button-secondary"
            onClick={() => dialog.current?.close()}
          >
            Vazgeç
          </button>
          <button
            disabled={pending}
            className="portal-button"
            onClick={() =>
              start(async () => {
                try {
                  const r = await action();
                  setResult(r);
                  if (r.success) {
                    router.refresh();
                    dialog.current?.close();
                  }
                } catch {
                  setResult({ error: "İşlem tamamlanamadı." });
                }
              })
            }
          >
            {pending ? "İşleniyor…" : "Onayla"}
          </button>
        </div>
      </dialog>
    </>
  );
}
export function InviteButton({ id }: { id: string }) {
  const [result, setResult] = useState<ActionResult>({}),
    [pending, start] = useTransition();
  return (
    <div>
      <button
        type="button"
        className="portal-button portal-button-secondary"
        disabled={pending}
        onClick={() =>
          start(async () => {
            try {
              setResult(await inviteClient(id));
            } catch {
              setResult({ error: "Davet oluşturulamadı." });
            }
          })
        }
      >
        {pending ? "Davet hazırlanıyor…" : "Danışan hesabı için davet gönder"}
      </button>
      <p
        role="status"
        className={result.error ? "portal-error" : "portal-success"}
      >
        {result.error || result.success}
      </p>
    </div>
  );
}
export function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  return (
    <EditForm
      action={(f) => saveClient(Object.fromEntries(f), client?.id)}
      onSaved={(r) => {
        if (!client && r.id) router.push("/admin/danisanlar/" + r.id);
      }}
    >
      <Field name="first_name" label="Ad" value={client?.first_name} required />
      <Field
        name="last_name"
        label="Soyad"
        value={client?.last_name}
        required
      />
      <Field
        name="email"
        label="E-posta"
        type="email"
        value={client?.email}
        required
      />
      <Field name="phone" label="Telefon" type="tel" value={client?.phone} />
      <Field
        name="birth_date"
        label="Doğum tarihi"
        type="date"
        value={client?.birth_date}
      />
      <Field
        name="gender"
        label="Cinsiyet (isteğe bağlı)"
        value={client?.gender}
        options={["", "Kadın", "Erkek", "Belirtmek istemiyor"]}
      />
      <Field
        name="start_date"
        label="Başlangıç tarihi"
        type="date"
        value={
          client?.start_date ??
          new Date().toLocaleDateString("en-CA", {
            timeZone: "Europe/Istanbul",
          })
        }
        required
      />
      <Field
        name="target_weight"
        label="Hedef ağırlık (kg)"
        type="number"
        value={client?.target_weight}
      />
      <Field
        name="status"
        label="Durum"
        value={client?.status ?? "active"}
        options={["Aktif", "Pasif"]}
        values={["active", "passive"]}
      />
      <Field
        name="goal"
        label="Hedef"
        type="textarea"
        value={client?.goal}
        wide
      />
      <Field
        name="notes"
        label="Danışan notları"
        type="textarea"
        value={client?.notes}
        wide
      />
    </EditForm>
  );
}
export function MeasurementForm({
  clientId,
  value,
}: {
  clientId: string;
  value?: Measurement;
}) {
  return (
    <EditForm
      action={(f) =>
        saveMeasurement(
          { ...Object.fromEntries(f), client_id: clientId },
          value?.id,
        )
      }
    >
      <Field
        name="measurement_date"
        label="Ölçüm tarihi"
        type="date"
        value={
          value?.measurement_date ??
          new Date().toLocaleDateString("en-CA", {
            timeZone: "Europe/Istanbul",
          })
        }
        required
      />
      <Field
        name="weight"
        label="Ağırlık (kg)"
        type="number"
        value={value?.weight}
        required
      />
      <Field name="waist" label="Bel (cm)" type="number" value={value?.waist} />
      <Field name="hip" label="Kalça (cm)" type="number" value={value?.hip} />
      <Field
        name="body_fat_percentage"
        label="Yağ oranı (%)"
        type="number"
        value={value?.body_fat_percentage}
      />
      <Field name="note" label="Not" type="textarea" value={value?.note} wide />
    </EditForm>
  );
}
export function MeasurementEditor({ row }: { row: Measurement }) {
  return (
    <details className="portal-disclosure">
      <summary>
        {row.measurement_date} · {row.weight} kg · Düzenle
      </summary>
      <MeasurementForm clientId={row.client_id} value={row} />
      <ConfirmButton
        label="Ölçümü sil"
        title="Ölçüm silinsin mi?"
        description="Bu işlem ölçüm kaydını kalıcı olarak kaldırır."
        action={() => deleteMeasurement(row.id)}
      />
    </details>
  );
}
export function PlanForm({
  clientId,
  plan,
  nextWeek = 1,
}: {
  clientId: string;
  plan?: DietPlan;
  nextWeek?: number;
}) {
  const [meals, setMeals] = useState<Meal[]>(
    plan?.content.meals ?? [{ name: "Kahvaltı", time: "", items: [""] }],
  );
  const update = (i: number, patch: Partial<Meal>) =>
    setMeals(meals.map((m, j) => (j === i ? { ...m, ...patch } : m)));
  return (
    <EditForm
      button="Planı kaydet"
      action={(f) =>
        savePlan(
          {
            ...Object.fromEntries(f),
            status: f.get("publish") === "yes" ? "published" : f.get("status"),
            client_id: clientId,
            content: { meals },
          },
          plan?.id,
        )
      }
    >
      <Field name="title" label="Plan başlığı" value={plan?.title} required />
      <Field
        name="week_number"
        label="Hafta numarası"
        type="number"
        value={plan?.week_number ?? nextWeek}
        required
      />
      <Field
        name="start_date"
        label="Başlangıç"
        type="date"
        value={plan?.start_date}
        required
      />
      <Field
        name="end_date"
        label="Bitiş"
        type="date"
        value={plan?.end_date}
        required
      />
      <Field
        name="status"
        label="Yayın durumu"
        value={plan?.status ?? "draft"}
        options={["Taslak", "Yayında", "Arşiv"]}
        values={["draft", "published", "archived"]}
      />
      <div className="portal-wide portal-meals">
        {meals.map((meal, i) => (
          <section key={i} className="portal-meal-editor">
            <div className="portal-fields">
              <label>
                Öğün adı
                <input
                  value={meal.name}
                  maxLength={100}
                  required
                  onChange={(e) => update(i, { name: e.target.value })}
                />
              </label>
              <label>
                Saat (isteğe bağlı)
                <input
                  type="time"
                  value={meal.time}
                  onChange={(e) => update(i, { time: e.target.value })}
                />
              </label>
            </div>
            {meal.items.map((item, k) => (
              <div className="portal-row-input" key={k}>
                <label
                  className="sr-only"
                  htmlFor={`meal-${plan?.id ?? "new"}-${i}-${k}`}
                >
                  Besin {k + 1}
                </label>
                <input
                  id={`meal-${plan?.id ?? "new"}-${i}-${k}`}
                  value={item}
                  placeholder="Besin ve porsiyon"
                  required
                  maxLength={500}
                  onChange={(e) =>
                    update(i, {
                      items: meal.items.map((v, j) =>
                        j === k ? e.target.value : v,
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  aria-label={`Besin ${k + 1} satırını kaldır`}
                  onClick={() =>
                    update(i, { items: meal.items.filter((_, j) => j !== k) })
                  }
                >
                  Kaldır
                </button>
              </div>
            ))}
            <div className="portal-actions">
              <button
                className="portal-link"
                type="button"
                onClick={() => update(i, { items: [...meal.items, ""] })}
              >
                + Besin ekle
              </button>
              <button
                className="portal-link"
                type="button"
                onClick={() => setMeals(meals.filter((_, j) => i !== j))}
              >
                Öğünü kaldır
              </button>
            </div>
          </section>
        ))}
        <button
          className="portal-button portal-button-secondary"
          type="button"
          onClick={() =>
            setMeals([...meals, { name: "", time: "", items: [""] }])
          }
        >
          + Öğün ekle
        </button>
      </div>
      <Field
        name="notes"
        label="Danışana notlar"
        type="textarea"
        value={plan?.notes}
        wide
      />
      <div className="portal-wide">
        <button
          type="submit"
          name="publish"
          value="yes"
          className="portal-button"
        >
          Danışanla paylaş
        </button>
        <p className="portal-muted">
          Bu seçenek planı kaydeder ve danışanın kendi hesabında görünür hale
          getirir.
        </p>
      </div>
    </EditForm>
  );
}
export function AppointmentForm({
  clients,
  value,
  clientId,
}: {
  clients: Pick<Client, "id" | "first_name" | "last_name">[];
  value?: Appointment;
  clientId?: string;
}) {
  return (
    <EditForm action={(f) => saveAppointment(Object.fromEntries(f), value?.id)}>
      <Field
        name="client_id"
        label="Danışan"
        value={value?.client_id ?? clientId}
        options={clients.map((c) => c.first_name + " " + c.last_name)}
        values={clients.map((c) => c.id)}
        required
      />
      <Field
        name="appointment_date"
        label="Tarih"
        type="date"
        value={value?.appointment_date}
        required
      />
      <Field
        name="start_time"
        label="Başlangıç (İstanbul)"
        type="time"
        value={value?.start_time.slice(0, 5)}
        required
      />
      <Field
        name="end_time"
        label="Bitiş (İstanbul)"
        type="time"
        value={value?.end_time.slice(0, 5)}
        required
      />
      <Field
        name="appointment_type"
        label="Görüşme türü"
        value={value?.appointment_type}
        options={["İlk Görüşme", "Kontrol", "Online Görüşme", "Ölçüm", "Diğer"]}
      />
      <Field
        name="status"
        label="Durum"
        value={value?.status ?? "scheduled"}
        options={["Planlandı", "Tamamlandı", "İptal", "Gelmedi"]}
        values={["scheduled", "completed", "cancelled", "no_show"]}
      />
      <Field
        name="note"
        label="Görüşme notu"
        type="textarea"
        value={value?.note}
        wide
      />
    </EditForm>
  );
}
