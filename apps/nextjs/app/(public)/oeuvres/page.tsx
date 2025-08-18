import { api } from "@ec/convex/api";
import { fetchQuery } from "convex/nextjs";
import { permanentRedirect } from "next/navigation";

// ROOT ************************************************************************************************************************************
export default async function WorksPage() {
	const { sets } = await fetchQuery(api.layouts.readWorks);
	permanentRedirect(`/oeuvres/${sets[0]?.slug}`);
}
