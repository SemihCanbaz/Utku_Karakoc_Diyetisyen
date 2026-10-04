import Link from "next/link";
import Image from "next/image";
import {
  Users,
  UserPlus,
  CalendarDays,
  ChefHat,
  BookOpenCheck,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";
import { requireRole } from "@/lib/portal/auth";
import { checked, today } from "@/lib/portal/queries";
import { followUps, addDays } from "@/lib/portal/workflow";
import type { Appointment, Client } from "@/lib/portal/types";
import {
  PageTitle,
  Metric,
  AppointmentList,
  Empty,
  Badge,
} from "@/components/portal/display";
export default async function Dashboard() {
  const { client, profile } = await requireRole("admin"),
    now = today();
  const [c, r, a, plans, measurements] = await Promise.all([
    client
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false }),
    client
      .from("recipes")
      .select("id,title,status,updated_at,cover_image,image_alt")
      .is("deleted_at", null)
      .order("updated_at", { ascending: false }),
    client
      .from("appointments")
      .select("*")
      .gte("appointment_date", now)
      .eq("status", "scheduled")
      .order("appointment_date")
      .order("start_time"),
    client.from("diet_plans").select("client_id,status,start_date,end_date"),
    client.from("client_measurements").select("client_id,measurement_date"),
  ]);
  const clients = checked(c) as Client[],
    recipes = checked(r),
    appointments = checked(a) as Appointment[],
    names = Object.fromEntries(
      clients.map((c) => [c.id, c.first_name + " " + c.last_name]),
    );
  const tasks = followUps(clients, checked(plans), checked(measurements), now);
  return (
    <>
      <PageTitle
        eyebrow={new Date()
          .toLocaleDateString("tr-TR", {
            dateStyle: "full",
            timeZone: "Europe/Istanbul",
          })
          .toLocaleUpperCase("tr-TR")}
        title={"Merhaba, " + profile.first_name + "."}
        description="Danışanlarınız ve içerikleriniz için bugünün özeti."
      />
      <div className="portal-metrics">
        <Metric
          label="Aktif danışan"
          icon={<Users size={21} />}
          value={clients.filter((c) => c.status === "active").length}
        />
        <Metric
          label="Bu ay başlayan"
          icon={<UserPlus size={21} />}
          value={
            clients.filter((c) => c.start_date.startsWith(now.slice(0, 7)))
              .length
          }
        />
        <Metric
          label="Toplam tarif"
          value={recipes.length}
          icon={<ChefHat size={21} />}
        />
        <Metric
          label="Yayındaki tarif"
          icon={<BookOpenCheck size={21} />}
          value={recipes.filter((r) => r.status === "published").length}
        />
        <Metric
          label="Bugünkü görüşme"
          icon={<CalendarDays size={21} />}
          value={appointments.filter((a) => a.appointment_date === now).length}
        />
      </div>
      <div className="portal-quick-actions">
        <Link href="/admin/danisanlar/yeni">
          <UserPlus size={18} /> Danışan kaydı
        </Link>
        <Link href="/admin/randevular">
          <CalendarDays size={18} /> Randevu oluştur
        </Link>
        <Link href="/admin/tarifler/yeni">
          <ChefHat size={18} /> Tarif ekle
        </Link>
      </div>
      <section className="portal-week-strip" aria-label="Önümüzdeki yedi gün">
        {Array.from({ length: 7 }, (_, i) => {
          const day = addDays(now, i);
          const count = appointments.filter(
            (a) => a.appointment_date === day,
          ).length;
          return (
            <Link
              key={day}
              href={"/admin/randevular?date=" + day}
              className={i === 0 ? "is-today" : ""}
            >
              <span>
                {i === 0
                  ? "Bugün"
                  : new Date(day + "T12:00:00Z").toLocaleDateString("tr-TR", {
                      weekday: "short",
                    })}
              </span>
              <strong>{day.slice(8)}</strong>
              <small>{count ? count + " görüşme" : "Plan yok"}</small>
            </Link>
          );
        })}
      </section>
      {clients.length > 0 && (
        <section className="portal-card portal-followups">
          <div className="portal-section-heading">
            <div>
              <p className="portal-eyebrow">TAKİBİNİZDE</p>
              <h2>Bir sonraki adım</h2>
            </div>
            <span className="portal-count">{tasks.length}</span>
          </div>
          <p className="portal-muted">
            Aktif danışanların güncel planı ve son 14 gündeki ölçüm kaydı esas
            alınır.
          </p>
          {tasks.length ? (
            <ul>
              {tasks.slice(0, 8).map((task) => (
                <li key={task.id}>
                  <div>
                    <strong>{task.name}</strong>
                    <span>{task.label}</span>
                  </div>
                  <Link href={task.href} className="portal-link">
                    Dosyayı aç <ArrowUpRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="portal-success">
              Tüm aktif danışanların plan ve ölçüm kayıtları güncel.
            </p>
          )}
          {tasks.length > 8 && (
            <Link className="portal-link" href="/admin/danisanlar">
              Tüm danışanları incele →
            </Link>
          )}
        </section>
      )}
      {!clients.length && (
        <section className="portal-onboarding">
          <div>
            <span className="portal-onboarding-symbol">
              <ClipboardList size={30} />
            </span>
            <p className="portal-eyebrow">İLK DANIŞANINIZLA BAŞLAYIN</p>
            <h2>Bir dosya, düzenli bir takip.</h2>
            <p>
              Danışan kaydını açın; ölçümleri, haftalık planları ve görüşmeleri
              aynı dosyada yönetin.
            </p>
            <Link className="portal-button" href="/admin/danisanlar/yeni">
              İlk danışanı ekle <ArrowUpRight size={18} />
            </Link>
          </div>
          <ol>
            <li>
              <strong>01</strong>
              <span>
                <b>Danışan kaydını oluşturun</b>İletişim, hedef ve başlangıç
                bilgilerini ekleyin.
              </span>
            </li>
            <li>
              <strong>02</strong>
              <span>
                <b>Kişisel planını hazırlayın</b>Öğünleri düzenleyin, hazır
                olduğunda paylaşın.
              </span>
            </li>
            <li>
              <strong>03</strong>
              <span>
                <b>Gelişimini takip edin</b>Ölçümleri kaydedin ve sonraki
                görüşmeyi planlayın.
              </span>
            </li>
          </ol>
        </section>
      )}
      <div className="portal-columns">
        <section className="portal-card">
          <h2>Yaklaşan görüşmeler</h2>
          <AppointmentList rows={appointments.slice(0, 5)} names={names} />
          <Link className="portal-link" href="/admin/randevular">
            Takvime git →
          </Link>
        </section>
        <section className="portal-card">
          <h2>Son eklenen danışanlar</h2>
          {clients.length ? (
            <ul className="portal-simple-list">
              {clients.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link href={"/admin/danisanlar/" + c.id}>
                    {c.first_name} {c.last_name}
                  </Link>
                  <Badge status={c.status} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty>İlk danışanınızı ekleyerek başlayın.</Empty>
          )}
          <h2>Son güncellenen tarifler</h2>
          {recipes.length ? (
            <ul className="portal-simple-list">
              {recipes.slice(0, 5).map((r) => (
                <li key={r.id}>
                  <Link
                    className="portal-recipe-title"
                    href={"/admin/tarifler/" + r.id}
                  >
                    {r.cover_image && (
                      <Image
                        src={r.cover_image}
                        alt={r.image_alt || r.title}
                        width={48}
                        height={48}
                      />
                    )}
                    <span>{r.title}</span>
                  </Link>
                  <Badge status={r.status} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty>
              İlk tarifinizi ekleyerek mutfak kütüphanenizi oluşturun.
            </Empty>
          )}
        </section>
      </div>
    </>
  );
}
