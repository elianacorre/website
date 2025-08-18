import { z } from "zod";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";

// ENTRY ***********************************************************************************************************************************
export const zAttendeeFields = z.object({
	email: z.email(),
	firstName: z.string(),
	lastName: z.string(),
});
export const zAttendeeDoc = z.object({ ...zDocCommon("attendees").shape, ...zAttendeeFields.shape });
export const zAttendeeEntry = zAttendeeDoc;

// REF *************************************************************************************************************************************
export const zAttendeeRef = zDocRef("attendees");
export const zAttendeeRefs = zDocRefs("attendees");

// DRAFT ***********************************************************************************************************************************
export const zAttendeeDraft = zAttendeeEntry;

// ENTITY **********************************************************************************************************************************
export const zAttendee = zAttendeeDraft.omit({ _creationTime: true });

// VALUES **********************************************************************************************************************************
export const zAttendeeCreateValues = z.object({
	...zAttendeeFields.shape,
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export const zAttendeeUpdateValues = z.object({
	...zAttendeeRef.shape,
	...zAttendeeCreateValues.shape,
});

// CRUD ************************************************************************************************************************************
export const zAttendeeCreate = zAttendeeFields;
export const zAttendeeRemove = zAttendeeRef;
export const zAttendeeUpdate = z.object({
	...zAttendeeRef.shape,
	...zAttendeeCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Attendees = {
	Create: z.infer<typeof zAttendeeCreate>;
	CreateValuesI: z.input<typeof zAttendeeCreateValues>;
	CreateValues: z.infer<typeof zAttendeeCreateValues>;
	Doc: z.infer<typeof zAttendeeDoc>;
	Draft: z.infer<typeof zAttendeeDraft>;
	Entity: z.infer<typeof zAttendee>;
	Entry: z.infer<typeof zAttendeeEntry>;
	Fields: z.infer<typeof zAttendeeFields>;
	Ref: z.infer<typeof zAttendeeRef>;
	Refs: z.infer<typeof zAttendeeRefs>;
	Remove: z.infer<typeof zAttendeeRemove>;
	Update: z.infer<typeof zAttendeeUpdate>;
	UpdateValuesI: z.input<typeof zAttendeeUpdateValues>;
	UpdateValues: z.infer<typeof zAttendeeUpdateValues>;
	UpsertValuesI: z.input<typeof zAttendeeCreateValues> | z.input<typeof zAttendeeUpdateValues>;
	UpsertValues: z.infer<typeof zAttendeeCreateValues> | z.infer<typeof zAttendeeUpdateValues>;
	ZCreate: typeof zAttendeeCreate;
	ZRemove: typeof zAttendeeRemove;
	ZUpdate: typeof zAttendeeUpdate;
};
