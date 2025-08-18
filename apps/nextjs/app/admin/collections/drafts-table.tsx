"use client";

import { AdminSetsDraftsTable } from "@ec/app/pages/admin/sets.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function SetsDraftsTable({ preloaded }: SetsDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.sets.remove);

	return <AdminSetsDraftsTable entries={entries} remove={remove} renderImage={(props) => <Image {...props} />} />;
}
export type SetsDraftsTableProps = { preloaded: Preloaded<typeof api.sets.readAll> };
