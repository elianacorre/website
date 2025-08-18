"use client";

import type { api } from "@ec/convex/api";
import type { Works } from "@ec/domain/schemas/works";
import { setStringFrom } from "@ec/domain/utils/sets";
import { workDraftFrom } from "@ec/domain/utils/works";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import type { RenderImage } from "@ec/ui/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminWorksDraftsTable({ entries, renderImage, remove }: AdminWorksDraftsTableProps) {
	const drafts = entries.map(workDraftFrom);

	const { accessor } = createColumnHelper<Works["Draft"]>();
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
		accessor("set", {
			header: "Collection",
			cell: ({ getValue }) => {
				const set = getValue();
				return set ? setStringFrom(set) : <UnknownCell />;
			},
		}),
		accessor("width", { header: "Largeur" }),
		accessor("height", { header: "Hauteur" }),
		accessor("material", { header: "Matériau" }),
		accessor("media", { header: "Médias" }),
	];

	return <DraftsTable columns={columns} drafts={drafts} remove={remove} table="works" />;
}

// TYPES ***********************************************************************************************************************************
export type AdminWorksDraftsTableProps = {
	entries: FunctionReturnType<typeof api.works.readAll>;
	renderImage: RenderImage;
	remove: ReactMutation<typeof api.works.remove>;
};
