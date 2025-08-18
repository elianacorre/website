"use client";

import type { api } from "@ec/convex/api";
import { type Events, zEventCreateValues, zEventUpdateValues } from "@ec/domain/schemas/events";
import { eventCreateDefaultValues, eventUpdateValuesFrom } from "@ec/domain/utils/events";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import type { ReactNode } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminEventsUpsertForm({ create, renderWorkshopIdInput, update }: AdminEventsUpsertFormProps) {
	const { selected } = useCollection("events");

	const form = useForm<Events["UpsertValuesI"], any, Events["UpsertValues"]>({
		resolver: zodResolver(selected ? zEventUpdateValues : zEventCreateValues),
		defaultValues: selected ? eventUpdateValuesFrom(selected) : eventCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="events" update={update}>
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
				render={({ field }) => (
					<FormItem>
						<FormLabel>Atelier</FormLabel>
						<FormControl>{renderWorkshopIdInput(field)}</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
export type AdminEventsUpsertFormProps = {
	create: ReactMutation<typeof api.events.create>;
	renderWorkshopIdInput: (props: ControllerRenderProps<Events["UpsertValuesI"], "workshopId">) => ReactNode;
	update: ReactMutation<typeof api.events.update>;
};
