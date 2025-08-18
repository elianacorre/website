"use client";

import {
	WorkshopsCombobox as WorkshopsComboboxPrimitive,
	type WorkshopsComboboxProps as WorkshopsComboboxPrimitiveProps,
} from "@ec/app/components/workshops-combobox";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function WorkshopsCombobox({ preloaded, ...props }: WorkshopsComboboxProps) {
	const entries = usePreloadedQuery(preloaded);
	return <WorkshopsComboboxPrimitive entries={entries} {...props} />;
}
export type WorkshopsComboboxProps = Omit<WorkshopsComboboxPrimitiveProps, "entries"> & {
	preloaded: Preloaded<typeof api.workshops.readAll>;
};
