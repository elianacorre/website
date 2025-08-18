import { format, formatISO, parseISO } from "date-fns";
import type { QueryCtx } from "../convex/schema";
import { mapFrom } from "../convex/utils";
import { readWorkshopById, readWorkshopsByIds } from "../functions/workshops";
import type { Events } from "../schemas/events";
import { workshopDraftFrom, workshopFrom, workshopStringFrom } from "./workshops";

// CONST ***********************************************************************************************************************************
export const eventCreateDefaultValues = { _id: "", date: "", seats: "8", workshopId: "" };

// DRAFT ***********************************************************************************************************************************
export function eventDraftFrom(entry: Events["Entry"]): Events["Draft"] {
	return { ...entry, date: parseISO(entry.date), workshop: entry.workshop ? workshopDraftFrom(entry.workshop) : undefined };
}

// ENTITY **********************************************************************************************************************************
export function eventFrom({ _creationTime, date, workshop, workshopId, ...rest }: Events["Entry"]): Events["Entity"] {
	if (!workshop) throw new Error("EVENT_UNDEFINED_WORKSHOP");
	return { ...rest, date: parseISO(date), workshop: workshopFrom(workshop) };
}

// ENTRY ***********************************************************************************************************************************
export async function eventEntriesFrom(docs: Events["Doc"][], ctx: QueryCtx): Promise<Events["Entry"][]> {
	if (docs.length === 0) return [];
	const workshops = await readWorkshopsByIds(ctx, { _ids: [...new Set(docs.map(({ workshopId }) => workshopId))] });
	const workshopsMap = mapFrom(workshops);
	return docs.map((doc) => ({ ...doc, workshop: workshopsMap.get(doc.workshopId) }));
}

export async function eventEntryFrom(doc: Events["Doc"], ctx: QueryCtx): Promise<Events["Entry"]> {
	const workshop = await readWorkshopById(ctx, { _id: doc.workshopId });
	return { ...doc, workshop };
}

// STRING **********************************************************************************************************************************
export function eventStringFrom({ date, workshop }: Events["Draft"]): string {
	return `${eventWorkshopStringFrom(workshop)} - ${eventDateStringFrom(date)}`;
}

export function eventDateStringFrom(date: Events["Draft"]["date"]): string {
	return format(date, "dd/MM/yyyy");
}

export function eventWorkshopStringFrom(workshop: Events["Draft"]["workshop"]): string {
	return workshop ? workshopStringFrom(workshop) : "Atelier inconnu";
}

// VALUES **********************************************************************************************************************************
export function eventUpdateValuesFrom({ _id, date, seats, workshopId }: Events["Draft"]): Events["UpdateValuesI"] {
	return { _id, date: formatISO(date, { representation: "date" }), seats: `${seats}`, workshopId };
}
