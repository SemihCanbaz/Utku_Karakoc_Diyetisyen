"use client";
import { useEffect, useRef } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function AnimatedSection({
  children,
  className,
  delay = 0,
  type = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "fade-up" | "fade-in" | "scale-up";
}) {
  const [scope, animate] = useAnimate();
  const visible = useInView(scope, { once: true, margin: "0px 0px -35px 0px" });
  const reduced = useReducedMotion();
  const played = useRef(false);
  useEffect(() => {
    if (!visible || reduced || played.current) return;
    played.current = true;
    const animation = animate(
      scope.current,
      {
        opacity: [0.25, 1],
        y: type === "fade-up" ? [24, 0] : [0, 0],
        scale: type === "scale-up" ? [0.985, 1] : [1, 1],
      },
      {
        duration: 0.65,
        delay: Math.min(delay, 0.24),
        ease: [0.22, 1, 0.36, 1],
      },
    );
    return () => animation.complete();
  }, [visible, reduced, animate, scope, type, delay]);
  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
