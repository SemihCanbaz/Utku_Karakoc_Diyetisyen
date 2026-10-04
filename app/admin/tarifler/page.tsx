import Link from "next/link";
import { paginate } from "@/lib/portal/workflow";
import { Pagination } from "@/components/portal/pagination";
import Image from "next/image";
import { requireRole } from "@/lib/portal/auth";
import { checked } from "@/lib/portal/queries";
import { PageTitle, Badge, Empty } from "@/components/portal/display";
export default async function Recipes({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const { client } = await requireRole("admin"),
    params = await searchParams;
  const all = checked(
    await client
      .from("recipes")
      .select("id,title,slug,cover_image,status,category")
      .is("deleted_at", null)
      .order("updated_at", { ascending: false }),
  );
  const filtered = all.filter(
    (r) =>
      (!params.status || r.status === params.status) &&
      (!params.q ||
        r.title
          .toLocaleLowerCase("tr-TR")
          .includes(params.q.toLocaleLowerCase("tr-TR"))),
  );
  const { rows, page, pages, total } = paginate(filtered, params.page);
  return (
    <>
      <PageTitle
        eyebrow="İÇERİK YÖNETİMİ"
        title="Mutfağınızdan, herkese."
        description="Tariflerinizi hazırlayın, fotoğraflarını ekleyin ve yayına alın."
        action={
          <Link href="/admin/tarifler/yeni" className="portal-button">
            + Yeni tarif
          </Link>
        }
      />
      {process.env.RECIPES_SOURCE !== "supabase" && (
        <p className="portal-notice">
          Web sitesi şu anda dosyalardaki tarifleri gösteriyor. Başlangıç
          aktarımı tamamlandığında RECIPES_SOURCE=supabase ayarıyla paneldeki
          yayınları etkinleştirin.
        </p>
      )}
      <form className="portal-search">
        <label className="sr-only" htmlFor="recipe-search">
          Tarif ara
        </label>
        <input
          id="recipe-search"
          name="q"
          defaultValue={params.q}
          placeholder="Tarif adıyla ara"
        />
        <label className="sr-only" htmlFor="recipe-status">
          Yayın durumu
        </label>
        <select
          id="recipe-status"
          name="status"
          defaultValue={params.status ?? ""}
        >
          <option value="">Tüm durumlar</option>
          <option value="published">Yayında</option>
          <option value="draft">Taslak</option>
          <option value="archived">Arşiv</option>
        </select>
        <button className="portal-button">Filtrele</button>
        {(params.q || params.status) && (
          <Link className="portal-link" href="/admin/tarifler">
            Filtreleri temizle
          </Link>
        )}
      </form>
      {rows.length ? (
        <div className="portal-table-wrap">
          <table>
            <caption>{total} tarif</caption>
            <thead>
              <tr>
                <th>Tarif</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="portal-recipe-title">
                      {r.cover_image && (
                        <Image
                          src={r.cover_image}
                          alt=""
                          width={56}
                          height={56}
                        />
                      )}
                      <strong>{r.title}</strong>
                    </div>
                  </td>
                  <td>{r.category}</td>
                  <td>
                    <Badge status={r.status} />
                  </td>
                  <td>
                    <Link
                      className="portal-link"
                      href={"/admin/tarifler/" + r.id}
                    >
                      Düzenle →
                    </Link>
                    {r.status === "published" && (
                      <>
                        <br />
                        <Link
                          className="portal-subtle-link"
                          href={"/tarifler/" + r.slug}
                        >
                          Sitede gör
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty>
          Bu görünümde tarif yok. Yeni tarif ekleyebilir veya başlangıç
          aktarımını çalıştırabilirsiniz.
        </Empty>
      )}
      <Pagination page={page} pages={pages} total={total} params={params} />
    </>
  );
}
