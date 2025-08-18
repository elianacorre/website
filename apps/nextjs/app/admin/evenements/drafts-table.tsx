"use client";

import { AdminEventsDraftsTable } from "@ec/app/pages/admin/events.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function EventsDraftsTable({ preloaded }: EventsDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.events.remove);

	return <AdminEventsDraftsTable entries={entries} remove={remove} />;
}
export type EventsDraftsTableProps = { preloaded: Preloaded<typeof api.events.readAll> };
