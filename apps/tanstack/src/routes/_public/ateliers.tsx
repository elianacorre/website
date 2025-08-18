import { convexQuery } from "@convex-dev/react-query";
import { AppWorkshopsPage } from "@ec/app/pages/workshops";
import { AppWorkshopsItems } from "@ec/app/pages/workshops.items";
import { api } from "@ec/convex/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/ateliers")({
	component: WorkshopsPage,
});

// PAGE ************************************************************************************************************************************
function WorkshopsPage() {
	const { data } = useSuspenseQuery(convexQuery(api.pages.readWorkshops, {}));

	return (
		<AppWorkshopsPage
			data={data}
			form={<div />}
			heroButton={
				<Link to="/ateliers" hash="contact">
					{data.hero.button}
				</Link>
			}
			items={<AppWorkshopsItems data={data.workshops} renderImage={(props) => <img {...props} alt={props.alt} />} />}
			renderImage={(props) => <img {...props} alt={props.alt} />}
		/>
	);
}
