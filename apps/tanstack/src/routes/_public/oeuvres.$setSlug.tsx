import { convexQuery } from "@convex-dev/react-query";
import { AppWorksItems } from "@ec/app/pages/works.items";
import { api } from "@ec/convex/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/oeuvres/$setSlug")({
	component: WorksPage,
});

// PAGE ************************************************************************************************************************************
function WorksPage() {
	const { setSlug } = Route.useParams();
	const { data } = useSuspenseQuery(convexQuery(api.pages.readWorksSet, { slug: setSlug }));
	return <AppWorksItems data={data} renderImage={(props) => <img {...props} alt={props.alt} />} />;
}
