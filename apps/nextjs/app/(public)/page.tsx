import { AppIndexPage } from "@ec/app/pages/index";
import { api } from "@ec/convex/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

// ROOT ************************************************************************************************************************************
export default async function IndexPage() {
	const data = await fetchQuery(api.pages.readIndex);

	return (
		<AppIndexPage data={data} heroButton={<Link href="#contact">{data.hero.button}</Link>} renderImage={(props) => <Image {...props} />} />
	);
}
