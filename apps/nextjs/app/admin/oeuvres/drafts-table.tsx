"use client";

import { AdminWorksDraftsTable } from "@ec/app/pages/admin/works.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function WorksDraftsTable({ preloaded }: WorksDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.works.remove);

	return <AdminWorksDraftsTable entries={entries} remove={remove} renderImage={(props) => <Image {...props} />} />;
}

// TYPES ***********************************************************************************************************************************
export type WorksDraftsTableProps = {
	preloaded: Preloaded<typeof api.works.readAll>;
};
