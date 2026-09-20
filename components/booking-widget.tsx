"use client";
import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
export function BookingWidget({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="panel booking-widget">
      <CalendarDays />
      <h2>Size uygun zamanı seçin.</h2>
      <p>
        Takvimi açtığınızda randevu sağlayıcısına bağlanılır; sağlayıcının
        gizlilik koşulları geçerlidir.
      </p>
      {loaded ? (
        <iframe
          src={url}
          title="Görüşme randevu takvimi"
          referrerPolicy="no-referrer"
          className="booking-frame"
        />
      ) : (
        <button className="action" onClick={() => setLoaded(true)}>
          Randevu Takvimini Aç
        </button>
      )}
      <a className="text-link" href={url} target="_blank" rel="noreferrer">
        Takvimi ayrı sayfada aç <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
