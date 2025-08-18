"use client";

import { AppWorkshopsItems } from "@ec/app/pages/workshops.items";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export function WorkshopsItems({ preloaded }: WorkshopsItemsProps) {
	const { workshops } = usePreloadedQuery(preloaded);
	return <AppWorkshopsItems data={workshops} renderImage={(props) => <Image {...props} />} />;
}
type WorkshopsItemsProps = { preloaded: Preloaded<typeof api.pages.readWorkshops> };
