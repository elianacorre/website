"use client";

// import type { RenderImage } from "@ec/app/lib";
import type { api } from "@ec/convex/api";
import type { Sets } from "@ec/domain/schemas/sets";
import { setDraftFrom } from "@ec/domain/utils/sets";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import type { RenderImage } from "@ec/ui/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminSetsDraftsTable({ entries, renderImage, remove }: AdminSetsDraftsTableProps) {
	const drafts = entries.map(setDraftFrom);

	const { accessor } = createColumnHelper<Sets["Draft"]>();
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
		accessor("content", {
			header: "Contenu",
			cell: ({ getValue }) => <span className="inline-block max-w-3xs truncate">{getValue()}</span>,
		}),
	];

	return <DraftsTable columns={columns} drafts={drafts} remove={remove} table="sets" />;
}
export type AdminSetsDraftsTableProps = {
	entries: FunctionReturnType<typeof api.sets.readAll>;
	renderImage: RenderImage;
	remove: ReactMutation<typeof api.sets.remove>;
};
