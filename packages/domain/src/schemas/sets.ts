import { z } from "zod";
import { zid } from "zod-convex";
import type sets from "../content/sets.json";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";
import { zImage, zImageDraft, zImageEntry } from "./images";

// ENTRY ***********************************************************************************************************************************
export const zSetFields = z.object({
	content: z.string(),
	imageId: zid("images"),
	slug: z.string(),
	title: z.string(),
});
export const zSetDoc = z.object({ ...zDocCommon("sets").shape, ...zSetFields.shape });
export const zSetEntry = z.object({
	...zSetDoc.shape,
	image: zImageEntry.optional(),
});

// REF *************************************************************************************************************************************
export const zSetRef = zDocRef("sets");
export const zSetRefs = zDocRefs("sets");
export const zSetSlugRef = zSetEntry.pick({ slug: true });

// DRAFT ***********************************************************************************************************************************
export const zSetDraft = z.object({
	...zSetEntry.shape,
	image: zImageDraft.optional(),
});

// ENTITY **********************************************************************************************************************************
export const zSet = z.object({
	...zSetDraft.omit({ _creationTime: true, imageId: true }).shape,
	image: zImage,
});

// VALUES **********************************************************************************************************************************
export const zSetCreateValues = z.object({
	content: z.string().min(1),
	imageId: z.string().min(1),
	title: z.string().min(1),
});

export const zSetUpdateValues = z.object({
	...zSetRef.shape,
	...zSetCreateValues.shape,
});

// CRUD ***********************************************************************************************************************************
export const zSetCreate = zSetFields.omit({ slug: true });
export const zSetRemove = zSetRef;
export const zSetUpdate = z.object({
	...zSetRef.shape,
	...zSetCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Sets = {
	Create: z.infer<typeof zSetCreate>;
	CreateValuesI: z.input<typeof zSetCreateValues>;
	CreateValues: z.infer<typeof zSetCreateValues>;
	Doc: z.infer<typeof zSetDoc>;
	Draft: z.infer<typeof zSetDraft>;
	Entity: z.infer<typeof zSet>;
	Entry: z.infer<typeof zSetEntry>;
	Fields: z.infer<typeof zSetFields>;
	Json: (typeof sets)[number];
	Ref: z.infer<typeof zSetRef>;
	Refs: z.infer<typeof zSetRefs>;
	Remove: z.infer<typeof zSetRemove>;
	Update: z.infer<typeof zSetUpdate>;
	UpdateValuesI: z.input<typeof zSetUpdateValues>;
	UpdateValues: z.infer<typeof zSetUpdateValues>;
	UpsertValuesI: z.input<typeof zSetCreateValues> | z.input<typeof zSetUpdateValues>;
	UpsertValues: z.infer<typeof zSetCreateValues> | z.infer<typeof zSetUpdateValues>;
	ZCreate: typeof zSetCreate;
	ZRemove: typeof zSetRemove;
	ZUpdate: typeof zSetUpdate;
};
