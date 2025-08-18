import { AdminAttendeesPage } from "@ec/app/pages/admin/attendees";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { AttendeesDraftsTable } from "./drafts-table";
import { AttendeesUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function AttendeesPage() {
	const preloadedAttendees = await preloadQuery(api.attendees.readAll);

	return (
		<AdminAttendeesPage upsertForm={<AttendeesUpsertForm />}>
			<AttendeesDraftsTable preloaded={preloadedAttendees} />
		</AdminAttendeesPage>
	);
}
