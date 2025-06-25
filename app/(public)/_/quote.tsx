import { GridBackground } from "@/components/ui/grid-background";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const QUOTE = tv({
  slots: {
    AUTHOR: `text-lg font-black text-neutral-500
    sm:text-xl
    md:text-2xl
    2xl:text-3xl`,
    BASE: `relative px-4 py-8
    sm:px-8
    md:py-20`,
    CONTENT: `relative flex flex-col items-center gap-4
    sm:gap-8`,
    SENTENCE: `font-heading font-black text-3xl text-center
    sm:text-5xl
    md:text-6xl
    2xl:text-7xl`,
  },
});

// ROOT ************************************************************************************************************************************
export function Quote({ className }: QuoteProps) {
  const { BASE, CONTENT, SENTENCE, AUTHOR } = QUOTE();
  return (
    <section className={BASE({ className })}>
      <GridBackground />
      <div className={CONTENT()}>
        <h3 className={SENTENCE()}>" Don’t die with your song still inside you"</h3>
        <h4 className={AUTHOR()}>Wayne Dyer</h4>
      </div>
    </section>
  );
}

// TYPE ************************************************************************************************************************************
export type QuoteProps = { className?: string };
