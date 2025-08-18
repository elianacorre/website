import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Attendees, zAttendeeCreateValues, zAttendeeUpdateValues } from "@ec/domain/schemas/attendees";
import { attendeeCreateDefaultValues, attendeeFrom, attendeeUpdateValuesFrom } from "@ec/domain/utils/attendees";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/admin/participants")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.attendees.readAll, {})),
	component: AttendeesPage,
});

// PAGE ************************************************************************************************************************************
function AttendeesPage() {
	return (
		<Page label="participant" table="attendees" upsertForm={<AttendeesUpsertForm />}>
			<AttendeesTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function AttendeesTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.attendees.readAll, {}));
	const entities = entries.map(attendeeFrom);

	const { accessor } = createColumnHelper<Attendees["Entity"]>();
	const columns = [
		accessor("firstName", { id: "firstName", header: "Prénom" }),
		accessor("lastName", { id: "lastName", header: "Nom" }),
		accessor("email", { id: "email", header: "Email" }),
	];

	return <DraftsTable columns={columns} entities={entities} table="attendees" />;
}

// FORM ************************************************************************************************************************************
function AttendeesUpsertForm() {
	const { selected } = useCollection("attendees");

	const form = useForm<Attendees["UpsertValuesI"], any, Attendees["UpsertValues"]>({
		resolver: zodResolver(selected ? zAttendeeUpdateValues : zAttendeeCreateValues),
		defaultValues: selected ? attendeeUpdateValuesFrom(selected) : attendeeCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="attendees">
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField
				name="firstName"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Prénom</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="lastName"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Nom</FormLabel>
						<FormControl>
							<Input {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="email"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Courriel</FormLabel>
						<FormControl>
							<Input type="email" {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
