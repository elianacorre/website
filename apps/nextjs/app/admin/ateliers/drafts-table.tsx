"use client";

import { AdminWorkshopsDraftsTable } from "@ec/app/pages/admin/workshops.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function WorkshopsDraftsTable({ preloaded }: WorkshopsDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.workshops.remove);
	return <AdminWorkshopsDraftsTable entries={entries} remove={remove} renderImage={(props) => <Image {...props} />} />;
}
export type WorkshopsDraftsTableProps = { preloaded: Preloaded<typeof api.workshops.readAll> };
