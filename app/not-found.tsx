import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-top pb-24">
      <p className="eyebrow">404 · BURADA BİR SAYFA YOK</p>
      <h1>
        Yeni bir başlangıç
        <br />
        yapalım.
      </h1>
      <p className="intro">
        Aradığınız sayfa veya tarif bulunamadı. Tarif kütüphanesine göz atabilir
        ya da ana sayfaya dönebilirsiniz.
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <Link href="/" className="action">
          Ana sayfa
        </Link>
        <Link href="/tarifler" className="action action-outline">
          Tarifleri keşfet
        </Link>
      </div>
    </div>
  );
}
