import Link from "next/link";
import { paginate } from "@/lib/portal/workflow";
import { Pagination } from "@/components/portal/pagination";
import { requireRole } from "@/lib/portal/auth";
import { checked } from "@/lib/portal/queries";
import type { Client } from "@/lib/portal/types";
import { PageTitle, Badge, Empty, DateText } from "@/components/portal/display";
export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const { client } = await requireRole("admin"),
    params = await searchParams;
  const all = checked(
    await client
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false }),
  ) as Client[];
  const q = (params.q ?? "").trim().toLocaleLowerCase("tr-TR");
  const filtered = all.filter(
    (c) =>
      (!params.status || c.status === params.status) &&
      (!q ||
        (c.first_name + " " + c.last_name + " " + c.email + " " + c.phone)
          .toLocaleLowerCase("tr-TR")
          .includes(q)),
  );
  const { rows, page, pages, total } = paginate(filtered, params.page);
  return (
    <>
      <PageTitle
        eyebrow="DANIŞAN YÖNETİMİ"
        title="Her danışan, kendine özel."
        description="Bilgileri, ölçümleri ve haftalık planları birlikte yönetin."
        action={
          <Link className="portal-button" href="/admin/danisanlar/yeni">
            + Yeni danışan
          </Link>
        }
      />
      <form className="portal-search">
        <label className="sr-only" htmlFor="client-search">
          Danışan ara
        </label>
        <input
          id="client-search"
          name="q"
          defaultValue={params.q}
          placeholder="Ad, e-posta veya telefonla ara"
        />
        <label className="sr-only" htmlFor="client-status">
          Durum
        </label>
        <select
          id="client-status"
          name="status"
          defaultValue={params.status ?? ""}
        >
          <option value="">Tüm durumlar</option>
          <option value="active">Aktif</option>
          <option value="passive">Pasif</option>
        </select>
        <button className="portal-button">Filtrele</button>
        {(params.q || params.status) && (
          <Link className="portal-link" href="/admin/danisanlar">
            Filtreleri temizle
          </Link>
        )}
      </form>
      {rows.length ? (
        <div className="portal-table-wrap">
          <table>
            <caption>{total} danışan</caption>
            <thead>
              <tr>
                <th>Danışan</th>
                <th>İletişim</th>
                <th>Başlangıç</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>
                      {c.first_name} {c.last_name}
                    </strong>
                  </td>
                  <td>
                    {c.email}
                    <br />
                    {c.phone}
                  </td>
                  <td>
                    <DateText date={c.start_date} />
                  </td>
                  <td>
                    <Badge status={c.status} />
                  </td>
                  <td>
                    <Link
                      className="portal-link"
                      href={"/admin/danisanlar/" + c.id}
                    >
                      Dosyayı aç →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty>Aramanıza uygun danışan bulunamadı.</Empty>
      )}
      <Pagination page={page} pages={pages} total={total} params={params} />
    </>
  );
}
