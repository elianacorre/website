"use client";

import { AdminWorkshopsUpsertForm } from "@ec/app/pages/admin/workshops.upsert-form";
import { api } from "@ec/convex/api";
import { type Preloaded, useMutation } from "convex/react";
import { ImagesCombobox } from "@/components/images-combobox";

// ROOT ************************************************************************************************************************************
export function WorkshopsUpsertForm({ preloadedImages }: WorkshopsUpsertFormProps) {
	const create = useMutation(api.workshops.create);
	const update = useMutation(api.workshops.update);

	return (
		<AdminWorkshopsUpsertForm
			create={create}
			renderImageIdInput={(field) => <ImagesCombobox preloaded={preloadedImages} {...field} />}
			update={update}
		/>
	);
}
export type WorkshopsUpsertFormProps = { preloadedImages: Preloaded<typeof api.images.readAll> };
