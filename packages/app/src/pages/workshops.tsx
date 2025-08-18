import type { api } from "@ec/convex/api";
import { HERO, Hero } from "@ec/ui/components/web/hero";
import { SECTION_CONTENT, SECTION_IMAGE, SECTION_MAIN, Section, SectionImage, SectionTitle } from "@ec/ui/components/web/section";
import type { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";
import type { ReactNode } from "react";

// ROOT ************************************************************************************************************************************
export function AppWorkshopsPage({ data, form, heroButton, items, renderImage }: AppWorkshopsPageProps) {
	return (
		<>
			<Hero title={data.hero.title} button={heroButton} image={renderImage({ ...data.hero.image, className: HERO().IMG() })}>
				{data.hero.content}
			</Hero>
			{items}
			<Section intent="primary">
				<SectionImage reverse>{renderImage({ ...data.form.image, className: SECTION_IMAGE().IMG() })}</SectionImage>
				<main className={SECTION_MAIN()}>
					<SectionTitle title={data.form.title} />
					<p className={SECTION_CONTENT()}>{data.form.content}</p>
					{form}
				</main>
			</Section>
		</>
	);
}
type AppWorkshopsPageProps = {
	data: FunctionReturnType<typeof api.pages.readWorkshops>;
	form: ReactNode;
	heroButton: ReactNode;
	items: ReactNode;
	renderImage: RenderImage;
};
