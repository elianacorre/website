"use client";

import type { api } from "@ec/convex/api";
import { type Sets, zSetCreateValues, zSetUpdateValues } from "@ec/domain/schemas/sets";
import { setCreateDefaultValues, setUpdateValuesFrom } from "@ec/domain/utils/sets";
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
export function AdminSetsUpsertForm({ create, renderImageIdInput, update }: AdminSetsUpsertFormProps) {
	const { selected } = useCollection("sets");

	const form = useForm<Sets["UpsertValuesI"], any, Sets["UpsertValues"]>({
		resolver: zodResolver(selected ? zSetUpdateValues : zSetCreateValues),
		defaultValues: selected ? setUpdateValuesFrom(selected) : setCreateDefaultValues,
	});

	return (
		<UpsertForm create={create} form={form} table="sets" update={update}>
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
export type AdminSetsUpsertFormProps = {
	create: ReactMutation<typeof api.sets.create>;
	renderImageIdInput: (props: ControllerRenderProps<Sets["UpsertValuesI"], "imageId">) => ReactNode;
	update: ReactMutation<typeof api.sets.update>;
};
