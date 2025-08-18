"use client";

import { AdminImagesUpsertForm } from "@ec/app/pages/admin/images.upsert-form";
import { api } from "@ec/convex/api";
import { useMutation } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function ImagesUpsertForm() {
	const create = useMutation(api.images.create);
	const generateUploadUrl = useMutation(api.images.generateUploadUrl);
	const update = useMutation(api.images.update);

	return (
		<AdminImagesUpsertForm
			create={create}
			generateUploadUrl={generateUploadUrl}
			renderImage={(props) => <Image {...props} />}
			update={update}
		/>
	);
}
