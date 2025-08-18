"use client";

import { motion, type Transition } from "motion/react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const HERO_TITLE_EFFECT = tv({
	slots: {
		BASE: `flex items-center gap-1 whitespace-nowrap`,
		CONTENT: `overflow-hidden w-0 leading-tight`,
		CURSOR: `opacity-0 w-1 h-10 rounded-sm bg-foreground`,
	},
});
const { BASE, CONTENT, CURSOR } = HERO_TITLE_EFFECT();

const T: Record<string, Transition> = {
	CONTENT: { duration: 2, ease: "linear", delay: 1 },
	CURSOR: { duration: 0.8, repeat: Infinity, repeatType: "reverse" },
};

// ROOT ************************************************************************************************************************************
export function HeroTitleEffect({ className: C = {}, text }: HeroTitleEffectProps) {
	return (
		<div className={BASE({ className: C.BASE })}>
			<motion.div className={CONTENT({ className: C.CONTENT })} whileInView={{ width: "fit-content" }} transition={T.CONTENT}>
				{text}
			</motion.div>
			<motion.div animate={{ opacity: 1 }} transition={T.CURSOR} className={CURSOR({ className: C.CURSOR })} />
		</div>
	);
}

// TYPES ***********************************************************************************************************************************
type HeroTitleEffectProps = { className?: Partial<(typeof HERO_TITLE_EFFECT)["slots"]>; text: string };
