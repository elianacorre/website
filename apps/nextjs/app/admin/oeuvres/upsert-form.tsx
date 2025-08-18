"use client";

import { AdminWorksUpsertForm } from "@ec/app/pages/admin/works.upsert-form";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation } from "convex/react";
import { ImagesCombobox } from "@/components/images-combobox";
import { SetsCombobox } from "@/components/sets-combobox";

// ROOT ************************************************************************************************************************************
export function WorksUpsertForm({ preloadedImages, preloadedSets }: WorksUpsertFormProps) {
	const create = useMutation(api.works.create);
	const update = useMutation(api.works.update);

	return (
		<AdminWorksUpsertForm
			create={create}
			renderImageIdInput={(field) => <ImagesCombobox preloaded={preloadedImages} {...field} />}
			renderSetIdInput={(field) => <SetsCombobox preloaded={preloadedSets} {...field} />}
			update={update}
		/>
	);
}
export type WorksUpsertFormProps = {
	preloadedImages: Preloaded<typeof api.images.readAll>;
	preloadedSets: Preloaded<typeof api.sets.readAll>;
};
