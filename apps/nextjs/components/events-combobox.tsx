"use client";

import {
	EventsCombobox as EventsComboboxPrimitive,
	type EventsComboboxProps as EventsComboboxPrimitiveProps,
} from "@ec/app/components/events-combobox";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function EventsCombobox({ preloaded, ...props }: EventsComboboxProps) {
	const entries = usePreloadedQuery(preloaded);
	return <EventsComboboxPrimitive entries={entries} {...props} />;
}
export type EventsComboboxProps = Omit<EventsComboboxPrimitiveProps, "entries"> & { preloaded: Preloaded<typeof api.events.readAll> };
