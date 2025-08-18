import { createSet, readAllSets, readSetById, removeSet, updateSet } from "@ec/domain/functions/sets";
import { zSetCreate, zSetRef, zSetRemove, zSetUpdate } from "@ec/domain/schemas/sets";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllSets,
});

export const readById = query({
	args: convexArgsFrom(zSetRef),
	handler: readSetById,
});

// // MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zSetCreate),
	handler: createSet,
});

export const remove = mutation({
	args: convexArgsFrom(zSetRemove),
	handler: removeSet,
});

export const update = mutation({
	args: convexArgsFrom(zSetUpdate),
	handler: updateSet,
});
