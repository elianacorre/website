import { generateUploadUrlFor } from "@ec/domain/convex/utils";
import { createImage, readAllImages, readImageBySlug, readImagesBySlugs, removeImage, updateImage } from "@ec/domain/functions/images";
import { zImageCreate, zImageRemove, zImageSlugRef, zImageSlugRefs, zImageUpdate } from "@ec/domain/schemas/images";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllImages,
});

export const readBySlug = query({
	args: convexArgsFrom(zImageSlugRef),
	handler: readImageBySlug,
});

export const readBySlugs = query({
	args: convexArgsFrom(zImageSlugRefs),
	handler: readImagesBySlugs,
});

// MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zImageCreate),
	handler: createImage,
});

export const generateUploadUrl = mutation({
	args: {},
	handler: generateUploadUrlFor,
});

export const update = mutation({
	args: convexArgsFrom(zImageUpdate),
	handler: updateImage,
});

export const remove = mutation({
	args: convexArgsFrom(zImageRemove),
	handler: removeImage,
});
