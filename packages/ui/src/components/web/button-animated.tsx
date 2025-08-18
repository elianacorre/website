import { Slot } from "@radix-ui/react-slot";
import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const BUTTON_ANIMATED = tv({
	slots: {
		BASE: `group/button bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border text-center font-semibold px-6 py-2`,
		CIRCLE: `size-2 rounded-full transition-all duration-300 group-hover/button:scale-[100.8]`,
		CONTAINER: `inline-block transition-all duration-300 group-hover/button:opacity-0`,
		HOVERED: `absolute top-0 z-10 flex size-full items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover/button:opacity-100`,
		UNHOVERED: `flex items-center gap-2`,
	},
	variants: {
		intent: {
			primary: {
				BASE: `hover:border-primary`,
				CIRCLE: `bg-primary`,
				HOVERED: `text-primary-foreground`,
			},
			secondary: {
				BASE: `hover:border-secondary`,
				CIRCLE: `bg-secondary`,
				HOVERED: `text-secondary-foreground`,
			},
		},
		reverse: {
			true: {
				CONTAINER: `group-hover/button:-translate-x-12`,
				HOVERED: `flex-row-reverse translate-x-5 group-hover/button:-translate-x-8`,
			},
			false: {
				CONTAINER: `group-hover/button:translate-x-12`,
				HOVERED: `flex-row translate-x-12 group-hover/button:-translate-x-5`,
			},
		},
	},
	defaultVariants: { intent: "primary", reverse: false },
});

export const { BASE, CIRCLE, CONTAINER, HOVERED, UNHOVERED } = BUTTON_ANIMATED();

// ROOT ************************************************************************************************************************************
export function ButtonAnimated({
	asChild,
	children,
	className,
	icon = <ChevronRightIcon className="size-5" />,
	intent,
	reverse = false,
	...props
}: ButtonAnimatedProps) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp data-slot="button" className={BASE({ intent, className })} {...props}>
			<div className={UNHOVERED()}>
				<div className={CIRCLE({ intent })}></div>
				<span className={CONTAINER({ reverse })}>{children}</span>
			</div>
			<div className={HOVERED({ intent, reverse })}>
				<span>{children}</span>
				{icon}
			</div>
		</Comp>
	);
}

// TYPES ***********************************************************************************************************************************
export type ButtonAnimatedProps = ComponentProps<"button"> &
	VariantProps<typeof BUTTON_ANIMATED> & { asChild?: boolean; icon?: ReactNode; reverse?: boolean };
