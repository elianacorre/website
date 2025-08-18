import { ButtonAnimated } from "../button-animated";
// import { EvervaultCard } from "@/components/ui/evervault-card";
import { SECTION_MAIN, Section, SectionTitle } from "../section";

// DATA ************************************************************************************************************************************
const services = [
	{
		title: "Cours",
		description:
			"Pour ceux qui n’ont pas des heures à consacrer à leur bien-être ou qui préfèrent se centrer sur pratique précise, je vous propose des cours hebdomadaires.",
	},
	{
		title: "Ateliers",
		description:
			"Pour ceux qui veulent s’offrir de véritables pauses bien-être dans leur semaine, je vous propose des ateliers mêlant art et yoga mensuel.",
	},
	{
		title: "Œuvres",
		description: "Pour ceux qui veulent acquérir une de mes œuvres ou qui souhaitent passer une commande personnalisée.",
	},
];

// ROOT ************************************************************************************************************************************
export function Services({ className }: ServicesProps) {
	return (
		<Section intent="secondary" className={{ BASE: className }}>
			<main className={SECTION_MAIN()}>
				<SectionTitle title={["Les services", "que je propose"]} intent="secondary" />
				<p>
					Entre mouvement et création, je vous invite à explorer un espace où le yoga, l’expression artistique et l’art s’entrelacent.
					Cours, ateliers et œuvres à découvrir ou à emporter.
				</p>
				<p>Créatif, esthète ou en quête de bien-être vous trouverez une formule qui résonne avec vous ici :</p>
				<ul className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
					{services.map((service) => (
						<li
							key={service.title}
							className="relative flex max-w-sm flex-1 flex-col items-center gap-4 rounded-2xl border-12 border-white bg-neutral-200 p-4 shadow-lg"
						>
							{/* <EvervaultCard text={service.title} /> */}
							<h2 className="mt-4 text-sm font-light text-black">{service.description}</h2>
							<ButtonAnimated className="flex-none">Découvrir</ButtonAnimated>
						</li>
					))}
				</ul>
			</main>
		</Section>
	);
}

// TYPE ************************************************************************************************************************************
export type ServicesProps = { className?: string };
