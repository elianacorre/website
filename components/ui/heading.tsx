import { tv, VariantProps } from "tailwind-variants";

// STYLES  *********************************************************************************************************************************
const HEADING = tv({
  slots: {
    BASE: `mb-8 flex flex-col items-start text-6xl font-extrabold`,
    HIGHLIGHTED: `relative z-10 text-white`,
    POINTER: ``,
    RECTANGLE: ``,
  },
  variants: {
    intent: {
      primary: {
        POINTER: "text-primary",
        RECTANGLE: "bg-primary border-primary -rotate-2 translate-y-1 rounded-2xl",
      },
      secondary: {
        POINTER: "text-secondary",
        RECTANGLE: "bg-secondary border-secondary -rotate-2 translate-y-1 rounded-2xl",
      },
    },
  },
});

// HEADING *********************************************************************************************************************************
export function Heading({ className, highlighted, text, intent }: HeadingProps) {
  const { BASE, HIGHLIGHTED, POINTER, RECTANGLE } = HEADING({ intent });
  return (
    <h2 className={BASE({ className })}>
      <span>{text}</span>
      {/* <PointerHighlight rectangleClassName={RECTANGLE()} pointerClassName={POINTER()}>
        <span className={HIGHLIGHTED()}>{highlighted}</span>
      </PointerHighlight> */}
    </h2>
  );
}

// TYPES ***********************************************************************************************************************************
export type HeadingProps = VariantProps<typeof HEADING> & { className?: string; highlighted: string; text: string };
