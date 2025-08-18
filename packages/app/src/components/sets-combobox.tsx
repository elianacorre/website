"use client";

import type { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function SetsCombobox({ entries, ...props }: SetsComboboxProps) {
	const options = entries.map(({ _id, title }) => ({ label: title, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner une collection" />;
}
export type SetsComboboxProps = Omit<ComboboxProps, "options" | "placeholder"> & { entries: FunctionReturnType<typeof api.sets.readAll> };
