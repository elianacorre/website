"use client";

import { AdminEventsUpsertForm } from "@ec/app/pages/admin/events.upsert-form";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation } from "convex/react";
import { WorkshopsCombobox } from "@/components/workshops-combobox";

// ROOT ************************************************************************************************************************************
export function EventsUpsertForm({ preloadedWorkshops }: EventsUpsertFormProps) {
	const create = useMutation(api.events.create);
	const update = useMutation(api.events.update);

	return (
		<AdminEventsUpsertForm
			create={create}
			renderWorkshopIdInput={(field) => <WorkshopsCombobox preloaded={preloadedWorkshops} {...field} />}
			update={update}
		/>
	);
}
export type EventsUpsertFormProps = { preloadedWorkshops: Preloaded<typeof api.workshops.readAll> };
