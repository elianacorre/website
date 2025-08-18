"use client";

import type { api } from "@ec/convex/api";
import type { Workshops } from "@ec/domain/schemas/workshops";
import { Badge } from "@ec/ui/components/badge";
import { ButtonAnimated } from "@ec/ui/components/web/button-animated";
import { SECTION_MAIN, Section, SectionTitle } from "@ec/ui/components/web/section";
import type { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

// ROOT ************************************************************************************************************************************
export function AppWorkshopsItems({ data, renderImage }: AppWorkshopsItemsProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<Section intent="secondary">
			<main className={SECTION_MAIN()}>
				<SectionTitle title={["Rejoignez-moi", "pour expérimenter"]} intent="secondary" />
				<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
					{data.map((workshop, i) => (
						<div
							key={workshop._id}
							role="tooltip"
							className="group relative block size-full p-4"
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<AnimatePresence>
								{hoveredIndex === i && (
									<motion.span
										className="bg-secondary absolute inset-0 block size-full rounded-3xl"
										layoutId="hoverBackground"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { duration: 0.15 },
										}}
										exit={{
											// opacity: 0,
											transition: { duration: 0.15, delay: 0.2 },
										}}
									/>
								)}
							</AnimatePresence>
							<WorkshopsItem key={workshop._id} workshop={workshop} index={i} renderImage={renderImage} />
						</div>
					))}
				</ul>
			</main>
		</Section>
	);
}
type AppWorkshopsItemsProps = { data: FunctionReturnType<typeof api.pages.readWorkshops>["workshops"]; renderImage: RenderImage };

// ITEM ************************************************************************************************************************************
const ITEM = tv({
	slots: {
		BASE: ``,
		IMG: `size-full object-cover`,
		INFOS: `absolute inset-0 flex flex-col justify-between bg-black/50 text-white p-5 transition-opacity duration-300 opacity-0 pointer-events-none
    group-hover:opacity-100`,
		WRAPPER: `group z-20 relative gap-8 w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-lg inset-shadow-2xs transition-all duration-300 ease-out`,
	},
	variants: {
		otherHovered: {
			true: {
				WRAPPER: "scale-[0.98] blur-sm",
			},
		},
	},
});

export function WorkshopsItem({ className: C = {}, index, renderImage, workshop }: WorkshopsItemProps) {
	const { BASE, IMG, INFOS, WRAPPER } = ITEM();

	return (
		<div className={WRAPPER({ className: C.WRAPPER })}>
			<figure className="relative aspect-square w-full max-w-xl">
				{renderImage({ ...workshop.image, className: "size-full object-cover" })}
			</figure>
			<div className="flex flex-col gap-8 p-4">
				<h3 className="font-heading text-center text-4xl font-black">{workshop.title}</h3>
				<p className="text-justify font-light text-balance">{workshop.content}</p>
				<ul className="flex flex-col gap-2">
					<li className="flex gap-2">
						<MapPinIcon className="text-secondary" />
						{workshop.place}
					</li>
					<li className="flex gap-2">
						<ClockIcon className="text-secondary" />
						{workshop.duration}
					</li>
					<li className="flex gap-2">
						<CalendarIcon className="text-secondary flex-none" />
						<ul className="flex w-full flex-col gap-2">
							<li className="flex items-center justify-between gap-2">
								05 Juillet 2025
								<Badge variant="outline" className="bg-white">
									3<UserIcon />
								</Badge>
							</li>
							<li className="flex items-center justify-between gap-2">
								19 Septembre 2025
								<Badge variant="destructive">
									0<UserIcon />
								</Badge>
							</li>
						</ul>
					</li>
				</ul>
				<ButtonAnimated intent="secondary" className="self-center">
					{/* <Link href="#">Réserver</Link> */}
				</ButtonAnimated>
			</div>
		</div>
	);
}
type WorkshopsItemProps = WorkshopsItemStyles & { index: number; renderImage: RenderImage; workshop: Workshops["Entity"] };
type WorkshopsItemStyles = VariantProps<typeof ITEM> & { className?: Partial<(typeof ITEM)["slots"]> };
