"use client";

import type { api } from "@ec/convex/api";
import type { Workshops } from "@ec/domain/schemas/workshops";
import { workshopDraftFrom } from "@ec/domain/utils/workshops";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import type { RenderImage } from "@ec/ui/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminWorkshopsDraftsTable({ entries, remove, renderImage }: AdminWorkshopsDraftsTableProps) {
	const drafts = entries.map(workshopDraftFrom);

	const { accessor } = createColumnHelper<Workshops["Draft"]>();
	const columns = [
		accessor("image", {
			header: "Image",
			cell: ({ getValue }) => {
				const image = getValue();
				if (!image || !image.src) return "error";
				const { alt, height, src, width } = image;
				return renderImage({ alt, height, src, width, className: "size-10 object-cover" });
			},
		}),
		accessor("title", { header: "Titre" }),
		accessor("place", { header: "Lieu" }),
		accessor("duration", { header: "Durée" }),
		accessor("content", {
			header: "Contenu",
			cell: ({ getValue }) => <span className="inline-block max-w-3xs truncate">{getValue()}</span>,
		}),
	];

	return <DraftsTable columns={columns} drafts={drafts} remove={remove} table="workshops" />;
}
export type AdminWorkshopsDraftsTableProps = {
	entries: FunctionReturnType<typeof api.workshops.readAll>;
	renderImage: RenderImage;
	remove: ReactMutation<typeof api.workshops.remove>;
};
