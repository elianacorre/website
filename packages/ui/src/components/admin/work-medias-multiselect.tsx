import { medias } from "@ec/domain/schemas/works";
import { MultiSelect, type MultiSelectProps } from "@ec/ui/components/sersavan/multi-select";

// ROOT ************************************************************************************************************************************
export function WorkMediaMultiselect(props: WorkMediaMultiselectProps) {
	const options = medias.map((media) => ({ label: media, value: media })) ?? [];
	return <MultiSelect options={options} {...props} />;
}

// TYPES ***********************************************************************************************************************************
export type WorkMediaMultiselectProps = Omit<MultiSelectProps, "options">;
