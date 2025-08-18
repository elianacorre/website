import { convexQuery } from "@convex-dev/react-query";
import { AppWorksLayout } from "@ec/app/layouts/works";
import { AppWorksLayoutSets } from "@ec/app/layouts/works.sets";
import { api } from "@ec/convex/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet, redirect, useParams } from "@tanstack/react-router";
import { useMemo } from "react";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/oeuvres")({
	beforeLoad: async ({ context, params }) => {
		const { sets } = await context.queryClient.ensureQueryData(convexQuery(api.layouts.readWorks, {}));
		if (!params.setSlug) throw redirect({ to: "/oeuvres/$setSlug", params: { setSlug: sets[0]?.slug } });
	},
	component: WorksPage,
});

// PAGE ************************************************************************************************************************************
function WorksPage() {
	const { data } = useSuspenseQuery(convexQuery(api.layouts.readWorks, {}));
	const { setSlug } = useParams({ from: "/_public/oeuvres/$setSlug" });
	const { sets } = data;
	const activeSetIndex = useMemo(() => sets.findIndex((set) => set.slug === setSlug), [setSlug, sets]);

	return (
		<AppWorksLayout
			data={data}
			renderImage={(props) => <img {...props} alt={props.alt} />}
			renderLink={(props) => <Link to="/" hash="contact" {...props} />}
		>
			<AppWorksLayoutSets
				nextLink={
					<Link to="/oeuvres/$setSlug" params={{ setSlug: sets[(activeSetIndex + 1) % sets.length]?.slug }}>
						Suivante
					</Link>
				}
				previousLink={
					<Link to="/oeuvres/$setSlug" params={{ setSlug: sets[(activeSetIndex + sets.length - 1) % sets.length]?.slug }}>
						Précédente
					</Link>
				}
				renderImage={(props) => <img {...props} alt={props.alt} />}
				sets={sets}
				setSlug={setSlug}
			/>
			<Outlet />
		</AppWorksLayout>
	);
}
