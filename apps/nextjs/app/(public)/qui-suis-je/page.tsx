import { AppAboutPage } from "@ec/app/pages/about";
import { api } from "@ec/convex/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";

// ROOT ************************************************************************************************************************************
export default async function AboutPage() {
	const data = await fetchQuery(api.pages.readAbout);
	return <AppAboutPage data={data} renderImage={(props) => <Image {...props} />} />;
}
