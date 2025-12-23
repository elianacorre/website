import { Link, type LinkProps } from "@tanstack/react-router";
import { cva } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const BTN = {
  base: cva(
    "group/button relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background px-6 py-2 text-center font-semibold",
    {
      variants: {
        intent: {
          primary: "hover:border-primary",
          secondary: "hover:border-secondary",
        },
      },
      defaultVariants: {
        intent: "primary",
      },
    }
  ),
  circle: cva(
    `size-2 rounded-full transition-all duration-300 
    group-hover/button:scale-[100.8]`,
    {
      variants: {
        intent: {
          primary: "bg-primary",
          secondary: "bg-secondary",
        },
      },
      defaultVariants: {
        intent: "primary",
      },
    }
  ),
  container: cva(
    `inline-block transition-all duration-300 
    group-hover/button:opacity-0`,
    {
      variants: {
        reverse: {
          true: "group-hover/button:-translate-x-12",
          false: "group-hover/button:translate-x-12",
        },
      },
      defaultVariants: {
        reverse: false,
      },
    }
  ),
  hovered: cva(
    `absolute top-0 z-10 flex size-full items-center justify-center gap-2 opacity-0 transition-all duration-300
    group-hover/button:opacity-100`,
    {
      variants: {
        intent: {
          primary: "text-primary-foreground",
          secondary: "text-secondary-foreground",
        },
        reverse: {
          true: "translate-x-5 flex-row-reverse group-hover/button:-translate-x-8",
          false: "translate-x-12 flex-row group-hover/button:-translate-x-5",
        },
      },
      defaultVariants: {
        intent: "primary",
        reverse: false,
      },
    }
  ),
  icon: cva("size-5"),
  unhovered: cva("flex items-center gap-2"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Btn(props: BtnProps) {
  const { children, className: C = {}, icon, intent, reverse, ...rest } = props;
  return (
    <button className={cn(BTN.base({ intent }), C.base)} {...rest}>
      <BtnContent className={C} icon={icon} intent={intent} reverse={reverse}>
        {children}
      </BtnContent>
    </button>
  );
}
type BtnProps = Omit<ComponentProps<"button">, "className"> & BtnStyles & { icon?: string };

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function BtnLink(props: BtnLinkProps) {
  const { children, className: C = {}, icon, intent, reverse, ...rest } = props;
  return (
    <Link className={cn(BTN.base({ intent }), C.base)} {...rest}>
      <BtnContent className={C} icon={icon} intent={intent} reverse={reverse}>
        {children}
      </BtnContent>
    </Link>
  );
}
type BtnLinkProps = PropsWithChildren<LinkProps & BtnStyles & { icon?: string }>;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
function BtnContent(props: BtnContentProps) {
  const { children, className: C = {}, icon = "icon-[lucide--chevron-right]", intent, reverse } = props;
  return (
    <>
      <div className={cn(BTN.unhovered(), C.unhovered)}>
        <div className={cn(BTN.circle({ intent }), C.circle)} />
        <span className={cn(BTN.container({ reverse }), C.container)}>{children}</span>
      </div>
      <div className={cn(BTN.hovered({ intent, reverse }), C.hovered)}>
        <span>{children}</span>
        <span className={cn(BTN.icon(), C.icon, icon)} />
      </div>
    </>
  );
}
type BtnContentProps = PropsWithChildren<BtnStyles & { icon?: string }>;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type BtnClass = Partial<Record<keyof typeof BTN, string>>;

type BtnVariants = {
  intent?: "primary" | "secondary";
  reverse?: boolean;
};

type BtnStyles = BtnVariants & { className?: BtnClass };
