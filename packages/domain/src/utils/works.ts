import { formatISO, parseISO } from "date-fns";
import type { QueryCtx } from "../convex/schema";
import { mapFrom } from "../convex/utils";
import { readImageById, readImagesByIds } from "../functions/images";
import { readSetById, readSetsByIds } from "../functions/sets";
import type { Works } from "../schemas/works";
import { imageDraftFrom, imageFrom } from "./images";
import { setDraftFrom } from "./sets";

// CONST ***********************************************************************************************************************************
export const workCreateDefaultValues = {
	_id: "",
	date: "",
	height: "32",
	imageId: "",
	material: "",
	media: [],
	setId: "",
	slug: "",
	stripe: "",
	title: "",
	width: "24",
};

// DRAFT ***********************************************************************************************************************************
export function workDraftFrom(entry: Works["Entry"]): Works["Draft"] {
	return {
		...entry,
		date: parseISO(entry.date),
		image: entry.image ? imageDraftFrom(entry.image) : undefined,
		set: entry.set ? setDraftFrom(entry.set) : undefined,
	};
}

// ENTITY **********************************************************************************************************************************
export function workFrom({ _creationTime, date, image, imageId, set, ...rest }: Works["Entry"]): Works["Entity"] {
	if (!image) throw new Error("WORK_UNDEFINED_IMAGE");
	return { ...rest, date: parseISO(date), image: imageFrom(image) };
}

// ENTRY ***********************************************************************************************************************************
export async function workEntriesFrom(docs: Works["Doc"][], ctx: QueryCtx): Promise<Works["Entry"][]> {
	if (docs.length === 0) return [];
	const [images, sets] = await Promise.all([
		readImagesByIds(ctx, { _ids: [...new Set(docs.map(({ imageId }) => imageId))] }),
		readSetsByIds(ctx, { _ids: [...new Set(docs.map(({ setId }) => setId))] }),
	]);
	const imagesMap = mapFrom(images);
	const setsMap = mapFrom(sets);
	return docs.map((doc) => ({ ...doc, image: imagesMap.get(doc.imageId), set: setsMap.get(doc.setId) }));
}

export async function workEntryFrom(doc: Works["Doc"], ctx: QueryCtx): Promise<Works["Entry"]> {
	const [image, set] = await Promise.all([readImageById(ctx, { _id: doc.imageId }), readSetById(ctx, { _id: doc.setId })]);
	return { ...doc, image, set };
}

// STRING **********************************************************************************************************************************
export function workStringFrom({ slug }: Works["Draft"]): string {
	return slug;
}

// VALUES **********************************************************************************************************************************
export function workUpdateValuesFrom({
	_id,
	date,
	height,
	imageId,
	material,
	media,
	setId,
	stripe,
	title,
	width,
}: Works["Draft"]): Works["UpdateValuesI"] {
	return {
		_id,
		date: formatISO(date, { representation: "date" }),
		height: `${height}`,
		imageId,
		material,
		media,
		setId,
		stripe: stripe ?? "",
		title,
		width: `${width}`,
	};
}
