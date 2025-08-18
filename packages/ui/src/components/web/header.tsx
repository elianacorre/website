"use client";

import { publicStore, setHeaderHoveredId, setIsScrolled } from "@ec/ui/lib/stores";
import { useStore } from "@tanstack/react-store";
import { motion, type Transition, useMotionValueEvent, useScroll } from "motion/react";
import { type PropsWithChildren, type ReactNode, useCallback } from "react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const t: Transition = { type: "spring", stiffness: 200, damping: 50 };

const HEADER = tv({
	slots: {
		BASE: `fixed inset-x-0 top-0 z-50`,
		BURGER: `sm:hidden relative p-2`,
		CONTENT: `w-full mx-auto flex relative items-center justify-between rounded-full px-4 py-2 bg-[rgba(255,255,255,0)] xl:container`,
		ICONS: `flex`,
		LOGO: `relative h-10 w-16`,
		LOGO_CONTENT: `absolute -top-3 -left-3 w-20 sm:w-24 md:w-40`,
		NAV: `relative px-4 py-2`,
		NAVS: `hidden items-center justify-center gap-2 font-bold text-black sm:flex`,
		SOCIAL: `relative p-2`,
		SOCIALS: `flex items-center`,
		STAIN: `absolute inset-0 size-full rounded-full`,
		STAIN_CONTENT: `relative z-10`,
	},
	variants: {
		isScrolled: {
			true: {
				BASE: `inset-x-4 top-5 md:inset-x-20`,
				LOGO_CONTENT: `w-16 sm:w-16 md:w-16`,
			},
		},
		intent: {
			primary: { STAIN: `bg-primary/40` },
			secondary: { STAIN: `bg-accent` },
		},
	},
	defaultVariants: { intent: "secondary" },
});

const contentVariants = {
	scrolled: {
		backgroundColor: "rgba(255,255,255,1)",
		boxShadow:
			"0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
	},
};

const { BASE, BURGER, CONTENT, ICONS, LOGO, LOGO_CONTENT, NAV, NAVS, SOCIAL, SOCIALS, STAIN, STAIN_CONTENT } = HEADER();

// ROOT ************************************************************************************************************************************
export function Header({ logo, navs, socials }: HeaderProps) {
	const { scrollY } = useScroll();
	const isScrolled = useStore(publicStore, ({ isScrolled }) => isScrolled);

	useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 1));

	const handleOnMouseLeave = useCallback(() => setHeaderHoveredId(), []);

	return (
		<motion.header layoutRoot transition={t} className={BASE({ isScrolled })}>
			<motion.div
				layout
				transition={t}
				className={CONTENT()}
				onMouseLeave={handleOnMouseLeave}
				variants={contentVariants}
				animate={isScrolled ? "scrolled" : "top"}
			>
				{logo}
				<div className={NAVS()}>{navs}</div>
				<div className={ICONS()}>
					<div className={SOCIALS()}>{socials}</div>
					{/* <Sheet>
						<SheetTrigger
							onMouseEnter={() => setHeaderHoveredId("menu")}
							onClick={() => setHeaderHoveredId(undefined)}
							className={BURGER()}
						>
							{headerHoveredId === "menu" && <motion.div layoutId="hovered" className={STAIN({ intent: "primary" })} />}
							<MenuIcon className={STAIN_CONTENT()} />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Are you absolutely sure?</SheetTitle>
								<SheetDescription>
									This action cannot be undone. This will permanently delete your account and remove your data from our servers.
								</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet> */}
				</div>
			</motion.div>
		</motion.header>
	);
}
export type HeaderProps = { logo: ReactNode; navs: ReactNode; socials: ReactNode };

// LOGO ************************************************************************************************************************************
export function HeaderLogo({ children }: HeaderLogoProps) {
	const isScrolled = useStore(publicStore, ({ isScrolled }) => isScrolled);

	return (
		<button type="button" className={LOGO()}>
			<motion.div layout transition={t} className={LOGO_CONTENT({ isScrolled })}>
				{children}
			</motion.div>
		</button>
	);
}
export type HeaderLogoProps = PropsWithChildren;

// NAV *************************************************************************************************************************************
export function HeaderNav({ isActive, nav }: HeaderNavProps) {
	const { id, text } = nav;
	const isVisible = useStore(publicStore, ({ headerHoveredId }) => headerHoveredId === id || (!headerHoveredId && isActive));

	const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(id), [id]);

	return (
		<button type="button" onMouseEnter={handleOnMouseEnter} className={NAV()}>
			{isVisible && <motion.div layoutId="hovered" className={STAIN()} />}
			<span className={STAIN_CONTENT()}>{text}</span>
		</button>
	);
}
export type HeaderNavProps = { isActive: boolean; nav: { id: string; text: string; href: string } };

// SOCIAL **********************************************************************************************************************************
export function HeaderSocial({ social }: HeaderSocialProps) {
	const { href, icon, id, text } = social;
	const isHovered = useStore(publicStore, ({ headerHoveredId }) => headerHoveredId === id);

	const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(id), [id]);

	return (
		<a key={id} href={href} onMouseEnter={handleOnMouseEnter} className={SOCIAL()}>
			{isHovered && <motion.div layoutId="hovered" className={STAIN({ intent: "primary" })} />}
			<span className={STAIN_CONTENT()}>{icon}</span>
		</a>
	);
}
export type HeaderSocialProps = { social: { icon: ReactNode; id: string; href: string; text: string } };
