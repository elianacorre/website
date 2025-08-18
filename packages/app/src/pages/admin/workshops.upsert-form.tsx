"use client";

import type { api } from "@ec/convex/api";
import { type Workshops, zWorkshopCreateValues, zWorkshopUpdateValues } from "@ec/domain/schemas/workshops";
import { workshopCreateDefaultValues, workshopUpdateValuesFrom } from "@ec/domain/utils/workshops";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { Textarea } from "@ec/ui/components/textarea";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import type { ReactNode } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminWorkshopsUpsertForm({ create, renderImageIdInput, update }: AdminWorkshopsUpsertFormProps) {
	const { selected } = useCollection("workshops");

	const form = useForm<Workshops["UpsertValuesI"], any, Workshops["UpsertValues"]>({
		resolver: zodResolver(selected ? zWorkshopUpdateValues : zWorkshopCreateValues),
		defaultValues: selected ? workshopUpdateValuesFrom(selected) : workshopCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="workshops" update={update}>
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
			<FormField
				name="imageId"
				control={form.control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Image</FormLabel>
						<FormControl>{renderImageIdInput(field)}</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</UpsertForm>
	);
}
export type AdminWorkshopsUpsertFormProps = {
	create: ReactMutation<typeof api.workshops.create>;
	renderImageIdInput: (props: ControllerRenderProps<Workshops["UpsertValuesI"], "imageId">) => ReactNode;
	update: ReactMutation<typeof api.workshops.update>;
};
