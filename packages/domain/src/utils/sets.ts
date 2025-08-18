import type { QueryCtx } from "../convex/schema";
import { mapFrom } from "../convex/utils";
import { readImageById, readImagesByIds } from "../functions/images";
import type { Sets } from "../schemas/sets";
import { imageDraftFrom, imageFrom } from "./images";

// CONST ***********************************************************************************************************************************
export const setCreateDefaultValues = { _id: "", content: "", imageId: "", title: "" };

// DRAFT ***********************************************************************************************************************************
export function setDraftFrom(entry: Sets["Entry"]): Sets["Draft"] {
	return { ...entry, image: entry.image ? imageDraftFrom(entry.image) : undefined };
}

// ENTITY **********************************************************************************************************************************
export function setFrom({ _creationTime, image, imageId, ...rest }: Sets["Entry"]): Sets["Entity"] {
	if (!image) throw new Error("SET_UNDEFINED_IMAGE");
	return { ...rest, image: imageFrom(image) };
}

// ENTRIES *********************************************************************************************************************************
export async function setEntriesFrom(docs: Sets["Doc"][], ctx: QueryCtx): Promise<Sets["Entry"][]> {
	if (docs.length === 0) return [];
	const images = await readImagesByIds(ctx, { _ids: [...new Set(docs.map(({ imageId }) => imageId))] });
	const imagesMap = mapFrom(images);
	return docs.map((doc) => ({ ...doc, image: imagesMap.get(doc.imageId) }));
}

export async function setEntryFrom(doc: Sets["Doc"], ctx: QueryCtx): Promise<Sets["Entry"]> {
	const image = await readImageById(ctx, { _id: doc.imageId });
	return { ...doc, image };
}

// STRING **********************************************************************************************************************************
export function setStringFrom({ title }: Sets["Draft"]): string {
	return title;
}

// VALUES **********************************************************************************************************************************
export function setUpdateValuesFrom({ _id, content, imageId, title }: Sets["Draft"]): Sets["UpdateValuesI"] {
	return { _id, content, imageId, title };
}
