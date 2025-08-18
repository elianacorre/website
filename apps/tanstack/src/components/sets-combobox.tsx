import { convexQuery } from "@convex-dev/react-query";
import {
	SetsCombobox as SetsComboboxPrimitive,
	type SetsComboboxProps as SetsComboboxPrimitiveProps,
} from "@ec/app/components/sets-combobox";
import { api } from "@ec/convex/api";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function SetsCombobox(props: SetsComboboxProps) {
	const { data: entries = [] } = useQuery(convexQuery(api.sets.readAll, {}));
	return <SetsComboboxPrimitive entries={entries} {...props} />;
}
export type SetsComboboxProps = Omit<SetsComboboxPrimitiveProps, "entries">;
