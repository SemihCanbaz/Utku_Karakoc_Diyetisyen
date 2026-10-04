"use client";
export function PrintButton() {
  return (
    <button
      className="portal-button portal-button-secondary portal-print-button"
      onClick={() => window.print()}
    >
      Yazdır / PDF olarak kaydet
    </button>
  );
}
