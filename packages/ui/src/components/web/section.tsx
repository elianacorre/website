import type { ComponentProps, PropsWithChildren } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { SectionTitleEffect, type SectionTitleEffectClassName, type SectionTitleEffectProps } from "./section.title-effect";

// STYLES **********************************************************************************************************************************
export const SECTION_CONTENT = tv({
	base: `flex flex-col gap-8 font-light text-balance text-center sm:text-lg lg:text-start 2xl:text-xl`,
});

export const SECTION_MAIN = tv({
	base: `flex flex-col items-center gap-8 lg:items-start`,
	variants: {
		intent: {
			primary: `bg-primary/40`,
			secondary: `bg-accent`,
		},
	},
});

// ROOT ************************************************************************************************************************************
export const SECTION = tv({
	slots: {
		BASE: ``,
		CONTAINER: `flex flex-col px-4 py-8 gap-8 items-center container mx-auto sm:px-8 lg:flex-row lg:items-start`,
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
	},
});

export function Section({ children, className: C = {}, intent = "default", ...props }: SectionProps) {
	const { BASE, CONTAINER } = SECTION();

	return (
		<section {...props} className={BASE({ intent, className: C.BASE })}>
			<div className={CONTAINER({ className: C.CONTAINER })}>{children}</div>
		</section>
	);
}

type SectionProps = Omit<ComponentProps<"section">, "className"> & SectionStyles;
type SectionStyles = VariantProps<typeof SECTION> & { className?: Partial<(typeof SECTION)["slots"]> };

// IMAGE ***********************************************************************************************************************************
export const SECTION_IMAGE = tv({
	slots: {
		BASE: `relative hidden aspect-square max-w-full rounded-2xl border bg-white p-3 shadow-2xl md:p-4 lg:flex lg:max-w-md lg:transition-transform xl:max-w-xl 2xl:max-w-2xl`,
		IMG: `size-full object-cover`,
	},
	variants: {
		reverse: {
			true: {
				BASE: `lg:-rotate-6 lg:-translate-8 lg:hover:-rotate-8`,
			},
			false: {
				BASE: `lg:rotate-6 lg:translate-x-8 lg:-translate-y-8 lg:hover:rotate-8`,
			},
		},
	},
});

export function SectionImage({ children, className: C = {}, reverse = false }: SectionImageProps) {
	const { BASE, IMG } = SECTION_IMAGE();

	return <figure className={BASE({ reverse, className: C.BASE })}>{children}</figure>;
}

type SectionImageProps = PropsWithChildren<Omit<ComponentProps<"figure">, "className"> & SectionImageStyles>;
type SectionImageStyles = VariantProps<typeof SECTION_IMAGE> & { className?: Partial<(typeof SECTION_IMAGE)["slots"]> };

// TITLE ************************************************************************************************************************************
export const SECTION_TITLE = tv({
	base: `flex flex-col items-center text-4xl font-extrabold sm:text-6xl lg:items-start 2xl:text-7xl`,
});

export function SectionTitle({ className: C = {}, intent = "primary", title }: SectionTitleProps) {
	return (
		<h2 className={SECTION_TITLE({ className: C.BASE })}>
			<span>{title[0]}</span>
			<SectionTitleEffect intent={intent === "secondary" ? "secondary" : "primary"} text={title[1]!} className={C.EFFECT} />
		</h2>
	);
}

export type SectionTitleClassName = { BASE?: string; EFFECT?: SectionTitleEffectClassName };
export type SectionTitleProps = Omit<ComponentProps<"h2">, "title" | "className"> &
	SectionTitleStyles &
	Pick<SectionTitleEffectProps, "intent"> & { title: string[] };
export type SectionTitleStyles = { className?: SectionTitleClassName };
