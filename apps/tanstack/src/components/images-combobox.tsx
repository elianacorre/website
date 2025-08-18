import { convexQuery } from "@convex-dev/react-query";
import {
	ImagesCombobox as ImagesComboboxPrimitive,
	type ImagesComboboxProps as ImagesComboboxPrimitiveProps,
} from "@ec/app/components/images-combobox";
import { api } from "@ec/convex/api";
import { useQuery } from "@tanstack/react-query";

// ROOT ************************************************************************************************************************************
export function ImagesCombobox(props: ImagesComboboxProps) {
	const { data: entries = [] } = useQuery(convexQuery(api.images.readAll, {}));
	return <ImagesComboboxPrimitive entries={entries} {...props} />;
}
export type ImagesComboboxProps = Omit<ImagesComboboxPrimitiveProps, "entries">;
