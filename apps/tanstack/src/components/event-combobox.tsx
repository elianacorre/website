import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function EventCombobox(props: EventComboboxProps) {
	const { data: events } = useQuery(convexQuery(api.events.readAll, {}));
	const options = events?.map(({ _id, date }) => ({ label: date, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un événement" />;
}

// TYPES ***********************************************************************************************************************************
export type EventComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
