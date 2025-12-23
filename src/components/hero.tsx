import { Image } from "@unpic/react";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { Images } from "@/functions/images";
import { cn } from "@/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const HERO = {
  aside: cva(
    "relative hidden aspect-square w-full flex-none rounded-2xl border-12 border-white bg-neutral-200 shadow-2xl outline-1 outline-neutral-200 md:border-16 lg:-mr-20 lg:flex lg:w-md lg:rotate-6 lg:transition-transform lg:hover:rotate-8 xl:mr-0 xl:w-xl 2xl:w-2xl"
  ),
  base: cva(
    "container relative z-10 mx-auto flex flex-col items-center gap-8 px-4 py-8 sm:px-8 lg:flex-row lg:items-start xl:items-center"
  ),
  content: cva("text-balance text-center font-light text-lg sm:text-xl lg:text-start 2xl:text-2xl"),
  img: cva("size-full object-cover"),
  main: cva("flex flex-col items-center gap-8 lg:items-start"),
  title: cva("flex flex-col items-center font-black text-[42px] leading-none sm:text-7xl lg:items-start 2xl:text-8xl"),
  titleRow: cva("flex items-center gap-1 whitespace-nowrap text-primary"),
  titleRowContent: cva(`max-w-full overflow-hidden leading-tight transition-all delay-1000 duration-[2s] ease-linear
    starting:max-w-0`),
  titleRowCursor: cva("h-10 w-1 animate-blink rounded-sm bg-primary sm:h-16"),
};

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function Hero({ children, className: C = {}, image, title }: HeroProps) {
  const { height: _, ...r } = image;
  return (
    <section className={cn(HERO.base(), C.base)}>
      <main className={cn(HERO.main(), C.main)}>
        <h1 className={cn(HERO.title(), C.title)}>
          <span>{title[0]}</span>
          <div className={cn(HERO.titleRow(), C.titleRow)}>
            <div className={cn(HERO.titleRowContent(), C.titleRowContent)}>{title[1]}</div>
            <div className={cn(HERO.titleRowCursor(), C.titleRowCursor)} />
          </div>
        </h1>
        {children}
      </main>
      <aside className={cn(HERO.aside(), C.aside)}>
        <Image
          {...r}
          aspectRatio={1}
          breakpoints={[406, 576, 724, 812, 1152, 1340, 1448, 1624]}
          className={cn(HERO.img())}
          operations={{ imagekit: { f: "avif" } }}
          priority={true}
          sizes="(min-width: 1536px) 724px, (min-width: 1280px) 612px, (min-width: 1024px) 406px, (min-width: 768px) 670px, (min-width: 640px) 576px, 100vw"
        />
      </aside>
    </section>
  );
}
type HeroProps = Omit<ComponentProps<"section">, "className" | "title"> & HeroStyles & { image: Images["Entity"]; title: string[] };

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function HeroContent({ children, className }: HeroContentProps) {
  return <div className={cn(HERO.content(), className)}>{children}</div>;
}
type HeroContentProps = ComponentProps<"div">;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type HeroClass = Partial<Record<keyof typeof HERO, string>>;
type HeroStyles = { className?: HeroClass };
