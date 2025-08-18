import { AdminWorkshopsPage } from "@ec/app/pages/admin/workshops";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { WorkshopsDraftsTable } from "./drafts-table";
import { WorkshopsUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function WorkshopsPage() {
	const [preloadedWorkshops, preloadedImages] = await Promise.all([preloadQuery(api.workshops.readAll), preloadQuery(api.images.readAll)]);

	return (
		<AdminWorkshopsPage upsertForm={<WorkshopsUpsertForm preloadedImages={preloadedImages} />}>
			<WorkshopsDraftsTable preloaded={preloadedWorkshops} />
		</AdminWorkshopsPage>
	);
}
