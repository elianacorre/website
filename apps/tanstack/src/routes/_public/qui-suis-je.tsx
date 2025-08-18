import { convexQuery } from "@convex-dev/react-query";
import { AppAboutPage } from "@ec/app/pages/about";
import { api } from "@ec/convex/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/qui-suis-je")({
	component: AboutPage,
});

// PAGE ************************************************************************************************************************************
function AboutPage() {
	const { data } = useSuspenseQuery(convexQuery(api.pages.readAbout, {}));
	return <AppAboutPage data={data} renderImage={(props) => <img {...props} alt={props.alt} />} />;
}
