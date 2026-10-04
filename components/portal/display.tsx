import Link from "next/link";
import { ClipboardList } from "lucide-react";
import type { Measurement, DietPlan, Appointment } from "@/lib/portal/types";
import { stats } from "@/lib/portal/validation";
export const labels: Record<string, string> = {
  active: "Aktif",
  passive: "Pasif",
  draft: "Taslak",
  published: "Yayında",
  archived: "Arşiv",
  scheduled: "Planlandı",
  completed: "Tamamlandı",
  cancelled: "İptal",
  no_show: "Gelmedi",
};
export function Badge({ status }: { status: string }) {
  return (
    <span className={"portal-badge portal-badge-" + status}>
      {labels[status] ?? status}
    </span>
  );
}
export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="portal-page-title">
      <div>
        <p className="portal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-empty">
      <ClipboardList
        className="portal-empty-icon"
        size={30}
        aria-hidden="true"
      />
      <div>{children}</div>
    </div>
  );
}
export function DateText({ date }: { date: string }) {
  return (
    <time dateTime={date}>
      {new Date(date.slice(0, 10) + "T12:00:00Z").toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Istanbul",
      })}
    </time>
  );
}
export function Metric({
  label,
  value,
  note,
  icon,
}: {
  label: string;
  value: string | number;
  note?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="portal-metric">
      <span className="portal-metric-label">
        {label}
        {icon && <i aria-hidden="true">{icon}</i>}
      </span>
      <strong>{value}</strong>
      {note && <small>{note}</small>}
    </div>
  );
}
export function Measurements({
  rows,
  target,
}: {
  rows: Measurement[];
  target?: number | null;
}) {
  const s = stats(rows),
    list = s.list,
    min = Math.min(...list.map((r) => r.weight)) - 1,
    max = Math.max(...list.map((r) => r.weight)) + 1;
  const points = list
    .map(
      (r, i) =>
        `${30 + (i * 540) / Math.max(1, list.length - 1)},${160 - ((r.weight - min) / (max - min)) * 130}`,
    )
    .join(" ");
  return (
    <>
      <div className="portal-metrics">
        <Metric
          label="İlk ölçüm"
          value={s.first === null ? "—" : s.first + " kg"}
        />
        <Metric
          label="Son ölçüm"
          value={s.last === null ? "—" : s.last + " kg"}
        />
        <Metric
          label="Toplam değişim"
          value={
            s.total === null ? "—" : (s.total > 0 ? "+" : "") + s.total + " kg"
          }
        />
        <Metric
          label="Önceki ölçüme göre"
          value={
            s.change === null
              ? "—"
              : (s.change > 0 ? "+" : "") + s.change + " kg"
          }
          note={target ? "Hedef: " + target + " kg" : undefined}
        />
      </div>
      {rows.length ? (
        <>
          <div className="portal-chart">
            <h2>Ağırlığın zaman içindeki değişimi</h2>
            <p className="portal-muted">
              Ölçümler tarih sırasındadır. Tek başına kilo değişimi sağlık
              göstergesi değildir.
            </p>
            <svg
              viewBox="0 0 600 200"
              role="img"
              aria-label="Ağırlık değişimi; tüm değerler aşağıdaki tabloda"
            >
              <line x1="30" y1="170" x2="570" y2="170" stroke="#dce4df" />
              <polyline
                points={points}
                fill="none"
                stroke="#25745d"
                strokeWidth="3"
              />
              {list.map((r, i) => (
                <circle
                  key={r.measurement_date}
                  cx={30 + (i * 540) / Math.max(1, list.length - 1)}
                  cy={160 - ((r.weight - min) / (max - min)) * 130}
                  r="4"
                  fill="#25745d"
                >
                  <title>
                    {r.measurement_date}: {r.weight} kg
                  </title>
                </circle>
              ))}
            </svg>
            <div className="portal-actions">
              <span>{list[0].measurement_date}</span>
              <span>{list.at(-1)?.measurement_date}</span>
            </div>
          </div>
          <div className="portal-table-wrap">
            <table>
              <caption>Ölçüm geçmişi</caption>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Ağırlık</th>
                  <th>Bel</th>
                  <th>Kalça</th>
                  <th>Yağ oranı</th>
                  <th>Not</th>
                </tr>
              </thead>
              <tbody>
                {[...rows]
                  .sort((a, b) =>
                    b.measurement_date.localeCompare(a.measurement_date),
                  )
                  .map((r) => (
                    <tr key={r.id}>
                      <td>
                        <DateText date={r.measurement_date} />
                      </td>
                      <td>{r.weight} kg</td>
                      <td>{r.waist == null ? "—" : r.waist + " cm"}</td>
                      <td>{r.hip == null ? "—" : r.hip + " cm"}</td>
                      <td>
                        {r.body_fat_percentage == null
                          ? "—"
                          : "%" + r.body_fat_percentage}
                      </td>
                      <td>{r.note || "—"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Empty>
          Henüz ölçüm yok. İlk ölçüm eklendiğinde gelişim grafiğiniz burada
          görünecek.
        </Empty>
      )}
    </>
  );
}
export function PlanCard({ plan, href }: { plan: DietPlan; href?: string }) {
  return (
    <article className="portal-card">
      <div className="portal-actions">
        <p className="portal-eyebrow">{plan.week_number}. HAFTA</p>
        <Badge status={plan.status} />
      </div>
      <h2>{href ? <Link href={href}>{plan.title}</Link> : plan.title}</h2>
      <p>
        <DateText date={plan.start_date} /> – <DateText date={plan.end_date} />
      </p>
      {!href && (
        <>
          <div className="portal-plan-meals">
            {plan.content.meals.map((m, i) => (
              <section key={i}>
                <h3>
                  {m.name} <small>{m.time}</small>
                </h3>
                <ul>
                  {m.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          {plan.notes && <p className="portal-notice">{plan.notes}</p>}
        </>
      )}
    </article>
  );
}
export function AppointmentList({
  rows,
  names = {},
}: {
  rows: Appointment[];
  names?: Record<string, string>;
}) {
  return rows.length ? (
    <div className="portal-list">
      {rows.map((r) => (
        <article className="portal-appointment" key={r.id}>
          <div className="portal-date-square">
            <strong>{r.appointment_date.slice(-2)}</strong>
            <span>
              {new Date(r.appointment_date + "T12:00:00Z").toLocaleDateString(
                "tr-TR",
                { month: "short" },
              )}
            </span>
          </div>
          <div>
            <h3>{names[r.client_id] ?? r.appointment_type}</h3>
            <p>
              {r.start_time.slice(0, 5)} – {r.end_time.slice(0, 5)} ·{" "}
              {r.appointment_type}
            </p>
            {r.note && <p>{r.note}</p>}
          </div>
          <Badge status={r.status} />
        </article>
      ))}
    </div>
  ) : (
    <Empty>Bu görünümde randevu yok.</Empty>
  );
}
