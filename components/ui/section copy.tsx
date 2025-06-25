import type { Image } from "@/content";
import Img from "next/image";
import { ComponentProps, PropsWithChildren } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { SectionTitleEffect } from "./section.title-effect";

// STYLES **********************************************************************************************************************************
const SECTION = tv({
  slots: {
    ASIDE: `relative aspect-square max-w-full rounded-2xl border bg-white p-3 shadow-2xl 
    md:p-4 
    lg:max-w-md lg:transition-transform
    xl:max-w-xl
    2xl:max-w-2xl`,
    BASE: ``,
    CONTAINER: `flex flex-col px-4 py-8 gap-8 items-center container mx-auto
    sm:px-8
    lg:flex-row lg:items-start`,
    CONTENT: `flex flex-col gap-8 font-light text-balance text-center
    sm:text-lg
    lg:text-start
    2xl:text-xl`,
    IMG: `size-full object-cover`,
    MAIN: `flex flex-col items-center gap-8
    lg:items-start`,
    TITLE: `flex flex-col items-center text-4xl font-extrabold
    sm:text-6xl
    lg:items-start
    2xl:text-7xl`,
  },
  variants: {
    intent: {
      default: {},
      primary: {
        BASE: "bg-primary/40",
      },
      secondary: {
        BASE: "bg-accent",
      },
    },
    reverse: {
      true: {
        ASIDE: `lg:-rotate-6 lg:-translate-8 lg:hover:-rotate-8`,
        CONTAINER: `lg:flex-row-reverse`,
      },
      false: {
        ASIDE: `lg:rotate-6 lg:translate-x-8 lg:-translate-y-8 lg:hover:rotate-8`,
      },
    },
  },
});

// ROOT ************************************************************************************************************************************
export function Section({ children, className: C = {}, image, intent = "default", reverse = false, title }: SectionProps) {
  const { ASIDE, BASE, CONTAINER, CONTENT, IMG, MAIN, TITLE } = SECTION();

  return (
    <section className={BASE({ intent, className: C.BASE })}>
      <div className={CONTAINER({ reverse, className: C.CONTAINER })}>
        <main className={MAIN({ className: C.MAIN })}>
          <h2 className={TITLE({ className: C.TITLE })}>
            <span>{title[0]}</span>
            <SectionTitleEffect intent={intent === "secondary" ? "secondary" : "primary"} text={title[1]} />
          </h2>
          <div className={CONTENT({ className: C.CONTENT })}>{children}</div>
        </main>
        {image && (
          <aside className={ASIDE({ reverse, className: C.ASIDE })}>
            <Img {...image} className={IMG({ className: C.IMG })} />
          </aside>
        )}
      </div>
    </section>
  );
}

// TYPES ***********************************************************************************************************************************
type SectionProps = Omit<ComponentProps<"section">, "className" | "title"> &
  PropsWithChildren<SectionStyles & { image?: Image; title: string[] }>;
type SectionStyles = VariantProps<typeof SECTION> & { className?: Partial<(typeof SECTION)["slots"]> };
