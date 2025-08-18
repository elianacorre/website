import { createWork, readAllWorks, readWorkById, removeWork, updateWork } from "@ec/domain/functions/works";
import { zWorkCreate, zWorkRef, zWorkRemove, zWorkUpdate } from "@ec/domain/schemas/works";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllWorks,
});

export const readById = query({
	args: convexArgsFrom(zWorkRef),
	handler: readWorkById,
});

// // MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zWorkCreate),
	handler: createWork,
});

export const remove = mutation({
	args: convexArgsFrom(zWorkRemove),
	handler: removeWork,
});

export const update = mutation({
	args: convexArgsFrom(zWorkUpdate),
	handler: updateWork,
});
