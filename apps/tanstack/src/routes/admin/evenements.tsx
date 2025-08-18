import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Events, zEventCreateValues, zEventUpdateValues } from "@ec/domain/schemas/events";
import { eventCreateDefaultValues, eventDateStringFrom, eventFrom, eventUpdateValuesFrom } from "@ec/domain/utils/events";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { WorkshopCombobox } from "@/components/workshop-combobox";

export const Route = createFileRoute("/admin/evenements")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.events.readAll, {})),
	component: EventsPage,
});

// PAGE ************************************************************************************************************************************
function EventsPage() {
	return (
		<Page label="événement" table="events" upsertForm={<EventsUpsertForm />}>
			<EventsTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function EventsTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.events.readAll, {}));
	const entities = entries.map(eventFrom);

	const { accessor } = createColumnHelper<Events["Entity"]>();
	const columns = [
		accessor("date", { header: "Date", cell: ({ getValue }) => eventDateStringFrom(getValue()) }),
		accessor("seats", { header: "Places" }),
		accessor("workshop", { header: "Atelier", cell: ({ getValue }) => getValue()?.title ?? <UnknownCell /> }),
	];

	return <DraftsTable columns={columns} entities={entities} table="events" />;
}

// FORM ************************************************************************************************************************************
function EventsUpsertForm() {
	const { selected } = useCollection("events");

	const form = useForm<Events["UpsertValuesI"], any, Events["UpsertValues"]>({
		resolver: zodResolver(selected ? zEventUpdateValues : zEventCreateValues),
		defaultValues: selected ? eventUpdateValuesFrom(selected) : eventCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="events">
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
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
				name="seats"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Places</FormLabel>
						<FormControl>
							<Input type="number" min="1" step="1" {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="workshopId"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Atelier</FormLabel>
						<FormControl>
							<WorkshopCombobox {...f} className="w-full" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
