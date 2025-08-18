import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Workshops, zWorkshopCreateValues, zWorkshopUpdateValues } from "@ec/domain/schemas/workshops";
import { workshopCreateDefaultValues, workshopFrom, workshopUpdateValuesFrom } from "@ec/domain/utils/workshops";
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

export const Route = createFileRoute("/admin/ateliers")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.workshops.readAll, {})),
	component: WorkshopsPage,
});

// PAGE ************************************************************************************************************************************
function WorkshopsPage() {
	return (
		<Page label="atelier" table="workshops" upsertForm={<WorkshopsUpsertForm />}>
			<WorkshopsTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function WorkshopsTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.workshops.readAll, {}));
	const entities = entries.map(workshopFrom);
	const remove = useConvexMutation(api.workshops.remove);

	const { accessor } = createColumnHelper<Workshops["Entity"]>();
	const columns = [
		accessor("title", { header: "Titre" }),
		accessor("place", { header: "Lieu" }),
		accessor("duration", { header: "Durée" }),
		accessor("content", {
			header: "Contenu",
			cell: ({ getValue }) => <span className="inline-block max-w-3xs truncate">{getValue()}</span>,
		}),
	];

	return <DraftsTable columns={columns} entities={entities} remove={remove} table="workshops" />;
}

// FORM ************************************************************************************************************************************
function WorkshopsUpsertForm() {
	const { selected } = useCollection("workshops");
	const create = useConvexMutation(api.workshops.create);
	const update = useConvexMutation(api.workshops.update);

	const form = useForm<Workshops["UpsertValuesI"], any, Workshops["UpsertValues"]>({
		resolver: zodResolver(selected ? zWorkshopUpdateValues : zWorkshopCreateValues),
		defaultValues: selected ? workshopUpdateValuesFrom(selected) : workshopCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="workshops" create={create} update={update}>
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
				name="place"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Lieu</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="duration"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Durée</FormLabel>
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
		</UpsertForm>
	);
}
