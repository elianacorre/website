import { createEvent, readAllEvents, readEventById, removeEvent, updateEvent } from "@ec/domain/functions/events";
import { zEventCreate, zEventRef, zEventRemove, zEventUpdate } from "@ec/domain/schemas/events";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllEvents,
});

export const readById = query({
	args: convexArgsFrom(zEventRef),
	handler: readEventById,
});

// // MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zEventCreate),
	handler: createEvent,
});

export const remove = mutation({
	args: convexArgsFrom(zEventRemove),
	handler: removeEvent,
});

export const update = mutation({
	args: convexArgsFrom(zEventUpdate),
	handler: updateEvent,
});
