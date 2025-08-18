import z from "zod";
import { zid } from "zod-convex";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";
import { zWorkshop, zWorkshopDraft, zWorkshopEntry } from "./workshops";

// ENTRY ***********************************************************************************************************************************
export const zEventFields = z.object({
	date: z.iso.date(),
	seats: z.int().min(1),
	workshopId: zid("workshops"),
});

export const zEventDoc = z.object({ ...zDocCommon("events").shape, ...zEventFields.shape });

export const zEventEntry = z.object({
	...zEventDoc.shape,
	workshop: zWorkshopEntry.optional(),
});

// REF *************************************************************************************************************************************
export const zEventRef = zDocRef("events");
export const zEventRefs = zDocRefs("events");

// DRAFT ***********************************************************************************************************************************
export const zEventDraft = z.object({
	...zEventEntry.shape,
	date: z.date(),
	workshop: zWorkshopDraft.optional(),
});

// ENTITY **********************************************************************************************************************************
export const zEvent = z.object({
	...zEventDraft.omit({ _creationTime: true, workshopId: true }).shape,
	workshop: zWorkshop,
});

// VALUES **********************************************************************************************************************************
export const zEventCreateValues = z.object({
	...zEventFields.shape,
	seats: z.coerce.number<string>().int().min(1),
	workshopId: z.string().min(1),
});

export const zEventUpdateValues = z.object({
	...zEventRef.shape,
	...zEventCreateValues.shape,
});

// CRUD ************************************************************************************************************************************
export const zEventCreate = zEventFields;
export const zEventRemove = zEventRef;
export const zEventUpdate = z.object({
	...zEventRef.shape,
	...zEventCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Events = {
	Create: z.infer<typeof zEventCreate>;
	CreateValuesI: z.input<typeof zEventCreateValues>;
	CreateValues: z.infer<typeof zEventCreateValues>;
	Doc: z.infer<typeof zEventDoc>;
	Draft: z.infer<typeof zEventDraft>;
	Entity: z.infer<typeof zEvent>;
	Entry: z.infer<typeof zEventEntry>;
	Fields: z.infer<typeof zEventFields>;
	Ref: z.infer<typeof zEventRef>;
	Refs: z.infer<typeof zEventRefs>;
	Remove: z.infer<typeof zEventRemove>;
	Update: z.infer<typeof zEventUpdate>;
	UpdateValuesI: z.input<typeof zEventUpdateValues>;
	UpdateValues: z.infer<typeof zEventUpdateValues>;
	UpsertValuesI: z.input<typeof zEventCreateValues> | z.input<typeof zEventUpdateValues>;
	UpsertValues: z.infer<typeof zEventCreateValues> | z.infer<typeof zEventUpdateValues>;
	ZCreate: typeof zEventCreate;
	ZRemove: typeof zEventRemove;
	ZUpdate: typeof zEventUpdate;
};
