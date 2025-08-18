import type { api } from "@ec/convex/api";
import type { Images } from "@ec/domain/schemas/images";
import { HERO, Hero } from "@ec/ui/components/web/hero";
import { SECTION_CONTENT, SECTION_IMAGE, SECTION_MAIN, Section, SectionImage, SectionTitle } from "@ec/ui/components/web/section";
import type { FunctionReturnType } from "convex/server";
import type { PropsWithChildren, ReactNode } from "react";

// ROOT ************************************************************************************************************************************
export function AppWorksLayout({ children, data: { form, hero }, renderImage, renderLink }: AppWorksLayoutProps) {
	return (
		<>
			<Hero
				title={hero.title}
				button={renderLink({ children: hero.button })}
				image={renderImage({ ...hero.image, className: HERO().IMG() })}
			>
				{hero.content}
			</Hero>
			{/* <AppWorksLayoutSets preloaded={preloaded} /> */}
			{children}
			<Section intent="primary">
				<SectionImage reverse>{renderImage({ ...form.image, className: SECTION_IMAGE().IMG() })}</SectionImage>
				<main className={SECTION_MAIN()}>
					<SectionTitle title={form.title} />
					<p className={SECTION_CONTENT()}>{form.content}</p>
					{/* <WorksForm /> */}
				</main>
			</Section>
		</>
	);
}
type AppWorksLayoutProps = PropsWithChildren<{
	data: FunctionReturnType<typeof api.layouts.readWorks>;
	renderImage: (props: Images["Entity"] & { className: string }) => ReactNode;
	renderLink: (props: PropsWithChildren) => ReactNode;
}>;
