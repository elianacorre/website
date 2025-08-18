"use client";

import type { api } from "@ec/convex/api";
import type { Subscriptions } from "@ec/domain/schemas/subscriptions";
import { attendeeStringFrom } from "@ec/domain/utils/attendees";
import { eventStringFrom } from "@ec/domain/utils/events";
import { subscriptionDraftFrom } from "@ec/domain/utils/subscriptions";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import { createColumnHelper } from "@tanstack/react-table";
import type { ReactMutation } from "convex/react";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AdminSubscriptionsDraftsTable({ entries, remove }: AdminSubscriptionsDraftsTableProps) {
	const drafts = entries.map(subscriptionDraftFrom);
	const invalid = drafts.filter(({ attendee, event }) => !attendee || !event);

	const { accessor } = createColumnHelper<Subscriptions["Draft"]>();
	const columns = [
		accessor("event", {
			header: "Événement",
			cell: ({ getValue }) => {
				const event = getValue();
				return event ? eventStringFrom(event) : <UnknownCell />;
			},
		}),
		accessor("attendee", {
			header: "Participant",
			cell: ({ getValue }) => {
				const attendee = getValue();
				return attendee ? attendeeStringFrom(attendee) : <UnknownCell />;
			},
		}),
		accessor("seats", { header: "Places" }),
		accessor("meal", { header: "Repas", cell: (info) => (info.getValue() ? "Oui" : "Non") }),
	];

	return <DraftsTable columns={columns} drafts={drafts} invalid={invalid} remove={remove} table="subscriptions" />;
}

// TYPES ***********************************************************************************************************************************
export type AdminSubscriptionsDraftsTableProps = {
	entries: FunctionReturnType<typeof api.subscriptions.readAll>;
	remove: ReactMutation<typeof api.subscriptions.remove>;
};
