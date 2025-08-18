"use client";

import { AdminAttendeesDraftsTable } from "@ec/app/pages/admin/attendees.drafts-table";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function AttendeesDraftsTable({ preloaded }: AttendeesDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.attendees.remove);

	return <AdminAttendeesDraftsTable entries={entries} remove={remove} />;
}
export type AttendeesDraftsTableProps = { preloaded: Preloaded<typeof api.attendees.readAll> };
