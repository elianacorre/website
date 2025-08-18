"use client";

import { AdminSetsUpsertForm } from "@ec/app/pages/admin/sets.upsert-form";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation } from "convex/react";
import { ImagesCombobox } from "@/components/images-combobox";

// ROOT ************************************************************************************************************************************
export function SetsUpsertForm({ preloadedImages }: SetsUpsertFormProps) {
	const create = useMutation(api.sets.create);
	const update = useMutation(api.sets.update);

	return (
		<AdminSetsUpsertForm
			create={create}
			renderImageIdInput={(field) => <ImagesCombobox preloaded={preloadedImages} {...field} />}
			update={update}
		/>
	);
}
export type SetsUpsertFormProps = { preloadedImages: Preloaded<typeof api.images.readAll> };
