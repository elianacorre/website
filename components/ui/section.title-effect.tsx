"use client";

import { motion, Transition } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { tv, VariantProps } from "tailwind-variants";

// TYPES ***********************************************************************************************************************************
export const SECTION_TITLE_EFFECT = tv({
  slots: {
    BASE: `relative w-fit`,
    EFFECT: `pointer-events-none absolute inset-0 z-0`,
    POINTER: `size-5`,
    POINTER_WRAPPER: `opacity-0 pointer-events-none absolute`,
    RECTANGLE: `absolute inset-0 size-0 -rotate-2 translate-y-1 rounded-2xl`,
    TEXT: `relative z-10 text-white`,
  },
  variants: {
    intent: {
      primary: { POINTER: `text-primary`, RECTANGLE: `bg-primary` },
      secondary: { POINTER: `text-secondary`, RECTANGLE: `bg-secondary` },
    },
  },
  defaultVariants: { intent: "primary" },
});

const T: Record<string, Transition> = {
  EFFECT: { duration: 0.5, ease: "easeOut" },
  RECTANGLE: { duration: 1, ease: "easeInOut" },
  POINTER_WRAPPER: { opacity: { duration: 0.1, ease: "easeInOut" }, duration: 1, ease: "easeInOut" },
};

// ROOT ************************************************************************************************************************************
export function SectionTitleEffect({ className: C = {}, intent, text }: SectionTitleEffectProps) {
  const { BASE, EFFECT, POINTER, POINTER_WRAPPER, RECTANGLE, TEXT } = SECTION_TITLE_EFFECT();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div className={BASE({ className: C.BASE })} ref={containerRef}>
      <span className={TEXT({ className: C.TEXT })}>{text}</span>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className={EFFECT({ className: C.EFFECT })}
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={T.EFFECT}
        >
          <motion.div className={RECTANGLE({ intent, className: C.RECTANGLE })} whileInView={dimensions} transition={T.RECTANGLE} />
          <motion.div
            className={POINTER_WRAPPER({ className: C.POINTER_WRAPPER })}
            whileInView={{ opacity: 1, x: dimensions.width + 4, y: dimensions.height + 4 }}
            style={{ rotate: -90 }}
            transition={T.POINTER_WRAPPER}
          >
            <Pointer className={POINTER({ intent, className: C.POINTER })} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// POINTER *********************************************************************************************************************************
const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    // className="stroke-current fill-current stroke-1 size-4"
    {...props}
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
  </svg>
);

// POINTER *********************************************************************************************************************************
export type SectionTitleEffectClassName = Partial<(typeof SECTION_TITLE_EFFECT)["slots"]>;
export type SectionTitleEffectProps = SectionTitleEffectStyles & { text: string };
export type SectionTitleEffectStyles = VariantProps<typeof SECTION_TITLE_EFFECT> & { className?: SectionTitleEffectClassName };
