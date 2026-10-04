export default function Loading() {
  return (
    <div
      className="portal-loading"
      role="status"
      aria-label="Çalışma alanı yükleniyor"
    >
      <span className="sr-only">Çalışma alanınız hazırlanıyor…</span>
      <div className="portal-skeleton portal-skeleton-title" />
      <div className="portal-skeleton-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="portal-skeleton" />
        ))}
      </div>
      <div className="portal-skeleton portal-skeleton-body" />
    </div>
  );
}
