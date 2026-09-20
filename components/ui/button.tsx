import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "luxury" | "white";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-bold tracking-wide transition-all focus-visible:outline-none disabled:opacity-50 active:scale-95",
          {
            "bg-brand-green text-white hover:bg-brand-dark shadow-luxury":
              variant === "default",
            "bg-brand-gold text-white hover:bg-[#A38A62] shadow-glow":
              variant === "luxury",
            "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white":
              variant === "outline",
            "hover:bg-brand-green/5 text-brand-green": variant === "ghost",
            "bg-white text-brand-green hover:bg-brand-light shadow-lg hover:shadow-xl":
              variant === "white",
            "h-12 px-8 text-sm": size === "default",
            "h-10 px-6 text-sm": size === "sm",
            "h-14 px-10 text-base": size === "lg",
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
export { Button };
