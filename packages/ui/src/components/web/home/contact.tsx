import type { ReactNode } from "react";
import { SECTION_CONTENT, SECTION_MAIN, Section, SectionImage, SectionTitle } from "../section";

// ROOT ************************************************************************************************************************************
export function Contact({ className, form, image }: ContactProps) {
	return (
		<Section id="contact" intent="primary" className={{ BASE: className }}>
			<SectionImage reverse>{image}</SectionImage>
			<main className={SECTION_MAIN()}>
				<SectionTitle title={["Vous souhaitez", "me contacter ?"]} />
				<p className={SECTION_CONTENT()}>
					N’hésitez pas à m’écrire pour tout complément d’information. Je répondrai dans les plus brefs délais.
				</p>
				{form}
			</main>
		</Section>
	);
}

// TYPE ************************************************************************************************************************************
export type ContactProps = { form: ReactNode; image: ReactNode; className?: string };
