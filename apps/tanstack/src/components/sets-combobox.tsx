import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function SetsCombobox(props: SetsComboboxProps) {
	const { data: sets } = useQuery(convexQuery(api.sets.readAll, {}));
	const options = sets?.map(({ _id, title }) => ({ label: title, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner une collection" />;
}
export type SetsComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
