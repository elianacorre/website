"use client";

import type { api } from "@ec/convex/api";
import type { Works } from "@ec/domain/schemas/works";
import { workFrom } from "@ec/domain/utils/works";
import { GridBackground } from "@ec/ui/components/web/grid-background";
import { Zoom } from "@ec/ui/components/web/zoom";
import type { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";
import { ClipboardIcon, PaletteIcon } from "lucide-react";
import { useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

// ROOT ************************************************************************************************************************************
export const WORK_ITEMS = tv({
	slots: {
		BASE: `relative container mx-auto grid w-full grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3`,
	},
});
const { BASE } = WORK_ITEMS();

export function AppWorksItems({ className, data, renderImage }: AppWorksItemsProps) {
	const works = data.map(workFrom);
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<div className={BASE({ className })}>
			<GridBackground />
			{works.map((work, i) => (
				<WorkItem key={work._id} work={work} index={i} hovered={hovered} setHovered={setHovered} renderImage={renderImage} />
			))}
		</div>
	);
}
export type AppWorksItemsProps = { className?: string; data: FunctionReturnType<typeof api.pages.readWorksSet>; renderImage: RenderImage };

// ITEM ************************************************************************************************************************************
const WORK_ITEM = tv({
	slots: {
		BASE: ``,
		IMG: `size-full object-cover`,
		INFOS: `absolute inset-0 flex flex-col justify-between bg-black/50 text-white p-5 transition-opacity duration-300 opacity-0 pointer-events-none
    group-hover:opacity-100`,
		WRAPPER: `group relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-200 shadow-lg inset-shadow-2xs transition-all duration-300 ease-out`,
	},
	variants: {
		otherHovered: {
			true: {
				WRAPPER: "scale-[0.98] blur-sm",
			},
		},
	},
});

export function WorkItem({ className: C = {}, hovered, index, setHovered, renderImage, work }: WorksItemProps) {
	const { BASE, IMG, INFOS, WRAPPER } = WORK_ITEM();

	return (
		<Zoom>
			<div
				role="tooltip"
				onMouseEnter={() => setHovered(index)}
				onMouseLeave={() => setHovered(null)}
				className={WRAPPER({ otherHovered: hovered !== null && hovered !== index, className: C.WRAPPER })}
			>
				{renderImage({ ...work.image, className: IMG({ className: C.IMG }) })}
				<div className={INFOS()}>
					<h3 className="font-heading text-center text-4xl">{work.title}</h3>
					<ul className="text-base">
						<li className="flex items-center gap-2">
							<PaletteIcon className="size-4" />
							{work.media.join(", ")}
						</li>
						<li className="flex items-center gap-2">
							<ClipboardIcon className="size-4" />
							{work.material}
						</li>
					</ul>
				</div>
			</div>
		</Zoom>
	);
}
export type WorksItemProps = WorksItemStyles & {
	work: Works["Entity"];
	index: number;
	hovered: number | null;
	renderImage: RenderImage;
	setHovered: React.Dispatch<React.SetStateAction<number | null>>;
};
export type WorksItemStyles = VariantProps<typeof WORK_ITEM> & { className?: Partial<(typeof WORK_ITEM)["slots"]> };
