"use client";

import {
	AttendeesCombobox as AttendeesComboboxPrimitive,
	type AttendeesComboboxProps as AttendeesComboboxPrimitiveProps,
} from "@ec/app/components/attendees-combobox";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function AttendeesCombobox({ preloaded, ...props }: AttendeesComboboxProps) {
	const entries = usePreloadedQuery(preloaded);
	return <AttendeesComboboxPrimitive entries={entries} {...props} />;
}
export type AttendeesComboboxProps = Omit<AttendeesComboboxPrimitiveProps, "entries"> & {
	preloaded: Preloaded<typeof api.attendees.readAll>;
};
