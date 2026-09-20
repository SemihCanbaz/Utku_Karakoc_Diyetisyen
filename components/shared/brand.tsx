import Image from "next/image";
export function Brand({
  full = false,
  light = false,
}: {
  full?: boolean;
  light?: boolean;
}) {
  return full ? (
    <Image
      src="/brand/uk-logo.webp"
      alt="Utku Karakoç Diyetisyen"
      width={480}
      height={480}
      unoptimized
      sizes="240px"
      className="brand-full"
    />
  ) : (
    <span className={"brand-lockup" + (light ? " brand-light" : "")}>
      <Image
        src="/brand/uk-mark.webp"
        alt=""
        width={240}
        height={240}
        unoptimized
        sizes="64px"
      />
      <span>
        <strong>Utku Karakoç</strong>
        <small>DİYETİSYEN</small>
      </span>
    </span>
  );
}
