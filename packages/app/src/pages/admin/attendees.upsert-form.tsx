"use client";

import type { api } from "@ec/convex/api";
import { type Attendees, zAttendeeCreateValues, zAttendeeUpdateValues } from "@ec/domain/schemas/attendees";
import { attendeeCreateDefaultValues, attendeeUpdateValuesFrom } from "@ec/domain/utils/attendees";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import { useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminAttendeesUpsertForm({ create, update }: AdminAttendeesUpsertFormProps) {
	const { selected } = useCollection("attendees");

	const form = useForm<Attendees["UpsertValuesI"], any, Attendees["UpsertValues"]>({
		resolver: zodResolver(selected ? zAttendeeUpdateValues : zAttendeeCreateValues),
		defaultValues: selected ? attendeeUpdateValuesFrom(selected) : attendeeCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="attendees" update={update}>
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
export type AdminAttendeesUpsertFormProps = {
	create: ReactMutation<typeof api.attendees.create>;
	update: ReactMutation<typeof api.attendees.update>;
};
