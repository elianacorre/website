"use client";

import {
	ImagesCombobox as ImagesComboboxPrimitive,
	type ImagesComboboxProps as ImagesComboboxPrimitiveProps,
} from "@ec/app/components/images-combobox";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function ImagesCombobox({ preloaded, ...props }: ImagesComboboxProps) {
	const images = usePreloadedQuery(preloaded);
	return <ImagesComboboxPrimitive entries={images} {...props} />;
}
export type ImagesComboboxProps = Omit<ImagesComboboxPrimitiveProps, "entries"> & { preloaded: Preloaded<typeof api.images.readAll> };
