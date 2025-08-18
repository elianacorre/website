import { AppCoursesPage } from "@ec/app/pages/courses";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public/cours")({
	component: RouteComponent,
});

// PAGE ************************************************************************************************************************************
function RouteComponent() {
	return <AppCoursesPage />;
}
