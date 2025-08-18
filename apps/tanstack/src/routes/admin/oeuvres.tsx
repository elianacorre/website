import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Works, workCreateDefaultValues, zWorkCreateValues, zWorkUpdateValues } from "@ec/domain/schemas/works";
import { setStringFrom } from "@ec/domain/utils/sets";
import { workFrom, workUpdateValuesFrom } from "@ec/domain/utils/works";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { WorkMaterialCombobox } from "@ec/ui/components/admin/work-material-combobox";
import { WorkMediaMultiselect } from "@ec/ui/components/admin/work-medias-multiselect";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { ImageCombobox } from "@/components/image-combobox";
import { SetCombobox } from "@/components/set-combobox";

export const Route = createFileRoute("/admin/oeuvres")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.works.readAll, {})),
	component: WorksPage,
});

// PAGE ************************************************************************************************************************************
function WorksPage() {
	return (
		<Page label="oeuvre" table="works" upsertForm={<WorksUpsertForm />}>
			<WorksTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function WorksTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.works.readAll, {}));
	const entities = entries.map(workFrom);

	const { accessor } = createColumnHelper<Works["Entity"]>();
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
		accessor("set", {
			header: "Collection",
			cell: ({ getValue }) => {
				const set = getValue();
				return set ? setStringFrom(set) : <UnknownCell />;
			},
		}),
		accessor("width", { header: "Largeur" }),
		accessor("height", { header: "Hauteur" }),
		accessor("material", { header: "Matériau" }),
		accessor("media", { header: "Médias" }),
	];

	return <DraftsTable columns={columns} entities={entities} table="works" />;
}

// FORM ************************************************************************************************************************************
function WorksUpsertForm() {
	const { selected } = useCollection("works");

	const form = useForm<Works["UpsertValuesI"], any, Works["UpsertValues"]>({
		resolver: zodResolver(selected ? zWorkUpdateValues : zWorkCreateValues),
		defaultValues: selected ? workUpdateValuesFrom(selected) : workCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="works">
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
				name="setId"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Collection</FormLabel>
						<FormControl>
							<SetCombobox {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="date"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Date</FormLabel>
						<FormControl>
							<Input type="date" {...f} />
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
				name="material"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Matériau</FormLabel>
						<FormControl>
							<WorkMaterialCombobox {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="media"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Médias</FormLabel>
						<FormControl>
							<WorkMediaMultiselect defaultValue={f.value} value={f.value} onValueChange={f.onChange} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="stripe"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Lien Stripe</FormLabel>
						<FormControl>
							<Input type="url" {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
