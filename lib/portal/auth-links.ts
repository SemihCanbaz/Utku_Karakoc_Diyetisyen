export function legacyAuthTokens(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const type = params.get("type");
  if (type !== "invite" && type !== "recovery") return null;
  const access_token = params.get("access_token") || "";
  const refresh_token = params.get("refresh_token") || "";
  if (!access_token || access_token.length > 12000 || !refresh_token || refresh_token.length > 2000) return null;
  return { access_token, refresh_token };
}
