import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-white border border-brand-gold/30 rounded-xl px-5 py-4 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all font-sans text-brand-dark placeholder:text-brand-muted/70 shadow-sm hover:border-brand-gold/60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
export { Input };
