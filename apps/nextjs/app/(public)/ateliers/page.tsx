import { AppWorkshopsPage } from "@ec/app/pages/workshops";
import { api } from "@ec/convex/api";
import { preloadedQueryResult, preloadQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { WorkshopsForm } from "./form";
import { WorkshopsItems } from "./items";

// ROOT ************************************************************************************************************************************
export default async function WorkshopsPage() {
	const preloaded = await preloadQuery(api.pages.readWorkshops);
	const data = preloadedQueryResult(preloaded);

	return (
		<AppWorkshopsPage
			data={data}
			form={<WorkshopsForm />}
			heroButton={<Link href="#contact">{data.hero.button}</Link>}
			items={<WorkshopsItems preloaded={preloaded} />}
			renderImage={(props) => <Image {...props} />}
		/>
	);
}
