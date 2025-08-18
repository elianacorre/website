import { convexQuery } from "@convex-dev/react-query";
import {
	AttendeesCombobox as AttendeesComboboxPrimitive,
	type AttendeesComboboxProps as AttendeesComboboxPrimitiveProps,
} from "@ec/app/components/attendees-combobox";
import { api } from "@ec/convex/api";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function AttendeesCombobox(props: AttendeesComboboxProps) {
	const { data: entries = [] } = useQuery(convexQuery(api.attendees.readAll, {}));
	return <AttendeesComboboxPrimitive entries={entries} {...props} />;
}
export type AttendeesComboboxProps = Omit<AttendeesComboboxPrimitiveProps, "entries">;
