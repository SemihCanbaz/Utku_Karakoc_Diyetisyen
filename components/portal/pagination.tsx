import Link from "next/link";
export function Pagination({
  page,
  pages,
  total,
  params,
}: {
  page: number;
  pages: number;
  total: number;
  params: Record<string, string | undefined>;
}) {
  const href = (value: number) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && key !== "page") query.set(key, value);
    });
    query.set("page", String(value));
    return "?" + query.toString();
  };
  return (
    <nav className="portal-pagination" aria-label="Sonuç sayfaları">
      <span>
        {total} sonuç · Sayfa {page} / {pages}
      </span>
      <div>
        {page > 1 && (
          <Link
            href={href(page - 1)}
            className="portal-button portal-button-secondary"
          >
            ← Önceki
          </Link>
        )}
        {page < pages && (
          <Link
            href={href(page + 1)}
            className="portal-button portal-button-secondary"
          >
            Sonraki →
          </Link>
        )}
      </div>
    </nav>
  );
}
