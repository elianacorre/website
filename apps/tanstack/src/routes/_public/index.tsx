import { convexQuery } from "@convex-dev/react-query";
import { AppIndexPage } from "@ec/app/pages/index";
import { api } from "@ec/convex/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/")({
	component: IndexPage,
});

// PAGE ************************************************************************************************************************************
function IndexPage() {
	const { data } = useSuspenseQuery(convexQuery(api.pages.readIndex, {}));

	return (
		<AppIndexPage
			data={data}
			heroButton={
				<Link to="/" hash="contact">
					{data.hero.button}
				</Link>
			}
			renderImage={(props) => <img {...props} alt={props.alt} />}
		/>
	);
}
