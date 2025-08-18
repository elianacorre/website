import { AdminWorksPage } from "@ec/app/pages/admin/works";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { WorksDraftsTable } from "./drafts-table";
import { WorksUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function WorksPage() {
	const [preloadedWorks, preloadedImages, preloadedSets] = await Promise.all([
		preloadQuery(api.works.readAll),
		preloadQuery(api.images.readAll),
		preloadQuery(api.sets.readAll),
	]);

	return (
		<AdminWorksPage upsertForm={<WorksUpsertForm preloadedImages={preloadedImages} preloadedSets={preloadedSets} />}>
			<WorksDraftsTable preloaded={preloadedWorks} />
		</AdminWorksPage>
	);
}
