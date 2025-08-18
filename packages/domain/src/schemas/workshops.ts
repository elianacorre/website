import z from "zod";
import { zid } from "zod-convex";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";
import { zImage, zImageDraft, zImageEntry } from "./images";

// ENTRY ***********************************************************************************************************************************
export const zWorkshopFields = z.object({
	content: z.string(),
	duration: z.string(),
	imageId: zid("images"),
	place: z.string(),
	slug: z.string(),
	title: z.string(),
});
export const zWorkshopDoc = z.object({ ...zDocCommon("workshops").shape, ...zWorkshopFields.shape });
export const zWorkshopEntry = z.object({
	...zWorkshopDoc.shape,
	image: zImageEntry.optional(),
});

// REF *************************************************************************************************************************************
export const zWorkshopRef = zDocRef("workshops");
export const zWorkshopRefs = zDocRefs("workshops");
export const zWorkshopSlugRef = zWorkshopEntry.pick({ slug: true });

// DRAFT ***********************************************************************************************************************************
export const zWorkshopDraft = z.object({
	...zWorkshopEntry.shape,
	image: zImageDraft.optional(),
});

// ENTITY **********************************************************************************************************************************
export const zWorkshop = z.object({
	...zWorkshopDraft.omit({ _creationTime: true, imageId: true }).shape,
	image: zImage,
});

// VALUES **********************************************************************************************************************************
export const zWorkshopCreateValues = z.object({
	content: z.string().min(1),
	duration: z.string().min(1),
	imageId: z.string().min(1),
	place: z.string().min(1),
	title: z.string().min(1),
});

export const zWorkshopUpdateValues = z.object({
	...zWorkshopRef.shape,
	...zWorkshopCreateValues.shape,
});

// CRUD ************************************************************************************************************************************
export const zWorkshopCreate = zWorkshopFields.omit({ slug: true });
export const zWorkshopRemove = zWorkshopRef;
export const zWorkshopUpdate = z.object({
	...zWorkshopRef.shape,
	...zWorkshopCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Workshops = {
	Create: z.infer<typeof zWorkshopCreate>;
	CreateValuesI: z.input<typeof zWorkshopCreateValues>;
	CreateValues: z.infer<typeof zWorkshopCreateValues>;
	Doc: z.infer<typeof zWorkshopDoc>;
	Draft: z.infer<typeof zWorkshopDraft>;
	Entity: z.infer<typeof zWorkshop>;
	Entry: z.infer<typeof zWorkshopEntry>;
	Fields: z.infer<typeof zWorkshopFields>;
	Ref: z.infer<typeof zWorkshopRef>;
	Refs: z.infer<typeof zWorkshopRefs>;
	Remove: z.infer<typeof zWorkshopRemove>;
	Update: z.infer<typeof zWorkshopUpdate>;
	UpdateValuesI: z.input<typeof zWorkshopUpdateValues>;
	UpdateValues: z.infer<typeof zWorkshopUpdateValues>;
	UpsertValuesI: z.input<typeof zWorkshopCreateValues> | z.input<typeof zWorkshopUpdateValues>;
	UpsertValues: z.infer<typeof zWorkshopCreateValues> | z.infer<typeof zWorkshopUpdateValues>;
	ZCreate: typeof zWorkshopCreate;
	ZRemove: typeof zWorkshopRemove;
	ZUpdate: typeof zWorkshopUpdate;
};
