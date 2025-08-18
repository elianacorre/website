import { AdminSubscriptionsPage } from "@ec/app/pages/admin/subscriptions";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { SubscriptionsDraftsTable } from "./drafts-table";
import { SubscriptionsUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function SubscriptionsPage() {
	const [preloadedAttendees, preloadedEvents, preloadedSubscriptions] = await Promise.all([
		preloadQuery(api.attendees.readAll),
		preloadQuery(api.events.readAll),
		preloadQuery(api.subscriptions.readAll),
	]);

	return (
		<AdminSubscriptionsPage
			upsertForm={<SubscriptionsUpsertForm preloadedAttendees={preloadedAttendees} preloadedEvents={preloadedEvents} />}
		>
			<SubscriptionsDraftsTable preloaded={preloadedSubscriptions} />
		</AdminSubscriptionsPage>
	);
}
