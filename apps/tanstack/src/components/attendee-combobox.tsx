import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function AttendeeCombobox(props: AttendeeComboboxProps) {
	const { data: attendees } = useQuery(convexQuery(api.attendees.readAll, {}));
	const options = attendees?.map(({ _id, firstName, lastName }) => ({ label: `${firstName} ${lastName}`, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un atelier" />;
}

// TYPES ***********************************************************************************************************************************
export type AttendeeComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
