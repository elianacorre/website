import z from "zod";
import { zid } from "zod-convex";
import { zDocCommon, zDocRef, zDocRefs } from "../convex/schemas";
import { zAttendee, zAttendeeDraft, zAttendeeEntry } from "./attendees";
import { zEvent, zEventDraft, zEventEntry } from "./events";

// ENTRY ***********************************************************************************************************************************
export const zSubscriptionFields = z.object({
	attendeeId: zid("attendees"),
	eventId: zid("events"),
	meal: z.boolean(),
	seats: z.int(),
});
export const zSubscriptionDoc = z.object({ ...zDocCommon("subscriptions").shape, ...zSubscriptionFields.shape });
export const zSubscriptionEntry = z.object({
	...zSubscriptionDoc.shape,
	attendee: zAttendeeEntry.optional(),
	event: zEventEntry.optional(),
});

// REF *************************************************************************************************************************************
export const zSubscriptionRef = zDocRef("subscriptions");
export const zSubscriptionRefs = zDocRefs("subscriptions");

// DRAFT ***********************************************************************************************************************************
export const zSubscriptionDraft = z.object({
	...zSubscriptionEntry.shape,
	attendee: zAttendeeDraft.optional(),
	event: zEventDraft.optional(),
});

// ENTITY **********************************************************************************************************************************
export const zSubscription = z.object({
	...zSubscriptionDraft.omit({ _creationTime: true, attendeeId: true, eventId: true }).shape,
	attendee: zAttendee,
	event: zEvent,
});

// VALUES **********************************************************************************************************************************
export const zSubscriptionCreateValues = z.object({
	...zSubscriptionFields.shape,
	attendeeId: z.string().min(1),
	eventId: z.string().min(1),
	seats: z.coerce.number<string>().int().min(1),
});

export const zSubscriptionUpdateValues = z.object({
	...zSubscriptionRef.shape,
	...zSubscriptionCreateValues.shape,
});

// CRUD ************************************************************************************************************************************
export const zSubscriptionCreate = zSubscriptionFields;
export const zSubscriptionRemove = zSubscriptionRef;
export const zSubscriptionUpdate = z.object({
	...zSubscriptionRef.shape,
	...zSubscriptionCreate.partial().shape,
});

// TYPES ***********************************************************************************************************************************
export type Subscriptions = {
	Create: z.infer<typeof zSubscriptionCreate>;
	CreateValuesI: z.input<typeof zSubscriptionCreateValues>;
	CreateValues: z.infer<typeof zSubscriptionCreateValues>;
	Doc: z.infer<typeof zSubscriptionDoc>;
	Draft: z.infer<typeof zSubscriptionDraft>;
	Entity: z.infer<typeof zSubscription>;
	Entry: z.infer<typeof zSubscriptionEntry>;
	Fields: z.infer<typeof zSubscriptionFields>;
	Ref: z.infer<typeof zSubscriptionRef>;
	Refs: z.infer<typeof zSubscriptionRefs>;
	Remove: z.infer<typeof zSubscriptionRemove>;
	Update: z.infer<typeof zSubscriptionUpdate>;
	UpdateValuesI: z.input<typeof zSubscriptionUpdateValues>;
	UpdateValues: z.infer<typeof zSubscriptionUpdateValues>;
	UpsertValuesI: z.input<typeof zSubscriptionCreateValues> | z.input<typeof zSubscriptionUpdateValues>;
	UpsertValues: z.infer<typeof zSubscriptionCreateValues> | z.infer<typeof zSubscriptionUpdateValues>;
	ZCreate: typeof zSubscriptionCreate;
	ZRemove: typeof zSubscriptionRemove;
	ZUpdate: typeof zSubscriptionUpdate;
};
