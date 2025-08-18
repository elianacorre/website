import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Images, zImageCreateValues, zImageUpdateValues } from "@ec/domain/schemas/images";
import { imageCreateDefaultValues, imageFrom, imageUpdateValuesFrom } from "@ec/domain/utils/images";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const Route = createFileRoute("/admin/images")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.images.readAll, {})),
	component: ImagesPage,
});

// PAGE ************************************************************************************************************************************
function ImagesPage() {
	return (
		<Page label="image" table="images" upsertForm={<ImagesUpsertForm />}>
			<Suspense fallback={<div>Loading...</div>}>
				<ImagesTable />
			</Suspense>
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function ImagesTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.images.readAll, {}));
	const entities = entries.map(imageFrom);

	const { accessor } = createColumnHelper<Images["Entity"]>();
	const columns = [
		accessor("src", {
			header: "Source",
			cell: ({ row: { original } }) => {
				const { alt, height, src, width } = original;
				return src ? <img src={src} alt={alt} width={width} height={height} className="size-10 object-cover" /> : "error";
			},
		}),
		accessor("slug", { header: "Slug" }),
		accessor("alt", { header: "Alt" }),
		accessor("width", { header: "Dimensions", cell: ({ row: { original } }) => `${original.width} x ${original.height}` }),
	];

	return <DraftsTable columns={columns} entities={entities} table="images" />;
}

// FORM ************************************************************************************************************************************
function ImagesUpsertForm() {
	const { selected } = useCollection("images");

	const generateUploadUrl = useConvexMutation(api.images.generateUploadUrl);

	const form = useForm<Images["UpsertValuesI"], any, Images["UpsertValues"]>({
		resolver: zodResolver(selected ? zImageUpdateValues : zImageCreateValues),
		defaultValues: selected ? imageUpdateValuesFrom(selected) : imageCreateDefaultValues,
	});

	const prepare = async ({ files, ...data }: Images["UpsertValues"]) => {
		if (!form.formState.dirtyFields.files || files.length === 0) return data;
		const postUrl = await generateUploadUrl();
		const result = await fetch(postUrl, {
			method: "POST",
			headers: { "Content-Type": files[0].type },
			body: files[0],
		});
		const res = await result.json();
		const { storageId } = z.object({ storageId: z.string() }).parse(res);
		form.setValue("storageId", storageId, { shouldDirty: true });
		return { ...data, storageId };
	};

	return (
		<UpsertForm form={form} table="images" prepare={prepare}>
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
						{selected?.src && (
							<img alt={selected.alt} height={selected.height} src={selected.src} width={selected.width} className="size-10 object-cover" />
						)}
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
