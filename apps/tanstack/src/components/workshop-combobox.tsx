import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function WorkshopCombobox(props: WorkshopComboboxProps) {
	const { data: workshops } = useQuery(convexQuery(api.workshops.readAll, {}));
	const options = workshops?.map(({ _id, title }) => ({ label: title, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un atelier" />;
}

// TYPES ***********************************************************************************************************************************
export type WorkshopComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
