"use client";

import type { api } from "@ec/convex/api";
import { ButtonAnimated } from "@ec/ui/components/web/button-animated";
import { SECTION_CONTENT, SECTION_MAIN, Section, SectionTitle } from "@ec/ui/components/web/section";
import { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";
import { ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useMemo } from "react";
import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const S = tv({
	slots: {
		IMAGE: ``,
	},
	variants: {
		active: {
			true: { IMAGE: `opacity-100 scale-100 z-0` },
			false: { IMAGE: `opacity-70 scale-95 -z-10` },
		},
	},
});

// ROOT ************************************************************************************************************************************
export function AppWorksLayoutSets({ nextLink, previousLink, renderImage, sets, setSlug }: AppWorksLayoutSetsProps) {
	const activeSetIndex = useMemo(() => sets.findIndex((set) => set.slug === setSlug), [setSlug, sets]);
	const activeSet = useMemo(() => sets[activeSetIndex], [activeSetIndex, sets]);
	const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

	return (
		activeSet && (
			<Section intent="secondary" className={{ CONTAINER: "lg:items-stretch lg:gap-20" }}>
				<aside className="relative hidden aspect-square w-full basis-1/3 lg:flex">
					<AnimatePresence>
						{sets.map((set, index) => (
							<motion.div
								key={set._id}
								initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
								animate={
									set._id === activeSet._id
										? { opacity: 1, scale: 1, y: [0, -80, 0], z: 0, rotate: 0, zIndex: 40 }
										: { opacity: 0.7, scale: 0.95, y: 0, z: -100, rotate: randomRotateY(), zIndex: sets.length + 2 - index }
								}
								exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="absolute inset-0 aspect-square origin-bottom"
							>
								{renderImage({ ...set.image, className: "size-full rounded-3xl object-cover" })}
							</motion.div>
						))}
					</AnimatePresence>
				</aside>
				<main className={SECTION_MAIN({ className: "basis-2/3 justify-between" })}>
					<motion.div
						key={activeSet._id}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
						className="space-y-8"
					>
						<SectionTitle
							title={["Collection", activeSet.title]}
							intent="secondary"
							className={{ EFFECT: { BASE: "text-2xl sm:text-4xl 2xl:text-5xl" } }}
						/>
						<p className={SECTION_CONTENT()}>{activeSet.content}</p>
					</motion.div>
					<div className="flex w-full justify-between">
						<ButtonAnimated intent="secondary" reverse icon={<ChevronLeft className="size-5" />}>
							{previousLink}
						</ButtonAnimated>
						<ButtonAnimated intent="secondary">{nextLink}</ButtonAnimated>
					</div>
				</main>
			</Section>
		)
	);
}
export type AppWorksLayoutSetsProps = {
	nextLink: ReactNode;
	previousLink: ReactNode;
	renderImage: RenderImage;
	sets: FunctionReturnType<typeof api.layouts.readWorks>["sets"];
	setSlug: string | string[] | undefined;
};
