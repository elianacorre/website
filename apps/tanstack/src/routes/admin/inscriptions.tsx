import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { type Subscriptions, zSubscriptionCreateValues, zSubscriptionUpdateValues } from "@ec/domain/schemas/subscriptions";
import { attendeeStringFrom } from "@ec/domain/utils/attendees";
import { eventStringFrom } from "@ec/domain/utils/events";
import { subscriptionCreateDefaultValues, subscriptionFrom, subscriptionUpdateValuesFrom } from "@ec/domain/utils/subscriptions";
import { DraftsTable } from "@ec/ui/components/admin/drafts-table";
import { Page } from "@ec/ui/components/admin/page";
import { UnknownCell } from "@ec/ui/components/admin/unknown-cell";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { Checkbox } from "@ec/ui/components/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { AttendeeCombobox } from "@/components/attendee-combobox";
import { EventCombobox } from "@/components/event-combobox";

export const Route = createFileRoute("/admin/inscriptions")({
	loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(convexQuery(api.subscriptions.readAll, {})),
	component: SubscriptionsPage,
});

// PAGE ************************************************************************************************************************************
function SubscriptionsPage() {
	return (
		<Page label="inscription" table="subscriptions" upsertForm={<SubscriptionsUpsertForm />}>
			<SubscriptionsTable />
		</Page>
	);
}

// TABLE ***********************************************************************************************************************************
function SubscriptionsTable() {
	const { data: entries } = useSuspenseQuery(convexQuery(api.subscriptions.readAll, {}));
	const entities = entries.map(subscriptionFrom);

	const { accessor } = createColumnHelper<Subscriptions["Entity"]>();
	const columns = [
		accessor("event", {
			header: "Événement",
			cell: ({ getValue }) => {
				const event = getValue();
				return event ? eventStringFrom(event) : <UnknownCell />;
			},
		}),
		accessor("attendee", {
			header: "Participant",
			cell: ({ getValue }) => {
				const attendee = getValue();
				return attendee ? attendeeStringFrom(attendee) : <UnknownCell />;
			},
		}),
		accessor("seats", { header: "Places" }),
		accessor("meal", { header: "Repas", cell: (info) => (info.getValue() ? "Oui" : "Non") }),
	];

	return <DraftsTable columns={columns} entities={entities} table="subscriptions" />;
}

// FORM ************************************************************************************************************************************
function SubscriptionsUpsertForm() {
	const { selected } = useCollection("subscriptions");

	const form = useForm<Subscriptions["UpsertValuesI"], any, Subscriptions["UpsertValues"]>({
		resolver: zodResolver(selected ? zSubscriptionUpdateValues : zSubscriptionCreateValues),
		defaultValues: selected ? subscriptionUpdateValuesFrom(selected) : subscriptionCreateDefaultValues,
	});

	return (
		<UpsertForm form={form} table="subscriptions">
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField
				name="attendeeId"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Participant</FormLabel>
						<FormControl>
							<AttendeeCombobox {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="eventId"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Événement</FormLabel>
						<FormControl>
							<EventCombobox {...f} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="meal"
				control={form.control}
				render={({ field: f }) => (
					<FormItem>
						<FormLabel>Repas</FormLabel>
						<FormControl>
							<Checkbox checked={f.value} onCheckedChange={f.onChange} />
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
		</UpsertForm>
	);
}
