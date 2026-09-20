import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[140px] w-full bg-white border border-brand-gold/30 rounded-xl px-5 py-4 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all font-sans text-brand-dark placeholder:text-brand-muted/70 resize-none shadow-sm hover:border-brand-gold/60",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
export { Textarea };
