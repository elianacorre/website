"use client";

import type { api } from "@ec/convex/api";
import type { Events } from "@ec/domain/schemas/events";
import { eventDateStringFrom, eventDraftFrom } from "@ec/domain/utils/events";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminEventsDraftsTable({ entries, remove }: AdminEventsDraftsTableProps) {
	const drafts = entries.map(eventDraftFrom);
	const invalid = drafts.filter(({ workshop }) => !workshop);

	const { accessor } = createColumnHelper<Events["Draft"]>();
	const columns = [
		accessor("date", { header: "Date", cell: ({ getValue }) => eventDateStringFrom(getValue()) }),
		accessor("seats", { header: "Places" }),
		accessor("workshop", { header: "Atelier", cell: ({ getValue }) => getValue()?.title ?? <UnknownCell /> }),
	];

	return <DraftsTable columns={columns} drafts={drafts} invalid={invalid} remove={remove} table="events" />;
}
export type AdminEventsDraftsTableProps = {
	entries: FunctionReturnType<typeof api.events.readAll>;
	remove: ReactMutation<typeof api.events.remove>;
};
