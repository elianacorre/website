"use client";

import type { api } from "@ec/convex/api";
import { zStorageRef } from "@ec/domain/convex/schemas";
import { type Images, zImageCreateValues, zImageUpdateValues } from "@ec/domain/schemas/images";
import { imageCreateDefaultValues, imageUpdateValuesFrom } from "@ec/domain/utils/images";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { Button } from "@ec/ui/components/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadItemMetadata,
	FileUploadItemPreview,
	FileUploadList,
	FileUploadTrigger,
} from "@ec/ui/components/file-upload";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import type { RenderImage } from "@ec/ui/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminImagesUpsertForm({ create, generateUploadUrl, renderImage, update }: AdminImagesUpsertFormProps) {
	const { selected } = useCollection("images");

	const form = useForm<Images["UpsertValuesI"], any, Images["UpsertValues"]>({
		resolver: zodResolver(selected ? zImageUpdateValues : zImageCreateValues),
		defaultValues: selected ? imageUpdateValuesFrom(selected) : imageCreateDefaultValues,
	});

	const prepare = async ({ files, ...data }: Images["UpsertValues"]) => {
		if (!form.formState.dirtyFields.files || !files[0]) return data;
		const postUrl = await generateUploadUrl();
		const result = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": files[0].type },
			body: files[0],
		});
		const res = await result.json();
		const { storageId } = zStorageRef.parse(res);
		form.setValue("storageId", storageId, { shouldDirty: true });
		return { ...data, storageId };
	};

	return (
		<UpsertForm create={create} form={form} prepare={prepare} table="images" update={update}>
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField name="storageId" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField
				name="slug"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Slug</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="alt"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Alt</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="width"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Largeur</FormLabel>
						<FormControl>
							<Input type="number" min="1" step="1" {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="height"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Longueur</FormLabel>
						<FormControl>
							<Input type="number" min="1" step="1" {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="files"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Source</FormLabel>
						{selected?.src &&
							renderImage({
								alt: selected.alt,
								height: selected.height,
								src: selected.src,
								width: selected.width,
								className: "size-10 object-cover",
							})}
						<FormControl>
							<FileUpload
								value={f.value}
								onValueChange={f.onChange}
								accept="image/*"
								maxFiles={1}
								maxSize={20 * 1024 * 1024}
								onFileReject={(_, message) => form.setError("files", { message })}
							>
								<FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
									<CloudUploadIcon className="size-4" />
									Drag and drop or
									<FileUploadTrigger asChild>
										<Button variant="link" size="sm" className="p-0">
											choose files
										</Button>
									</FileUploadTrigger>
									to upload
								</FileUploadDropzone>
								<FileUploadList>
									{f.value?.map((file) => (
										<FileUploadItem key={file.name} value={file}>
											<FileUploadItemPreview />
											<FileUploadItemMetadata />
											<FileUploadItemDelete asChild>
												<Button variant="ghost" size="icon" className="size-7">
													<XIcon />
													<span className="sr-only">Delete</span>
												</Button>
											</FileUploadItemDelete>
										</FileUploadItem>
									))}
								</FileUploadList>
							</FileUpload>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
export type AdminImagesUpsertFormProps = {
	create: ReactMutation<typeof api.images.create>;
	generateUploadUrl: ReactMutation<typeof api.images.generateUploadUrl>;
	renderImage: RenderImage;
	update: ReactMutation<typeof api.images.update>;
};
