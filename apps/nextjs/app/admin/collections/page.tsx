import { AdminSetsPage } from "@ec/app/pages/admin/sets";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { SetsDraftsTable } from "./drafts-table";
import { SetsUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function SetsPage() {
	const [preloadedSets, preloadedImages] = await Promise.all([preloadQuery(api.sets.readAll), preloadQuery(api.images.readAll)]);

	return (
		<AdminSetsPage upsertForm={<SetsUpsertForm preloadedImages={preloadedImages} />}>
			<SetsDraftsTable preloaded={preloadedSets} />
		</AdminSetsPage>
	);
}
