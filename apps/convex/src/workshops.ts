import { createWorkshop, readAllWorkshops, readWorkshopBySlug, removeWorkshop, updateWorkshop } from "@ec/domain/functions/workshops";
import { zWorkshopCreate, zWorkshopRemove, zWorkshopSlugRef, zWorkshopUpdate } from "@ec/domain/schemas/workshops";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllWorkshops,
});

export const readBySlug = query({
	args: convexArgsFrom(zWorkshopSlugRef),
	handler: readWorkshopBySlug,
});

// MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zWorkshopCreate),
	handler: createWorkshop,
});

export const update = mutation({
	args: convexArgsFrom(zWorkshopUpdate),
	handler: updateWorkshop,
});

export const remove = mutation({
	args: convexArgsFrom(zWorkshopRemove),
	handler: removeWorkshop,
});
