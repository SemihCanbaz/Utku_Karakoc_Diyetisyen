"use client";
import { Check, Printer, Link2 } from "lucide-react";
import { useState } from "react";
export function RecipeActions() {
  const [status, setStatus] = useState("");
  return (
    <div className="recipe-actions no-print">
      <button onClick={() => window.print()}>
        <Printer size={16} /> Yazdır / PDF
      </button>
      <button
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setStatus("Bağlantı kopyalandı.");
          } catch {
            setStatus(
              "Bağlantıyı tarayıcının adres çubuğundan kopyalayabilirsiniz.",
            );
          }
        }}
      >
        {status.startsWith("Bağlantı kopya") ? (
          <Check size={16} />
        ) : (
          <Link2 size={16} />
        )}{" "}
        Bağlantıyı kopyala
      </button>
      <span role="status">{status}</span>
    </div>
  );
}
