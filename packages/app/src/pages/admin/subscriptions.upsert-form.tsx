"use client";

import type { api } from "@ec/convex/api";
import { type Subscriptions, zSubscriptionCreateValues, zSubscriptionUpdateValues } from "@ec/domain/schemas/subscriptions";
import { subscriptionCreateDefaultValues, subscriptionUpdateValuesFrom } from "@ec/domain/utils/subscriptions";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { Checkbox } from "@ec/ui/components/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import type { ReactNode } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminSubscriptionsUpsertForm({
	create,
	renderAttendeeIdInput,
	renderEventIdInput,
	update,
}: AdminSubscriptionsUpsertFormProps) {
	const { selected } = useCollection("subscriptions");

	const form = useForm<Subscriptions["UpsertValuesI"], any, Subscriptions["UpsertValues"]>({
		resolver: zodResolver(selected ? zSubscriptionUpdateValues : zSubscriptionCreateValues),
		defaultValues: selected ? subscriptionUpdateValuesFrom(selected) : subscriptionCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="subscriptions" update={update}>
			<FormField name="_id" control={form.control} render={({ field: f }) => <Input type="hidden" {...f} />} />
			<FormField
				name="attendeeId"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Participant</FormLabel>
						<FormControl>{renderAttendeeIdInput(field)}</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				name="eventId"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Événement</FormLabel>
						<FormControl>{renderEventIdInput(field)}</FormControl>
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
export type AdminSubscriptionsUpsertFormProps = {
	create: ReactMutation<typeof api.subscriptions.create>;
	renderAttendeeIdInput: (props: ControllerRenderProps<Subscriptions["UpsertValuesI"], "attendeeId">) => ReactNode;
	renderEventIdInput: (props: ControllerRenderProps<Subscriptions["UpsertValuesI"], "eventId">) => ReactNode;
	update: ReactMutation<typeof api.subscriptions.update>;
};
