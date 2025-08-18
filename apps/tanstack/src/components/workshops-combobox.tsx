import { convexQuery } from "@convex-dev/react-query";
import {
	WorkshopsCombobox as WorkshopsComboboxPrimitive,
	type WorkshopsComboboxProps as WorkshopsComboboxPrimitiveProps,
} from "@ec/app/components/workshops-combobox";
import { api } from "@ec/convex/api";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function WorkshopsCombobox(props: WorkshopsComboboxProps) {
	const { data: entries = [] } = useQuery(convexQuery(api.workshops.readAll, {}));
	return <WorkshopsComboboxPrimitive entries={entries} {...props} />;
}
export type WorkshopsComboboxProps = Omit<WorkshopsComboboxPrimitiveProps, "entries">;
