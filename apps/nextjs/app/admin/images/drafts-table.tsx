"use client";

import { AdminImagesDraftsTable } from "@ec/app/pages/admin/images.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function ImagesDraftsTable({ preloaded }: ImagesDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.images.remove);

	return <AdminImagesDraftsTable entries={entries} remove={remove} renderImage={(props) => <Image {...props} />} />;
}
export type ImagesDraftsTableProps = { preloaded: Preloaded<typeof api.images.readAll> };
