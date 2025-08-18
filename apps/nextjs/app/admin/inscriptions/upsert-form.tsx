"use client";

import { AdminSubscriptionsUpsertForm } from "@ec/app/pages/admin/subscriptions.upsert-form";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation } from "convex/react";
import { AttendeesCombobox } from "@/components/attendees-combobox";
import { EventsCombobox } from "@/components/events-combobox";

// ROOT ************************************************************************************************************************************
export function SubscriptionsUpsertForm({ preloadedAttendees, preloadedEvents }: SubscriptionsUpsertFormProps) {
	const create = useMutation(api.subscriptions.create);
	const update = useMutation(api.subscriptions.update);

	return (
		<AdminSubscriptionsUpsertForm
			create={create}
			renderAttendeeIdInput={(field) => <AttendeesCombobox preloaded={preloadedAttendees} {...field} />}
			renderEventIdInput={(field) => <EventsCombobox preloaded={preloadedEvents} {...field} />}
			update={update}
		/>
	);
}
export type SubscriptionsUpsertFormProps = {
	preloadedAttendees: Preloaded<typeof api.attendees.readAll>;
	preloadedEvents: Preloaded<typeof api.events.readAll>;
};
