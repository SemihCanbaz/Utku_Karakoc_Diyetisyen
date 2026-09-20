import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const base = process.env.CHECK_SITE_URL || "http://localhost:3000";
const manifest = JSON.parse(
  readFileSync(".next/prerender-manifest.json", "utf8"),
);
const routes = Object.keys(manifest.routes).filter(
  (p) => !p.startsWith("/_") && !/\.(xml|txt|webp|ico)$/.test(p),
);
const internal = new Set(),
  images = new Set();
let schemas = 0;
for (const path of routes) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, path);
  const html = await res.text();
  if (!res.headers.get("content-type")?.includes("text/html")) continue;
  assert.equal((html.match(/<h1(?: |>)/g) || []).length, 1, path + " H1");
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    path + " description",
  );
  assert.match(html, /<link rel="canonical" href="[^"]+"/, path + " canonical");
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    const schema = JSON.parse(match[1]);
    assert.ok(schema["@context"]);
    schemas++;
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replace(/&amp;/g, "&");
    assert.notEqual(href, "#", path + " empty link");
    if (href.startsWith("/") && !href.startsWith("/_next"))
      internal.add(href.split("#")[0]);
  }
  for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const src = match[1].replace(/&amp;/g, "&");
    images.add(src);
  }
  assert.ok(
    !/<a[^>]*>\s*<button/.test(html),
    path + " nested interactive content",
  );
  assert.ok(
    !/905551234567|Premium Plaza|7\/24 Limitsiz|hekim eşliğinde|hayal ettiğiniz bedene/.test(
      html,
    ),
    path + " fabricated content",
  );
}
for (const path of internal)
  assert.equal((await fetch(base + path)).status, 200, "link " + path);
for (const src of images) {
  const url = new URL(src, base),
    original = url.pathname.startsWith("/_next/image")
      ? url.searchParams.get("url")
      : url.pathname;
  if (original?.startsWith("/"))
    assert.ok(existsSync("public" + decodeURIComponent(original)), original);
  assert.equal((await fetch(url)).status, 200, "image " + src);
}
assert.equal((await fetch(base + "/tarifler/bulunmayan-tarif")).status, 404);
assert.equal((await fetch(base + "/olmayan-sayfa")).status, 404);
assert.equal((await fetch(base + "/beslenme-rehberi/bulunmayan-rehber")).status, 404);
assert.equal((await fetch(base + "/makaleler/bulunmayan-makale")).status, 404);
assert.equal((await fetch(base + "/danismanlik/bulunmayan-hizmet")).status, 404);
assert.equal((await fetch(base + "/hesaplayicilar/bulunmayan-arac")).status, 404);
for (const [from, to] of [
  ["/online-diyet", "/vip-diyet"],
  ["/recipes/kremali-ispanakli-somon", "/tarifler/kremali-ispanakli-somon"],
  ["/contact", "/iletisim"],
]) {
  const res = await fetch(base + from, { redirect: "manual" });
  assert.equal(res.status, 308);
  assert.equal(res.headers.get("location"), to);
}
const optimized = await fetch(
  base + "/_next/image?url=%2Fimages%2Fhome-hero.webp&w=1080&q=75",
);
assert.equal(optimized.status, 200);
console.log(
  JSON.stringify(
    {
      pages: routes.length,
      internalLinks: internal.size,
      images: images.size,
      schemas,
      notFound: 404,
      optimizedImage: 200,
      result: "PASS",
    },
    null,
    2,
  ),
);
