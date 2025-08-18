import z from "zod";
import { zid } from "zod-convex";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";

// ENTRY ***********************************************************************************************************************************
export const zImageFields = z.object({
	alt: z.string(),
	height: z.int().min(1),
	storageId: zid("_storage"),
	slug: z.string(),
	width: z.int().min(1),
});
export const zImageDoc = z.object({ ...zDocCommon("images").shape, ...zImageFields.shape });
export const zImageEntry = z.object({ ...zImageDoc.shape, src: z.string().optional() });

// REF *************************************************************************************************************************************
export const zImageRef = zDocRef("images");
export const zImageRefs = zDocRefs("images");
export const zImageSlugRef = zImageEntry.pick({ slug: true });
export const zImageSlugRefs = z.object({ slugs: zImageEntry.shape.slug.array() });

// DRAFT ***********************************************************************************************************************************
export const zImageDraft = zImageEntry;

// ENTITY **********************************************************************************************************************************
export const zImage = z.object({ ...zImageDraft.pick({ alt: true, height: true, width: true }).shape, src: z.string() });

// VALUES **********************************************************************************************************************************
export const zImageCreateValues = z.object({
	alt: z.string().min(1),
	files: z.file().array().min(1).max(1),
	height: z.coerce.number<string>().int().min(1),
	slug: z.string().min(1),
	width: z.coerce.number<string>().int().min(1),
});

export const zImageUpdateValues = z.object({
	...zImageCreateValues.shape,
	...zImageEntry.pick({ _id: true, storageId: true }).shape,
	files: z.file().array().min(0).max(1),
});

// CRUD ************************************************************************************************************************************
export const zImageCreate = zImageFields;
export const zImageRemove = zImageEntry.pick({ _id: true, storageId: true });
export const zImageUpdate = z.object({
	...zImageRef.shape,
	...zImageCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Images = {
	Create: z.infer<typeof zImageCreate>;
	CreateValuesI: z.input<typeof zImageCreateValues>;
	CreateValues: z.infer<typeof zImageCreateValues>;
	Doc: z.infer<typeof zImageDoc>;
	Draft: z.infer<typeof zImageDraft>;
	Entity: z.infer<typeof zImage>;
	Entry: z.infer<typeof zImageEntry>;
	Fields: z.infer<typeof zImageFields>;
	Ref: z.infer<typeof zImageRef>;
	Refs: z.infer<typeof zImageRefs>;
	Remove: z.infer<typeof zImageRemove>;
	SlugRef: z.infer<typeof zImageSlugRef>;
	SlugRefs: z.infer<typeof zImageSlugRefs>;
	Update: z.infer<typeof zImageUpdate>;
	UpdateValuesI: z.input<typeof zImageUpdateValues>;
	UpdateValues: z.infer<typeof zImageUpdateValues>;
	UpsertValuesI: z.input<typeof zImageCreateValues> | z.input<typeof zImageUpdateValues>;
	UpsertValues: z.infer<typeof zImageCreateValues> | z.infer<typeof zImageUpdateValues>;
	ZCreate: typeof zImageCreate;
	ZRemove: typeof zImageRemove;
	ZUpdate: typeof zImageUpdate;
};
