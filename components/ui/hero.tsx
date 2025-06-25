import type { Image } from "@/content";
import Img from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Button } from "./button";
import { HeroTitleEffect } from "./hero.title-effect";

// STYLES **********************************************************************************************************************************
export const HERO = tv({
  slots: {
    ASIDE: `relative hidden aspect-square max-w-full rounded-2xl border bg-white p-3 shadow-2xl 
    md:p-4 
    lg:flex lg:max-w-md lg:transition-transform lg:rotate-6 lg:hover:rotate-8
    xl:max-w-xl
    2xl:max-w-2xl`,
    BASE: `flex flex-col px-4 py-8 gap-8 items-center container mx-auto
    sm:px-8
    lg:flex-row lg:items-start
    xl:items-center`,
    CONTENT: `text-lg font-light text-balance text-center
    sm:text-xl
    lg:text-start
    2xl:text-2xl`,
    IMG: `size-full object-cover`,
    MAIN: `flex flex-col gap-8 items-center
    lg:items-start`,
    TITLE: `flex flex-col items-center text-[42px] leading-none font-black 
    sm:text-7xl
    lg:items-start
    2xl:text-8xl`,
  },
});

// ROOT ************************************************************************************************************************************
export function Hero({ button, children, className: C = {}, image, title }: HeroProps) {
  const { ASIDE, BASE, CONTENT, IMG, MAIN, TITLE } = HERO();

  return (
    <section className={BASE({ className: C.BASE })}>
      <main className={MAIN({ className: C.MAIN })}>
        <h1 className={TITLE({ className: C.TITLE })}>
          <span>{title[0]}</span>
          <HeroTitleEffect text={title[1]} className={{ BASE: "text-primary", CURSOR: "bg-primary h-10 sm:h-16" }} />
        </h1>
        <div className={CONTENT({ className: C.CONTENT })}>{children}</div>
        {button && (
          <Button>
            <Link href={button.to}>{button.text}</Link>
          </Button>
        )}
      </main>
      <aside className={ASIDE({ className: C.ASIDE })}>
        <Img {...image} className={IMG({ className: C.IMG })} />
      </aside>
    </section>
  );
}

// TYPE ************************************************************************************************************************************
export type HeroProps = Omit<ComponentProps<"section">, "className" | "title"> &
  HeroStyles & { button?: { text: string; to: string }; image: Image; title: string[] };

type HeroStyles = VariantProps<typeof HERO> & { className?: Partial<(typeof HERO)["slots"]> };
