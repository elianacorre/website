import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function ImageCombobox(props: ImageComboboxProps) {
	const { data: images } = useQuery(convexQuery(api.images.readAll, {}));
	const options = images?.map(({ _id, slug }) => ({ label: slug, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner une image" />;
}

// TYPES ***********************************************************************************************************************************
export type ImageComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
