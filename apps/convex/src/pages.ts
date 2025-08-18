import { readImagesBySlugs } from "@ec/domain/functions/images";
import { readSetBySlug } from "@ec/domain/functions/sets";
import { readSetWorks } from "@ec/domain/functions/works";
import { readAllWorkshops } from "@ec/domain/functions/workshops";
import { zSetSlugRef } from "@ec/domain/schemas/sets";
import { imageFrom } from "@ec/domain/utils/images";
import { workshopFrom } from "@ec/domain/utils/workshops";
import { ConvexError } from "convex/values";
import { convexArgsFrom } from "zod-convex";
import { query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAbout = query({
	args: {},
	handler: async (ctx) => {
		const imgs = await readImagesBySlugs(ctx, { slugs: ["mon-parcours", "mes-inspirations-et-mes-techniques", "mon-message-au-monde"] });
		if (imgs.some((img) => !img)) throw new ConvexError("PAGES_ABOUT_IMG_NOT_FOUND");
		return [
			{
				img: imageFrom(imgs[0]!),
				slug: "decouvrez-mon-parcours",
				title: ["Découvrez", "mon parcours"],
				content: `Je grandis à l’île de la Réunion, en quête de sens et un peu désoeuvrée face à un monde que j'ai du mal à comprendre, je me
						réfugie dans le dessin à 10 ans. En grandissant, je m’égare sur d’autres voies, questionnant toujours la vie et cherchant un
						sens à cette drôle d’expérience. Je délaisse quelque peu le dessin, occupée à grandir, à me chercher, mais je me sens toujours
						liée à l'art. C’est en 2021 que je renoue définitivement avec les pinceaux, après des années à errer sur les sentiers du doute
						et les montagnes de la peur. Je me jette à corps perdu dans l’art grâce au Milan Art Institute et décide de me faire confiance.
						Je perfectionne mes techniques et trouve petit à petit ma voix, ma lumière. Je comprends alors qu’il est temps de me libérer des
						cases et des freins que je m'étais mis et de vivre totalement mon authenticité.`,
			},
			{
				img: imageFrom(imgs[1]!),
				slug: "mes-inspirations-et-mes-techniques",
				title: ["Mes inspirations", "et techniques"],
				content: `Je peins les énergies que je croise. Je m’inspire de mes rêves, de mon quotidien et de mes sensations. Parfois, une oeuvre
						émerge et le message n'apparaît qu’après. Mon processus de création est minutieux. J'aime combiner les médiums et chaque
						création est unique, à l’image de la nature humaine que je souhaite mettre en lumière. Aujourd'hui, j'ai accepté ma singularité
						et je chemine librement sur les routes de la Vie, en acceptant de me laisser surprendre à tout instant.`,
			},
			{
				img: imageFrom(imgs[2]!),
				slug: "mon-message-au-monde",
				title: ["Mon message", "au monde"],
				content: `Je crois fermement en l’unicité de chaque être et à la nécessité de s’accepter pour pouvoir vivre sa propre aventure. Mon art
						aspire à rappeler aux autres la beauté qu’ils ont en eux, à l’aimer et à la chérir pour qu’ils retrouvent et expriment à leur
						tour leur vraie nature.`,
			},
		];
	},
});

export const readIndex = query({
	args: {},
	handler: async (ctx) => {
		const [heroImg, formImg] = await readImagesBySlugs(ctx, { slugs: ["mes-inspirations-et-mes-techniques", "beaute-i"] });
		if (!heroImg || !formImg) throw new ConvexError("PAGES_WORKS_IMG_NOT_FOUND");
		return {
			contact: {
				content: `N’hésitez pas à m’écrire pour tout complément d’information. Je répondrai dans les plus brefs délais.`,
				image: imageFrom(formImg),
				title: ["Vous souhaitez", "me contacter ?"],
			},
			hero: {
				button: "Me contacter",
				content: `Je vous aide à retrouver le calme intérieur et à exprimer votre créativité sans jugement à travers l’art et le yoga.`,
				image: imageFrom(heroImg),
				title: ["Bienvenue!", "Je suis Eliana"],
			},
			quote: {
				author: `Wayne Dyer`,
				sentence: `" Don’t die with your song still inside you"`,
			},
			services: {
				items: [
					{
						title: "Cours",
						content:
							"Pour ceux qui n’ont pas des heures à consacrer à leur bien-être ou qui préfèrent se centrer sur pratique précise, je vous propose des cours hebdomadaires.",
					},
					{
						title: "Ateliers",
						content:
							"Pour ceux qui veulent s’offrir de véritables pauses bien-être dans leur semaine, je vous propose des ateliers mêlant art et yoga mensuel.",
					},
					{
						title: "Œuvres",
						content: "Pour ceux qui veulent acquérir une de mes œuvres ou qui souhaitent passer une commande personnalisée.",
					},
				],
				title: ["Les services", "que je propose"],
			},
		};
	},
});

export const readWorksSet = query({
	args: convexArgsFrom(zSetSlugRef),
	handler: async (ctx, { slug }) => {
		const set = await readSetBySlug(ctx, { slug });
		if (!set) throw new ConvexError("PAGES_SET_WORKS_SET_NOT_FOUND");
		return readSetWorks(ctx, { _id: set._id });
	},
});

export const readWorkshops = query({
	args: {},
	handler: async (ctx) => {
		const [[heroImg, formImg], workshops] = await Promise.all([
			readImagesBySlugs(ctx, { slugs: ["la-reveuse", "mains-i"] }),
			readAllWorkshops(ctx),
		]);
		if (!heroImg || !formImg) throw new ConvexError("PAGES_WORKSHOPS_IMG_NOT_FOUND");
		return {
			form: {
				content:
					"Tu souhaites me proposer un projet ? Tu as une question sur mes formations ? Tu peux m’envoyer un message via ce formulaire. Je répondrai dans les plus brefs délais !",
				image: imageFrom(formImg),
				title: ["Vous êtes", "intéressé.e ?"],
			},
			hero: {
				button: "Réserver ma place",
				content:
					"Les ateliers que je propose s'adressent aux personnes qui souhaitent retrouver un bien-être global. Chaque atelier yog’art est construit autour d’une thématique et se compose d’un cours de yoga et d’un ou plusieurs exercices inspirés de l’art thérapie (dessin, peinture, danse, écriture…). Pour plus d’informations, n'hésitez pas à me contacter. Voici une présentation de chacun des ateliers :",
				image: imageFrom(heroImg),
				title: ["Les ateliers", "Art & Yoga"],
			},
			workshops: workshops.map(workshopFrom),
		};
	},
});
