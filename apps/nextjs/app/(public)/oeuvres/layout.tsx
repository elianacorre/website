import { AppWorksLayout } from "@ec/app/layouts/works";
import { api } from "@ec/convex/api";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { WorksLayoutSets } from "./layout.sets";

// ROOT ************************************************************************************************************************************
export default async function WorksLayout({ children }: WorksLayoutProps) {
	const preloaded = await preloadQuery(api.layouts.readWorks);
	const data = preloadedQueryResult(preloaded);

	return (
		<AppWorksLayout data={data} renderImage={(props) => <Image {...props} />} renderLink={(props) => <Link href="#contact" {...props} />}>
			<WorksLayoutSets preloaded={preloaded} />
			{children}
		</AppWorksLayout>
	);
}
type WorksLayoutProps = PropsWithChildren;
