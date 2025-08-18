"use client";

import type { api } from "@ec/convex/api";
import type { Images } from "@ec/domain/schemas/images";
import { imageDraftFrom } from "@ec/domain/utils/images";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { RenderImage } from "@ec/ui/lib/utils";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminImagesDraftsTable({ entries, remove, renderImage }: AdminImagesDraftsTableProps) {
	const drafts = entries.map(imageDraftFrom);

	const { accessor } = createColumnHelper<Images["Draft"]>();
	const columns = [
		accessor("src", {
			header: "Source",
			cell: ({ row: { original } }) => {
				const { alt, height, src, width } = original;
				return src ? renderImage({ alt, height, src, width, className: "size-10 object-cover" }) : "error";
			},
		}),
		accessor("slug", { header: "Slug" }),
		accessor("alt", { header: "Alt" }),
		accessor("width", { header: "Dimensions", cell: ({ row: { original } }) => `${original.width} x ${original.height}` }),
	];

	return <DraftsTable columns={columns} drafts={drafts} remove={remove} table="images" />;
}
export type AdminImagesDraftsTableProps = {
	entries: FunctionReturnType<typeof api.images.readAll>;
	renderImage: RenderImage;
	remove: ReactMutation<typeof api.images.remove>;
};
