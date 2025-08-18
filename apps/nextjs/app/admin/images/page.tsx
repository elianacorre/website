import { AdminImagesPage } from "@ec/app/pages/admin/images";
import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { ImagesDraftsTable } from "./drafts-table";
import { ImagesUpsertForm } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export default async function ImagesPage() {
	const preloadedImages = await preloadQuery(api.images.readAll);

	return (
		<AdminImagesPage upsertForm={<ImagesUpsertForm />}>
			<ImagesDraftsTable preloaded={preloadedImages} />
		</AdminImagesPage>
	);
}
