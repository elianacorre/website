"use client";

import type { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AttendeesCombobox({ entries, ...props }: AttendeesComboboxProps) {
	const options = entries.map(({ _id, firstName, lastName }) => ({ label: `${firstName} ${lastName}`, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un atelier" />;
}
export type AttendeesComboboxProps = Omit<ComboboxProps, "options" | "placeholder"> & {
	entries: FunctionReturnType<typeof api.attendees.readAll>;
};
