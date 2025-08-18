"use client";

import type { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function ImagesCombobox({ entries, ...props }: ImagesComboboxProps) {
	const options = entries.map(({ _id, slug }) => ({ label: slug, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner une image" />;
}
export type ImagesComboboxProps = Omit<ComboboxProps, "options" | "placeholder"> & {
	entries: FunctionReturnType<typeof api.images.readAll>;
};
