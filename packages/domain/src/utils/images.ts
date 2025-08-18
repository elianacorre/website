import type { QueryCtx } from "../convex/schema";
import type { Images } from "../schemas/images";

// CONST ***********************************************************************************************************************************
export const imageCreateDefaultValues = { _id: "", alt: "", file: undefined, height: "1080", slug: "", storageId: "", width: "1920" };

// DRAFT ***********************************************************************************************************************************
export function imageDraftFrom(entry: Images["Entry"]): Images["Draft"] {
	return entry;
}

// ENTITY **********************************************************************************************************************************
export function imageFrom({ alt, height, src, width }: Images["Entry"]): Images["Entity"] {
	if (!src) throw new Error("IMAGE_UNDEFINED_SRC");
	return { alt, height, src, width };
}

// ENTRY ***********************************************************************************************************************************
export async function imageEntryFrom(doc: Images["Doc"], ctx: QueryCtx): Promise<Images["Entry"]> {
	const src = await ctx.storage.getUrl(doc.storageId);
	return { ...doc, src: src ?? undefined };
}

// STRING **********************************************************************************************************************************
export function imageStringFrom({ slug }: Images["Draft"]): string {
	return slug;
}

// VALUES **********************************************************************************************************************************
export function imageUpdateValuesFrom({ _id, alt, height, slug, storageId, width }: Images["Draft"]): Images["UpdateValuesI"] {
	return { _id, alt, files: [], height: `${height}`, slug, storageId, width: `${width}` };
}
