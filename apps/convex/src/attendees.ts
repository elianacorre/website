import { createAttendee, readAllAttendees, readAttendeeById, removeAttendee, updateAttendee } from "@ec/domain/functions/attendees";
import { zAttendeeCreate, zAttendeeRef, zAttendeeRemove, zAttendeeUpdate } from "@ec/domain/schemas/attendees";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllAttendees,
});

export const readById = query({
	args: convexArgsFrom(zAttendeeRef),
	handler: readAttendeeById,
});

// MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zAttendeeCreate),
	handler: createAttendee,
});

export const update = mutation({
	args: convexArgsFrom(zAttendeeUpdate),
	handler: updateAttendee,
});

export const remove = mutation({
	args: convexArgsFrom(zAttendeeRemove),
	handler: removeAttendee,
});
