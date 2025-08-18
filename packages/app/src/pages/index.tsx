import type { api } from "@ec/convex/api";
import { ButtonAnimated } from "@ec/ui/components/web/button-animated";
import { GridBackground } from "@ec/ui/components/web/grid-background";
import { HERO, Hero as UiHero } from "@ec/ui/components/web/hero";
import { SECTION_CONTENT, SECTION_IMAGE, SECTION_MAIN, Section, SectionImage, SectionTitle } from "@ec/ui/components/web/section";
import type { RenderImage } from "@ec/ui/lib/utils";
import type { FunctionReturnType } from "convex/server";
import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { AppIndexForm } from "./index.form";

// ROOT ************************************************************************************************************************************
export function AppIndexPage({ data, renderImage, heroButton }: AppIndexPageProps) {
	return (
		<>
			<Hero data={data.hero} renderImage={renderImage} heroButton={heroButton} />
			<Services data={data.services} className="lg:-mt-20" />
			<Quote data={data.quote} />
			<Contact data={data.contact} renderImage={renderImage} />
		</>
	);
}
export type AppIndexPageProps = {
	data: FunctionReturnType<typeof api.pages.readIndex>;
	heroButton: ReactNode;
	renderImage: RenderImage;
};

// HERO ************************************************************************************************************************************
function Hero({ data: { content, image, title }, heroButton, renderImage }: HeroProps) {
	return (
		<UiHero button={heroButton} image={renderImage({ ...image, className: HERO().IMG() })} title={title} className={{ ASIDE: "flex" }}>
			{content}
		</UiHero>
	);
}
type HeroProps = {
	data: AppIndexPageProps["data"]["hero"];
	heroButton: AppIndexPageProps["heroButton"];
	renderImage: AppIndexPageProps["renderImage"];
};

// SERVICES ********************************************************************************************************************************
export function Services({ className, data: { items, title } }: ServicesProps) {
	return (
		<Section intent="secondary" className={{ BASE: className }}>
			<main className={SECTION_MAIN()}>
				<SectionTitle title={title} intent="secondary" />
				<p>
					Entre mouvement et création, je vous invite à explorer un espace où le yoga, l’expression artistique et l’art s’entrelacent.
					Cours, ateliers et œuvres à découvrir ou à emporter.
				</p>
				<p>Créatif, esthète ou en quête de bien-être vous trouverez une formule qui résonne avec vous ici :</p>
				<ul className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
					{items.map(({ content, title }) => (
						<li
							key={title}
							className="relative flex max-w-sm flex-1 flex-col items-center gap-4 rounded-2xl border-12 border-white bg-neutral-200 p-4 shadow-lg"
						>
							{/* <EvervaultCard text={service.title} /> */}
							<h2 className="mt-4 text-sm font-light text-black">{content}</h2>
							<ButtonAnimated className="flex-none">Découvrir</ButtonAnimated>
						</li>
					))}
				</ul>
			</main>
		</Section>
	);
}
type ServicesProps = { className: string; data: AppIndexPageProps["data"]["services"] };

// QUOTE **********************************************************************************************************************************
const QUOTE = tv({
	slots: {
		AUTHOR: `text-lg font-black text-neutral-500
    sm:text-xl
    md:text-2xl
    2xl:text-3xl`,
		BASE: `relative px-4 py-8
    sm:px-8
    md:py-20`,
		CONTENT: `relative flex flex-col items-center gap-4
    sm:gap-8`,
		SENTENCE: `font-heading font-black text-3xl text-center
    sm:text-5xl
    md:text-6xl
    2xl:text-7xl`,
	},
});

function Quote({ data: { author, sentence } }: QuoteProps) {
	const { BASE, CONTENT, SENTENCE, AUTHOR } = QUOTE();
	return (
		<section className={BASE()}>
			<GridBackground />
			<div className={CONTENT()}>
				<h3 className={SENTENCE()}>{sentence}</h3>
				<h4 className={AUTHOR()}>{author}</h4>
			</div>
		</section>
	);
}
type QuoteProps = { data: AppIndexPageProps["data"]["quote"] };

// CONTACT *********************************************************************************************************************************
export function Contact({ data: { content, image, title }, renderImage }: ContactProps) {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: hash
		<Section id="contact" intent="primary">
			<SectionImage reverse>{renderImage({ ...image, className: SECTION_IMAGE().IMG() })}</SectionImage>
			<main className={SECTION_MAIN()}>
				<SectionTitle title={title} />
				<p className={SECTION_CONTENT()}>{content}</p>
				<AppIndexForm />
			</main>
		</Section>
	);
}
type ContactProps = { data: AppIndexPageProps["data"]["contact"]; renderImage: AppIndexPageProps["renderImage"] };
