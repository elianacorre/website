import { api } from "@ec/convex/api";
import { preloadQuery } from "convex/nextjs";
import { WorksItems } from "./items";

// ROOT ************************************************************************************************************************************
export default async function WorksPage({ params }: WorksPageProps) {
	const { setSlug } = await params;
	const preloaded = await preloadQuery(api.pages.readWorksSet, { slug: setSlug });

	return <WorksItems preloaded={preloaded} />;
}
type WorksPageProps = { params: Promise<{ setSlug: string }> };
