import type { QueryCtx } from "../convex/schema";
import { mapFrom } from "../convex/utils";
import { readAttendeeById, readAttendeesByIds } from "../functions/attendees";
import { readEventById, readEventsByIds } from "../functions/events";
import type { Subscriptions } from "../schemas/subscriptions";
import { attendeeDraftFrom, attendeeFrom } from "./attendees";
import { eventDraftFrom, eventFrom } from "./events";

// CONST ***********************************************************************************************************************************
export const subscriptionCreateDefaultValues = { _id: "", attendeeId: "", eventId: "", meal: false, seats: "1" };

// DRAFT ***********************************************************************************************************************************
export function subscriptionDraftFrom(entry: Subscriptions["Entry"]): Subscriptions["Draft"] {
	return {
		...entry,
		attendee: entry.attendee ? attendeeDraftFrom(entry.attendee) : undefined,
		event: entry.event ? eventDraftFrom(entry.event) : undefined,
	};
}

// ENTITY **********************************************************************************************************************************
export function subscriptionFrom({
	_creationTime,
	attendee,
	attendeeId,
	event,
	eventId,
	...rest
}: Subscriptions["Entry"]): Subscriptions["Entity"] {
	if (!attendee) throw new Error("SUBSCRIPTION_UNDEFINED_ATTENDEE");
	if (!event) throw new Error("SUBSCRIPTION_UNDEFINED_EVENT");
	return { ...rest, attendee: attendeeFrom(attendee), event: eventFrom(event) };
}

// ENTRY ***********************************************************************************************************************************
export async function subscriptionEntriesFrom(docs: Subscriptions["Doc"][], ctx: QueryCtx): Promise<Subscriptions["Entry"][]> {
	if (docs.length === 0) return [];
	const [attendees, events] = await Promise.all([
		readAttendeesByIds(ctx, { _ids: [...new Set(docs.map(({ attendeeId }) => attendeeId))] }),
		readEventsByIds(ctx, { _ids: [...new Set(docs.map(({ eventId }) => eventId))] }),
	]);
	const attendeesMap = mapFrom(attendees);
	const eventsMap = mapFrom(events);
	return docs.map((doc) => ({ ...doc, attendee: attendeesMap.get(doc.attendeeId), event: eventsMap.get(doc.eventId) }));
}

export async function subscriptionEntryFrom(doc: Subscriptions["Doc"], ctx: QueryCtx): Promise<Subscriptions["Entry"]> {
	const [attendee, event] = await Promise.all([readAttendeeById(ctx, { _id: doc.attendeeId }), readEventById(ctx, { _id: doc.eventId })]);
	return { ...doc, attendee, event };
}

// VALUES**********************************************************************************************************************************
export function subscriptionUpdateValuesFrom({
	_id,
	attendeeId,
	eventId,
	meal,
	seats,
}: Subscriptions["Draft"]): Subscriptions["UpdateValuesI"] {
	return { _id, attendeeId, eventId, meal, seats: `${seats}` };
}
