import type { api } from "@ec/convex/api";
import { SECTION_CONTENT, SECTION_IMAGE, SECTION_MAIN, Section, SectionImage, SectionTitle } from "@ec/ui/components/web/section";
import type { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";

// ROOT ************************************************************************************************************************************
export function AppAboutPage({ data, renderImage }: AppAboutProps) {
	const intents = ["default", "secondary", "primary"] as const;

	return (
		<>
			{data.map(({ content, img, slug, title }, i) => (
				<Section key={slug} intent={intents[i]} className={{ CONTAINER: i % 2 !== 0 ? "lg:flex-row-reverse" : "" }}>
					<main className={SECTION_MAIN({ className: "basis-1/2" })}>
						<SectionTitle title={title} intent={intents[i] === "secondary" ? "secondary" : "primary"} />
						<p className={SECTION_CONTENT()}>{content}</p>
					</main>
					<SectionImage reverse={i % 2 !== 0} className={{ BASE: "flex basis-1/2" }}>
						{renderImage({ ...img, className: SECTION_IMAGE().IMG() })}
					</SectionImage>
				</Section>
			))}
		</>
	);
}
type AppAboutProps = {
	renderImage: RenderImage;
	data: FunctionReturnType<typeof api.pages.readAbout>;
};
