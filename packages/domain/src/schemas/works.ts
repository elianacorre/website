import { z } from "zod";
import { zid } from "zod-convex";
import type works from "../content/works.json";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";
import { zImage, zImageDraft, zImageEntry } from "./images";
import { zSetDraft, zSetEntry } from "./sets";

// CONSTS **********************************************************************************************************************************
export const materials = ["paper", "canvas"] as const;
export const medias = ["acrylic", "ink", "mixedMedia", "oil", "watercolor"] as const;

export const zWorkMaterial = z.enum(materials);
export const zWorkMedia = z.enum(medias);

// ENTRY ***********************************************************************************************************************************
export const zWorkFields = z.object({
	date: z.iso.date(),
	height: z.int(),
	imageId: zid("images"),
	material: zWorkMaterial,
	media: zWorkMedia.array(),
	setId: zid("sets"),
	slug: z.string(),
	stripe: z.url().optional(),
	title: z.string(),
	width: z.int(),
});
export const zWorkDoc = z.object({ ...zDocCommon("works").shape, ...zWorkFields.shape });
export const zWorkEntry = z.object({
	...zWorkDoc.shape,
	image: zImageEntry.optional(),
	set: zSetEntry.optional(),
});

// REF *************************************************************************************************************************************
export const zWorkRef = zDocRef("works");
export const zWorkRefs = zDocRefs("works");

// DRAFT ***********************************************************************************************************************************
export const zWorkDraft = z.object({
	...zWorkEntry.shape,
	date: z.date(),
	image: zImageDraft.optional(),
	set: zSetDraft.optional(),
});

// ENTRY ***********************************************************************************************************************************
export const zWork = z.object({
	...zWorkDraft.omit({ _creationTime: true, imageId: true, set: true }).shape,
	image: zImage,
});

// VALUES **********************************************************************************************************************************
export const zWorkCreateValues = z.object({
	...zWorkFields.omit({ slug: true }).shape,
	height: z.coerce.number<string>().int().min(1),
	imageId: z.string().min(1),
	material: z.string().min(1),
	media: zWorkMedia.array().min(1),
	setId: z.string().min(1),
	stripe: z.string().transform((v) => (v === "" ? undefined : v)),
	title: z.string().min(1),
	width: z.coerce.number<string>().int().min(1),
});

export const zWorkUpdateValues = z.object({
	...zWorkRef.shape,
	...zWorkCreateValues.shape,
});

// CRUD ************************************************************************************************************************************
export const zWorkCreate = zWorkFields.omit({ slug: true });
export const zWorkRemove = zWorkRef;
export const zWorkUpdate = z.object({
	...zWorkRef.shape,
	...zWorkCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Works = {
	Create: z.infer<typeof zWorkCreate>;
	CreateValuesI: z.input<typeof zWorkCreateValues>;
	CreateValues: z.infer<typeof zWorkCreateValues>;
	Doc: z.infer<typeof zWorkDoc>;
	Draft: z.infer<typeof zWorkDraft>;
	Entity: z.infer<typeof zWork>;
	Entry: z.infer<typeof zWorkEntry>;
	Fields: z.infer<typeof zWorkFields>;
	Json: (typeof works)[number];
	Material: z.infer<typeof zWorkMaterial>;
	Media: z.infer<typeof zWorkMedia>;
	Ref: z.infer<typeof zWorkRef>;
	Refs: z.infer<typeof zWorkRefs>;
	Remove: z.infer<typeof zWorkRemove>;
	Update: z.infer<typeof zWorkUpdate>;
	UpdateValuesI: z.input<typeof zWorkUpdateValues>;
	UpdateValues: z.infer<typeof zWorkUpdateValues>;
	UpsertValuesI: z.input<typeof zWorkCreateValues> | z.input<typeof zWorkUpdateValues>;
	UpsertValues: z.infer<typeof zWorkCreateValues> | z.infer<typeof zWorkUpdateValues>;
	ZCreate: typeof zWorkCreate;
	ZRemove: typeof zWorkRemove;
	ZUpdate: typeof zWorkUpdate;
};
