import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function ImagesCombobox(props: ImagesComboboxProps) {
	const { data: images } = useQuery(convexQuery(api.images.readAll, {}));
	const options = images?.map(({ _id, slug }) => ({ label: slug, value: _id })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner une image" />;
}
export type ImagesComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
