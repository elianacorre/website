import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Sets, zSetCreateValues, zSetUpdateValues } from "@ec/domain/schemas/sets";
import { setCreateDefaultValues, setFrom, setUpdateValuesFrom } from "@ec/domain/utils/sets";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { Textarea } from "@ec/ui/components/textarea";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { ImageCombobox } from "@/components/image-combobox";

export const Route = createFileRoute("/admin/collections")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.sets.readAll, {})),
	component: SetsPage,
});

// PAGE ************************************************************************************************************************************
function SetsPage() {
	return (
		<Page label="collection" table="sets" upsertForm={<SetsUpsertForm />}>
			<SetsTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function SetsTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.sets.readAll, {}));
	const entities = entries.map(setFrom);

	const { accessor } = createColumnHelper<Sets["Entity"]>();
	const columns = [
		accessor("image", {
			header: "Image",
			cell: ({ getValue }) => {
				const image = getValue();
				if (!image || !image.src) return "error";
				const { alt, height, src, width } = image;
				return <img src={src} alt={alt} width={width} height={height} className="size-10 object-cover" />;
			},
		}),
		accessor("title", { header: "Titre" }),
		accessor("content", {
			header: "Contenu",
			cell: ({ getValue }) => <span className="inline-block max-w-3xs truncate">{getValue()}</span>,
		}),
	];

	return <DraftsTable columns={columns} entities={entities} table="sets" />;
}

// FORM ************************************************************************************************************************************
function SetsUpsertForm() {
	const { selected } = useCollection("sets");

	const form = useForm<Sets["UpsertValuesI"], any, Sets["UpsertValues"]>({
		resolver: zodResolver(selected ? zSetUpdateValues : zSetCreateValues),
		defaultValues: selected ? setUpdateValuesFrom(selected) : setCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="sets">
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField
				name="title"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Titre</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="content"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Contenu</FormLabel>
						<FormControl>
							<Textarea rows={8} {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="imageId"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Image</FormLabel>
						<FormControl>
							<ImageCombobox {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
