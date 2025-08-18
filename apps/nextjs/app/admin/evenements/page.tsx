import { AdminEventsPage } from "@ec/app/pages/admin/events";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { EventsDraftsTable } from "./drafts-table";
import { EventsUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function EventsPage() {
	const [preloadedEvents, preloadedWorkshops] = await Promise.all([preloadQuery(api.events.readAll), preloadQuery(api.workshops.readAll)]);

	return (
		<AdminEventsPage upsertForm={<EventsUpsertForm preloadedWorkshops={preloadedWorkshops} />}>
			<EventsDraftsTable preloaded={preloadedEvents} />
		</AdminEventsPage>
	);
}
