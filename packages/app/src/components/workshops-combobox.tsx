"use client";

import type { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function WorkshopsCombobox({ entries, ...props }: WorkshopsComboboxProps) {
	const options = entries.map(({ _id, title }) => ({ label: title, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un atelier" />;
}
export type WorkshopsComboboxProps = Omit<ComboboxProps, "options" | "placeholder"> & {
	entries: FunctionReturnType<typeof api.workshops.readAll>;
};
