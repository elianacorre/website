import { convexQuery } from "@convex-dev/react-query";
import {
	EventsCombobox as EventsComboboxPrimitive,
	type EventsComboboxProps as EventsComboboxPrimitiveProps,
} from "@ec/app/components/events-combobox";
import { api } from "@ec/convex/api";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function EventsCombobox(props: EventsComboboxProps) {
	const { data: entries = [] } = useQuery(convexQuery(api.events.readAll, {}));
	return <EventsComboboxPrimitive entries={entries} {...props} />;
}
export type EventsComboboxProps = Omit<EventsComboboxPrimitiveProps, "entries">;
