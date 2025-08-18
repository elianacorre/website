import type { Attendees } from "../schemas/attendees";

// CONST ***********************************************************************************************************************************
export const attendeeCreateDefaultValues = { _id: "", email: "", firstName: "", lastName: "" };

// DRAFT ***********************************************************************************************************************************
export function attendeeDraftFrom(entry: Attendees["Entry"]): Attendees["Draft"] {
	return entry;
}

// ENTITY **********************************************************************************************************************************
export function attendeeFrom({ _creationTime, ...rest }: Attendees["Entry"]): Attendees["Entity"] {
	return rest;
}

// ENTRY ***********************************************************************************************************************************
export function attendeeEntryFrom(doc: Attendees["Doc"]): Attendees["Entry"] {
	return doc;
}

// STRING **********************************************************************************************************************************
export function attendeeStringFrom({ firstName, lastName }: Attendees["Draft"]): string {
	return `${firstName} ${lastName}`;
}

// VALUES **********************************************************************************************************************************
export function attendeeUpdateValuesFrom({ _id, email, firstName, lastName }: Attendees["Draft"]): Attendees["UpdateValuesI"] {
	return { _id, email, firstName, lastName };
}
