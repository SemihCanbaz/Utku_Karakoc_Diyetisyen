"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Brand } from "@/components/shared/brand";
import { navigation } from "@/lib/site-config";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const dark = pathname === "/" && !scrolled;
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const height = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform =
          "scaleX(" + (height > 0 ? Math.min(1, scrollY / height) : 0) + ")";
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [pathname]);
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);
  useEffect(() => {
    const element = dialog.current;
    let previousOverflow = "";
    const restore = () => {
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus();
    };
    const onToggle = () => {
      if (element?.open) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
    };
    element?.addEventListener("close", restore);
    const observer = new MutationObserver(onToggle);
    if (element)
      observer.observe(element, {
        attributes: true,
        attributeFilter: ["open"],
      });
    const resize = () => {
      if (innerWidth >= 1100) element?.close();
    };
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      element?.removeEventListener("close", restore);
      window.removeEventListener("resize", resize);
      if (element?.open) document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <>
      <header
        className={
          "site-header " +
          (dark ? "header-dark " : "") +
          (scrolled ? "header-scrolled" : "")
        }
      >
        <div className="reading-progress" ref={progress} aria-hidden="true" />
        <div className="container header-inner">
          <Link href="/" aria-label="Utku Karakoç ana sayfa">
            <Brand light={dark} />
          </Link>
          <nav className="desktop-nav" aria-label="Ana menü">
            {navigation.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  <span>{link.name}</span>
                  {active && (
                    <motion.span
                      className="nav-active"
                      layoutId="active-nav"
                      transition={{
                        duration: reduced ? 0 : 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <Link className="action action-small header-cta" href="/randevu">
            Randevu Oluştur <ArrowUpRight size={16} />
          </Link>
          <button
            ref={trigger}
            type="button"
            className="menu-toggle"
            aria-label="Menüyü aç"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            onClick={() => dialog.current?.showModal()}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="menu-title"
      >
        <div className="mobile-menu-top">
          <Brand />
          <button
            type="button"
            className="icon-button"
            aria-label="Menüyü kapat"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <p className="eyebrow" id="menu-title">
          SİZE İYİ GELEN BİR BAŞLANGIÇ
        </p>
        <nav aria-label="Mobil menü">
          {navigation.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => dialog.current?.close()}
            >
              <small>0{i + 1}</small>
              {link.name}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
        <Link
          href="/randevu"
          className="action"
          onClick={() => dialog.current?.close()}
        >
          Görüşme Planla <ArrowUpRight size={18} />
        </Link>
        <p className="menu-footnote">Beslenme · Denge · Günlük yaşam</p>
      </dialog>
    </>
  );
}
