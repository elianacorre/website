"use client";

import type { api } from "@ec/convex/api";
import type { Attendees } from "@ec/domain/schemas/attendees";
import { attendeeDraftFrom } from "@ec/domain/utils/attendees";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminAttendeesDraftsTable({ entries, remove }: AdminAttendeesDraftsTableProps) {
	const drafts = entries.map(attendeeDraftFrom);

	const { accessor } = createColumnHelper<Attendees["Draft"]>();
	const columns = [
		accessor("firstName", { id: "firstName", header: "Prénom" }),
		accessor("lastName", { id: "lastName", header: "Nom" }),
		accessor("email", { id: "email", header: "Email" }),
	];

	return <DraftsTable columns={columns} drafts={drafts} remove={remove} table="attendees" />;
}
export type AdminAttendeesDraftsTableProps = {
	entries: FunctionReturnType<typeof api.attendees.readAll>;
	remove: ReactMutation<typeof api.attendees.remove>;
};
