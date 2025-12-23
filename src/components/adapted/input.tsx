import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const INPUT = cva(`h-9 w-full min-w-0 rounded-md border border-input bg-white px-2.5 py-1 text-base shadow-xs outline-none 
  transition-[color,box-shadow] 
  placeholder:text-muted-foreground 
  focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
  aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive
  md:text-sm`);

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Input({ className, type, ...props }: InputProps) {
  return <InputPrimitive className={cn(INPUT(), className)} data-slot="input" type={type} {...props} />;
}
type InputProps = React.ComponentProps<"input">;
