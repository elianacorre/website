import { materials } from "@ec/domain/schemas/works";
import { Combobox, type ComboboxProps } from "@ec/ui/components/combobox";

// ROOT ************************************************************************************************************************************
export function WorkMaterialCombobox(props: WorkMaterialComboboxProps) {
	const options = materials.map((material) => ({ label: material, value: material })) ?? [];
	return <Combobox options={options} {...props} placeholder="Sélectionner un matériau" />;
}

// TYPES ***********************************************************************************************************************************
export type WorkMaterialComboboxProps = Omit<ComboboxProps, "options" | "placeholder">;
