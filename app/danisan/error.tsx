"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="portal-empty" role="alert">
      <h1>Bilgiler yüklenemedi.</h1>
      <p>Bağlantıyı ve Supabase kurulumunu kontrol ederek yeniden deneyin.</p>
      <button onClick={reset} className="portal-button">
        Yeniden dene
      </button>
    </div>
  );
}
