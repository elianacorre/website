import { mapFrom, type QueryCtx } from "../convex";
import { readImagesByIds } from "../functions";
import type { Workshops } from "../schemas/workshops";
import { imageDraftFrom, imageFrom } from "./images";

// CONST ***********************************************************************************************************************************
export const workshopCreateDefaultValues = { _id: "", content: "", duration: "", imageId: "", place: "", title: "" };

// DRAFT ***********************************************************************************************************************************
export function workshopDraftFrom(entry: Workshops["Entry"]): Workshops["Draft"] {
	return { ...entry, image: entry.image ? imageDraftFrom(entry.image) : undefined };
}

// ENTITY **********************************************************************************************************************************
export function workshopFrom({ _creationTime, image, imageId, ...rest }: Workshops["Entry"]): Workshops["Entity"] {
	if (!image) throw new Error("WORKSHOP_UNDEFINED_IMAGE");
	return { ...rest, image: imageFrom(image) };
}

// ENTRY ***********************************************************************************************************************************
export async function workshopEntriesFrom(docs: Workshops["Doc"][], ctx: QueryCtx): Promise<Workshops["Entry"][]> {
	if (docs.length === 0) return [];
	const images = await readImagesByIds(ctx, { _ids: [...new Set(docs.map(({ imageId }) => imageId))] });
	const imagesMap = mapFrom(images);
	return docs.map((doc) => ({ ...doc, image: imagesMap.get(doc.imageId) }));
}

export function workshopEntryFrom(doc: Workshops["Doc"]): Workshops["Entry"] {
	return doc;
}

// STRING **********************************************************************************************************************************
export function workshopStringFrom({ title }: Workshops["Draft"]): string {
	return title;
}

// VALUES **********************************************************************************************************************************
export function workshopUpdateValuesFrom({
	_id,
	content,
	duration,
	imageId,
	place,
	title,
}: Workshops["Draft"]): Workshops["UpdateValuesI"] {
	return { _id, content, duration, imageId, place, title };
}
