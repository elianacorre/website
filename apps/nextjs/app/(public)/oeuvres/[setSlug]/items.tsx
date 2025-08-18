"use client";

import { AppWorksItems } from "@ec/app/pages/works.items";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function WorksItems({ preloaded }: WorksItemsProps) {
	const works = usePreloadedQuery(preloaded);
	return <AppWorksItems data={works} renderImage={(props) => <Image {...props} />} />;
}
export type WorksItemsProps = { preloaded: Preloaded<typeof api.pages.readWorksSet> };
