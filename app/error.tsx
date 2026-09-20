"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container page-top pb-24">
      <p className="eyebrow">KISA BİR AKSAKLIK</p>
      <h1>Sayfa yüklenemedi.</h1>
      <p className="intro">
        Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.
      </p>
      <div className="flex gap-4 mt-8">
        <button className="action" onClick={reset}>
          Tekrar dene
        </button>
        <Link className="action action-outline" href="/">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
