"use client";

import type { api } from "@ec/convex/api";
import { type Works, zWorkCreateValues, zWorkUpdateValues } from "@ec/domain/schemas/works";
import { workCreateDefaultValues, workUpdateValuesFrom } from "@ec/domain/utils/works";
import { UpsertForm } from "@ec/ui/components/admin/upsert-form";
import { WorkMaterialCombobox } from "@ec/ui/components/admin/work-material-combobox";
import { WorkMediaMultiselect } from "@ec/ui/components/admin/work-medias-multiselect";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ec/ui/components/form";
import { Input } from "@ec/ui/components/input";
import { useCollection } from "@ec/ui/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactMutation } from "convex/react";
import type { ReactNode } from "react";
import { type ControllerRenderProps, useForm } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function AdminWorksUpsertForm({ create, renderImageIdInput, renderSetIdInput, update }: AdminWorksUpsertFormProps) {
	const { selected } = useCollection("works");

	const form = useForm<Works["UpsertValuesI"], any, Works["UpsertValues"]>({
		resolver: zodResolver(selected ? zWorkUpdateValues : zWorkCreateValues),
		defaultValues: selected ? workUpdateValuesFrom(selected) : workCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="works" update={update}>
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
				render={({ field }) => (
					<FormItem>
						<FormLabel>Collection</FormLabel>
						<FormControl>{renderSetIdInput(field)}</FormControl>
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
				render={({ field }) => (
					<FormItem>
						<FormLabel>Image</FormLabel>
						<FormControl>{renderImageIdInput(field)}</FormControl>
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
export type AdminWorksUpsertFormProps = {
	create: ReactMutation<typeof api.works.create>;
	renderImageIdInput: (props: ControllerRenderProps<Works["UpsertValuesI"], "imageId">) => ReactNode;
	renderSetIdInput: (props: ControllerRenderProps<Works["UpsertValuesI"], "setId">) => ReactNode;
	update: ReactMutation<typeof api.works.update>;
};
