import { readImageBySlug, readImagesBySlugs } from "@ec/domain/functions/images";
import { readAllSets } from "@ec/domain/functions/sets";
import { imageFrom } from "@ec/domain/utils/images";
import { setFrom } from "@ec/domain/utils/sets";
import { ConvexError } from "convex/values";
import { query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readPublic = query({
	args: {},
	handler: async (ctx) => {
		const logoImg = await readImageBySlug(ctx, { slug: "logo" });
		if (!logoImg) throw new ConvexError("LAYOUTS_PUBLIC_IMG_NOT_FOUND");
		return { logoImg: imageFrom(logoImg) };
	},
});

export const readWorks = query({
	args: {},
	handler: async (ctx) => {
		const [[heroImg, formImg], sets] = await Promise.all([readImagesBySlugs(ctx, { slugs: ["la-reveuse", "mains-i"] }), readAllSets(ctx)]);
		if (!heroImg || !formImg) throw new ConvexError("LAYOUTS_WORKS_IMG_NOT_FOUND");
		return {
			form: {
				content: `Tu souhaites me proposer un projet ? Tu as une question sur mes formations ? Tu peux m’envoyer un message via ce formulaire. Je
						répondrais dans les plus brefs délais !`,
				image: imageFrom(formImg),
				title: ["Vous souhaitez", "passer commande ?"],
			},
			hero: {
				button: "Passer commande",
				content:
					"Vous retrouverez ici toutes les œuvres que j’ai réalisées. Si l’une d’entre elles résonne avec vous, n’hésitez pas à me contacter.",
				image: imageFrom(heroImg),
				title: ["Découvrez", "mes œuvres"],
			},
			sets: sets.map(setFrom),
		};
	},
});
