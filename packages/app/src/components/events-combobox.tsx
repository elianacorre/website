"use client";

import type { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function EventsCombobox({ entries, ...props }: EventsComboboxProps) {
	const options = entries.map(({ _id, date }) => ({ label: date, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un événement" />;
}
export type EventsComboboxProps = Omit<ComboboxProps, "options" | "placeholder"> & {
	entries: FunctionReturnType<typeof api.events.readAll>;
};
