"use client";

import { AppWorksLayoutSets } from "@ec/app/layouts/works.sets";
import type { api } from "@ec/convex/api";
import { type Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

// ROOT ************************************************************************************************************************************
export function WorksLayoutSets({ preloaded }: WorksLayoutSetsProps) {
	const { sets } = usePreloadedQuery(preloaded);

	const { setSlug } = useParams();
	const activeSetIndex = useMemo(() => sets.findIndex((set) => set.slug === setSlug), [setSlug, sets]);

	const nextLink = useMemo(() => `/oeuvres/${sets[(activeSetIndex + 1) % sets.length]?.slug}`, [activeSetIndex, sets]);
	const previousLink = useMemo(() => `/oeuvres/${sets[(activeSetIndex + sets.length - 1) % sets.length]?.slug}`, [activeSetIndex, sets]);

	return (
		<AppWorksLayoutSets
			nextLink={<Link href={nextLink}>Suivante</Link>}
			previousLink={<Link href={previousLink}>Précédente</Link>}
			renderImage={(props) => <Image {...props} />}
			setSlug={setSlug}
			sets={sets}
		/>
	);
}
export type WorksLayoutSetsProps = { preloaded: Preloaded<typeof api.layouts.readWorks> };
