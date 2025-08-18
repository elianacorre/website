"use client";

import type { Id, TableNames } from "@ec/domain/convex/schema";
import { type Collection, collections, type For } from "@ec/domain/index";
import { Button } from "@ec/ui/components/button";
import { Form } from "@ec/ui/components/form";
import { closeUpsert, useCollection } from "@ec/ui/lib/stores";
import { pick } from "es-toolkit";
import { type PropsWithChildren, useEffect } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

// ROOT ************************************************************************************************************************************
export function UpsertForm<T extends TableNames, R extends Record<string, any>>({
	children,
	create,
	form,
	prepare,
	table,
	update,
}: UpsertFormProps<T, R>) {
	const { selected } = useCollection(table);
	const { updateValuesFrom, zCreate, zUpdate } = collections[table] as Collection<T>;

	const handleCancel = () => closeUpsert(table);

	const handleSubmit: SubmitHandler<For<T>["UpsertValues"]> = async (data) => {
		const prepared = prepare ? await prepare(data) : data;
		if (!selected) {
			await create(zCreate.parse(prepared));
			form.reset();
		} else {
			const patch = pick(prepared, [...Object.keys(form.formState.dirtyFields), "_id"] as any);
			await update(zUpdate.parse(patch));
			closeUpsert(table);
		}
	};

	useEffect(() => {
		form.reset(selected ? updateValuesFrom(selected) : undefined);
	}, [selected, form, updateValuesFrom]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="mt-4 flex flex-col gap-4">
				{children}
				<div className="flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={handleCancel}>
						Annuler
					</Button>
					<Button type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting} className="cursor-pointer">
						{selected ? "Mettre à jour" : "Créer"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
export type UpsertFormProps<T extends TableNames, R extends Record<string, any> = Record<string, any>> = PropsWithChildren<{
	create: (args: For<T>["Create"]) => Promise<Id<T>>;
	form: UseFormReturn<For<T>["UpsertValuesI"], any, For<T>["UpsertValues"]>;
	prepare?: (data: For<T>["UpsertValues"]) => Promise<R>;
	table: T;
	update: (args: For<T>["Update"]) => Promise<For<T>["Entry"]>;
}>;
