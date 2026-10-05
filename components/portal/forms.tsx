"use client";

import {
  useState,
  useTransition,
  useRef,
  useEffect,
  useId,
} from "react";
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
  deletePlan,
  deleteAppointment,
  saveAppointment,
  inviteClient,
  deleteClient,
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
          {options.map((option, index) => (
            <option
              key={option}
              value={values?.[index] ?? option}
            >
              {option}
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

export function DeletePlanButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <ConfirmButton
      label="Planı sil"
      title="Bu plan silinsin mi?"
      description={`“${title}” kalıcı olarak kaldırılacak ve danışan hesabında görünmeyecek. Saklamak isterseniz yayın durumunu Arşiv olarak değiştirebilirsiniz.`}
      action={() => deletePlan(id)}
      danger
      confirmLabel="Planı sil"
    />
  );
}

export function DeleteAppointmentButton({
  id,
}: {
  id: string;
}) {
  return (
    <ConfirmButton
      label="Randevuyu sil"
      title="Randevu silinsin mi?"
      description="Yanlış oluşturulan bu kayıt kalıcı olarak kaldırılacak. Görüşme geçmişini korumak için durumunu İptal olarak değiştirebilirsiniz."
      action={() => deleteAppointment(id)}
      danger
      confirmLabel="Randevuyu sil"
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
  const [result, setResult] = useState<ActionResult>({});
  const [pending, start] = useTransition();
  const router = useRouter();
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (!dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);

    return () => {
      window.removeEventListener("beforeunload", warn);
    };
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
            const response = await action(form);

            setResult(response);

            if (response.success) {
              setDirty(false);
              router.refresh();
              onSaved?.(response);
            }
          } catch {
            setResult({
              error:
                "İşlem tamamlanamadı. Yeniden giriş yapıp tekrar deneyin.",
            });
          }
        });
      }}
    >
      <fieldset disabled={pending}>
        {children}
      </fieldset>

      <div className="portal-form-end">
        <p
          role="status"
          className={
            result.error
              ? "portal-error"
              : "portal-success"
          }
        >
          {result.error ||
            result.success ||
            (dirty
              ? "Kaydedilmemiş değişiklikler var."
              : "Değişikliklerinizi tamamlayıp kaydedin.")}
        </p>

        <button
          className="portal-button"
          disabled={pending}
        >
          {pending && (
            <span
              className="portal-spinner"
              aria-hidden="true"
            />
          )}

          {pending
            ? "Kaydediliyor…"
            : button}
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
  successHref,
  danger = false,
  confirmLabel = "Onayla",
}: {
  label: string;
  title: string;
  description: string;
  action: () => Promise<ActionResult>;
  successHref?: string;
  danger?: boolean;
  confirmLabel?: string;
}) {
  const titleId = useId();

  const dialog = useRef<HTMLDialogElement>(null);

  const [pending, start] = useTransition();

  const [result, setResult] =
    useState<ActionResult>({});

  const router = useRouter();

  function openDialog() {
    setResult({});
    dialog.current?.showModal();
  }

  function closeDialog() {
    if (pending) return;

    setResult({});
    dialog.current?.close();
  }

  return (
    <>
      <button
        type="button"
        className="portal-link"
        style={
          danger
            ? {
                color: "#a02b22",
              }
            : undefined
        }
        onClick={openDialog}
      >
        {label}
      </button>

      <dialog
        ref={dialog}
        className="portal-dialog"
        aria-labelledby={titleId}
        onCancel={(event) => {
          if (pending) {
            event.preventDefault();
          }
        }}
      >
        <h2 id={titleId}>
          {title}
        </h2>

        <p>
          {description}
        </p>

        {danger ? (
          <p
            style={{
              marginTop: 12,
              color: "#a02b22",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Bu işlem geri alınamaz.
          </p>
        ) : null}

        <p
          role="status"
          aria-live="polite"
          className={
            result.error
              ? "portal-error"
              : "portal-success"
          }
        >
          {result.error ||
            result.success}
        </p>

        <div className="portal-actions">
          <button
            type="button"
            disabled={pending}
            className="portal-button portal-button-secondary"
            onClick={closeDialog}
          >
            Vazgeç
          </button>

          <button
            type="button"
            disabled={pending}
            className="portal-button"
            style={
              danger
                ? {
                    background: "#a02b22",
                    borderColor: "#a02b22",
                    color: "#ffffff",
                  }
                : undefined
            }
            onClick={() => {
              start(async () => {
                try {
                  const response =
                    await action();

                  setResult(response);

                  if (
                    !response.success
                  ) {
                    return;
                  }

                  dialog.current?.close();

                  if (successHref) {
                    router.replace(
                      successHref,
                    );
                    router.refresh();
                    return;
                  }

                  router.refresh();
                } catch {
                  setResult({
                    error:
                      "İşlem tamamlanamadı. Lütfen tekrar deneyin.",
                  });
                }
              });
            }}
          >
            {pending
              ? "İşleniyor…"
              : confirmLabel}
          </button>
        </div>
      </dialog>
    </>
  );
}

export function InviteButton({
  id,
  linked = false,
}: {
  id: string;
  linked?: boolean;
}) {
  const router = useRouter();

  const [result, setResult] =
    useState<ActionResult>({});

  const [pending, start] =
    useTransition();

  return (
    <div>
      <button
        type="button"
        className="portal-button portal-button-secondary"
        disabled={pending}
        onClick={() => {
          start(async () => {
            try {
              const response =
                await inviteClient(id);

              setResult(response);

              if (response.success) {
                router.refresh();
              }
            } catch {
              setResult({
                error:
                  "Davet oluşturulamadı.",
              });
            }
          });
        }}
      >
        {pending
          ? "Bağlantı hazırlanıyor…"
          : linked
            ? "Şifre belirleme bağlantısını yenile"
            : "Danışanı portala davet et"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={
          result.error
            ? "portal-error"
            : "portal-success"
        }
      >
        {result.error ||
          result.success}
      </p>
    </div>
  );
}

export function DeleteClientButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <ConfirmButton
      label="Danışanı kalıcı olarak sil"
      title="Danışan kalıcı olarak silinsin mi?"
      description={`${name} adlı danışanın danışan dosyası, ölçümleri, diyet planları, randevuları, portal profili ve varsa bağlı giriş hesabı kalıcı olarak kaldırılacak.`}
      action={() => deleteClient(id)}
      successHref="/admin/danisanlar"
      danger
      confirmLabel="Danışanı kalıcı olarak sil"
    />
  );
}

export function ClientForm({
  client,
}: {
  client?: Client;
}) {
  const router = useRouter();

  return (
    <EditForm
      action={(form) =>
        saveClient(
          Object.fromEntries(form),
          client?.id,
        )
      }
      onSaved={(result) => {
        if (
          !client &&
          result.id
        ) {
          router.push(
            "/admin/danisanlar/" +
              result.id,
          );
        }
      }}
    >
      <Field
        name="first_name"
        label="Ad"
        value={client?.first_name}
        required
      />

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

      <Field
        name="phone"
        label="Telefon"
        type="tel"
        value={client?.phone}
      />

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
        options={[
          "",
          "Kadın",
          "Erkek",
          "Belirtmek istemiyor",
        ]}
      />

      <Field
        name="start_date"
        label="Başlangıç tarihi"
        type="date"
        value={
          client?.start_date ??
          new Date().toLocaleDateString(
            "en-CA",
            {
              timeZone:
                "Europe/Istanbul",
            },
          )
        }
        required
      />

      <Field
        name="target_weight"
        label="Hedef ağırlık (kg)"
        type="number"
        value={
          client?.target_weight
        }
      />

      <Field
        name="status"
        label="Durum"
        value={
          client?.status ??
          "active"
        }
        options={[
          "Aktif",
          "Pasif",
        ]}
        values={[
          "active",
          "passive",
        ]}
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
      action={(form) =>
        saveMeasurement(
          {
            ...Object.fromEntries(
              form,
            ),
            client_id:
              clientId,
          },
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
          new Date().toLocaleDateString(
            "en-CA",
            {
              timeZone:
                "Europe/Istanbul",
            },
          )
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

      <Field
        name="waist"
        label="Bel (cm)"
        type="number"
        value={value?.waist}
      />

      <Field
        name="hip"
        label="Kalça (cm)"
        type="number"
        value={value?.hip}
      />

      <Field
        name="body_fat_percentage"
        label="Yağ oranı (%)"
        type="number"
        value={
          value?.body_fat_percentage
        }
      />

      <Field
        name="note"
        label="Not"
        type="textarea"
        value={value?.note}
        wide
      />
    </EditForm>
  );
}

export function MeasurementEditor({
  row,
}: {
  row: Measurement;
}) {
  return (
    <details className="portal-disclosure">
      <summary>
        {row.measurement_date} ·{" "}
        {row.weight} kg · Düzenle
      </summary>

      <MeasurementForm
        clientId={row.client_id}
        value={row}
      />

      <ConfirmButton
        label="Ölçümü sil"
        title="Ölçüm silinsin mi?"
        description="Bu işlem ölçüm kaydını kalıcı olarak kaldırır."
        action={() =>
          deleteMeasurement(row.id)
        }
        danger
        confirmLabel="Ölçümü sil"
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
  const [meals, setMeals] =
    useState<Meal[]>(
      plan?.content.meals ?? [
        {
          name: "Kahvaltı",
          time: "",
          items: [""],
        },
      ],
    );

  const update = (
    index: number,
    patch: Partial<Meal>,
  ) => {
    setMeals(
      meals.map(
        (meal, currentIndex) =>
          currentIndex === index
            ? {
                ...meal,
                ...patch,
              }
            : meal,
      ),
    );
  };

  return (
    <EditForm
      button="Planı kaydet"
      action={(form) =>
        savePlan(
          {
            ...Object.fromEntries(
              form,
            ),
            status:
              form.get(
                "publish",
              ) === "yes"
                ? "published"
                : form.get(
                    "status",
                  ),
            client_id:
              clientId,
            content: {
              meals,
            },
          },
          plan?.id,
        )
      }
    >
      <Field
        name="title"
        label="Plan başlığı"
        value={plan?.title}
        required
      />

      <Field
        name="week_number"
        label="Hafta numarası"
        type="number"
        value={
          plan?.week_number ??
          nextWeek
        }
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
        value={
          plan?.status ??
          "draft"
        }
        options={[
          "Taslak",
          "Yayında",
          "Arşiv",
        ]}
        values={[
          "draft",
          "published",
          "archived",
        ]}
      />

      <div className="portal-wide portal-meals">
        {meals.map(
          (
            meal,
            mealIndex,
          ) => (
            <section
              key={mealIndex}
              className="portal-meal-editor"
            >
              <div className="portal-fields">
                <label>
                  Öğün adı

                  <input
                    value={
                      meal.name
                    }
                    maxLength={
                      100
                    }
                    required
                    onChange={(
                      event,
                    ) =>
                      update(
                        mealIndex,
                        {
                          name: event
                            .target
                            .value,
                        },
                      )
                    }
                  />
                </label>

                <label>
                  Saat (isteğe bağlı)

                  <input
                    type="time"
                    value={
                      meal.time
                    }
                    onChange={(
                      event,
                    ) =>
                      update(
                        mealIndex,
                        {
                          time: event
                            .target
                            .value,
                        },
                      )
                    }
                  />
                </label>
              </div>

              {meal.items.map(
                (
                  item,
                  itemIndex,
                ) => (
                  <div
                    className="portal-row-input"
                    key={
                      itemIndex
                    }
                  >
                    <label
                      className="sr-only"
                      htmlFor={`meal-${plan?.id ?? "new"}-${mealIndex}-${itemIndex}`}
                    >
                      Besin{" "}
                      {itemIndex +
                        1}
                    </label>

                    <input
                      id={`meal-${plan?.id ?? "new"}-${mealIndex}-${itemIndex}`}
                      value={item}
                      placeholder="Besin ve porsiyon"
                      required
                      maxLength={
                        500
                      }
                      onChange={(
                        event,
                      ) =>
                        update(
                          mealIndex,
                          {
                            items:
                              meal.items.map(
                                (
                                  currentItem,
                                  currentIndex,
                                ) =>
                                  currentIndex ===
                                  itemIndex
                                    ? event
                                        .target
                                        .value
                                    : currentItem,
                              ),
                          },
                        )
                      }
                    />

                    <button
                      type="button"
                      aria-label={`Besin ${itemIndex + 1} satırını kaldır`}
                      onClick={() =>
                        update(
                          mealIndex,
                          {
                            items:
                              meal.items.filter(
                                (
                                  _,
                                  currentIndex,
                                ) =>
                                  currentIndex !==
                                  itemIndex,
                              ),
                          },
                        )
                      }
                    >
                      Kaldır
                    </button>
                  </div>
                ),
              )}

              <div className="portal-actions">
                <button
                  className="portal-link"
                  type="button"
                  onClick={() =>
                    update(
                      mealIndex,
                      {
                        items: [
                          ...meal.items,
                          "",
                        ],
                      },
                    )
                  }
                >
                  + Besin ekle
                </button>

                <button
                  className="portal-link"
                  type="button"
                  onClick={() =>
                    setMeals(
                      meals.filter(
                        (
                          _,
                          currentIndex,
                        ) =>
                          mealIndex !==
                          currentIndex,
                      ),
                    )
                  }
                >
                  Öğünü kaldır
                </button>
              </div>
            </section>
          ),
        )}

        <button
          className="portal-button portal-button-secondary"
          type="button"
          onClick={() =>
            setMeals([
              ...meals,
              {
                name: "",
                time: "",
                items: [""],
              },
            ])
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
          Bu seçenek planı kaydeder
          ve danışanın kendi
          hesabında görünür hale
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
  clients: Pick<
    Client,
    "id" | "first_name" | "last_name"
  >[];
  value?: Appointment;
  clientId?: string;
}) {
  return (
    <EditForm
      action={(form) =>
        saveAppointment(
          Object.fromEntries(
            form,
          ),
          value?.id,
        )
      }
    >
      <Field
        name="client_id"
        label="Danışan"
        value={
          value?.client_id ??
          clientId
        }
        options={clients.map(
          (client) =>
            client.first_name +
            " " +
            client.last_name,
        )}
        values={clients.map(
          (client) => client.id,
        )}
        required
      />

      <Field
        name="appointment_date"
        label="Tarih"
        type="date"
        value={
          value?.appointment_date
        }
        required
      />

      <Field
        name="start_time"
        label="Başlangıç (İstanbul)"
        type="time"
        value={value?.start_time.slice(
          0,
          5,
        )}
        required
      />

      <Field
        name="end_time"
        label="Bitiş (İstanbul)"
        type="time"
        value={value?.end_time.slice(
          0,
          5,
        )}
        required
      />

      <Field
        name="appointment_type"
        label="Görüşme türü"
        value={
          value?.appointment_type
        }
        options={[
          "İlk Görüşme",
          "Kontrol",
          "Online Görüşme",
          "Ölçüm",
          "Diğer",
        ]}
      />

      <Field
        name="status"
        label="Durum"
        value={
          value?.status ??
          "scheduled"
        }
        options={[
          "Planlandı",
          "Tamamlandı",
          "İptal",
          "Gelmedi",
        ]}
        values={[
          "scheduled",
          "completed",
          "cancelled",
          "no_show",
        ]}
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