import assert from "node:assert/strict";
const base = process.env.CHECK_SITE_URL || "http://127.0.0.1:3001";
for (const route of [
  "/admin",
  "/admin/danisanlar",
  "/admin/danisanlar/yeni",
  "/admin/randevular",
  "/admin/tarifler",
  "/admin/tarifler/yeni",
  "/danisan",
  "/danisan/gelisim",
  "/danisan/diyet-listelerim",
  "/danisan/randevularim",
]) {
  const response = await fetch(base + route, { redirect: "manual" });
  assert.ok(
    [307, 308].includes(response.status),
    route + " must redirect without login",
  );
  assert.equal(response.headers.get("location"), "/giris", route);
  assert.match(
    response.headers.get("cache-control") || "",
    /private|no-store/,
    route,
  );
}
const response = await fetch(base + "/giris");
const html = await response.text();
assert.equal(response.status, 200);
assert.match(html, /noindex/);
assert.match(html, /name="password"/);
assert.ok(
  !html.includes('href="/admin"'),
  "public login must not reveal admin navigation",
);
const bad = await fetch(base + "/auth/confirm?type=invite&token_hash=invalid", {
  redirect: "manual",
});
const target = new URL(bad.headers.get("location"), base);
const origin = new URL(base);
assert.equal(target.pathname + target.search, "/giris?error=link");
const loopback = new Set(["localhost", "127.0.0.1", "[::1]"]);
assert.ok(
  target.origin === origin.origin ||
    (loopback.has(target.hostname) &&
      loopback.has(origin.hostname) &&
      target.port === origin.port),
  "confirmation redirect must stay on this site",
);
console.log(
  "PASS: 10 protected routes redirect anonymous users, private caching, login noindex, invalid confirmation fails closed.",
);
