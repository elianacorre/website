"use client";

import {
	SetsCombobox as SetsComboboxPrimitive,
	type SetsComboboxProps as SetsComboboxPrimitiveProps,
} from "@ec/app/components/sets-combobox";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function SetsCombobox({ preloaded, ...props }: SetsComboboxProps) {
	const entries = usePreloadedQuery(preloaded);
	return <SetsComboboxPrimitive entries={entries} {...props} />;
}
export type SetsComboboxProps = Omit<SetsComboboxPrimitiveProps, "entries"> & { preloaded: Preloaded<typeof api.sets.readAll> };
