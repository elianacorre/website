import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Images } from "../schemas/images";
import { imageEntryFrom } from "../utils/images";

export async function createImage(ctx: MutationCtx, args: Images["Create"]) {
	return ctx.db.insert("images", args);
}

export async function removeImage(ctx: MutationCtx, { _id, storageId }: Images["Remove"]) {
	await Promise.all([ctx.db.delete(_id), ctx.storage.delete(storageId)]);
}

export async function updateImage(ctx: MutationCtx, { _id, ...patch }: Images["Update"]) {
	await ctx.db.patch(_id, patch);
	const image = await readImageById(ctx, { _id });
	if (!image) throw new ConvexError("NOT_FOUND");
	return image;
}

export async function readAllImages(ctx: QueryCtx) {
	const docs = await ctx.db.query("images").collect();
	return Promise.all(docs.map((doc) => imageEntryFrom(doc, ctx)));
}

export async function readImageById(ctx: QueryCtx, { _id }: Images["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? imageEntryFrom(doc, ctx) : undefined;
}

export async function readImageBySlug(ctx: QueryCtx, args: Images["SlugRef"]) {
	const doc = await ctx.db
		.query("images")
		.withIndex("by_slug", (q) => q.eq("slug", args.slug))
		.unique();
	return doc ? imageEntryFrom(doc, ctx) : undefined;
}

export async function readImagesByIds(ctx: QueryCtx, { _ids }: Images["Refs"]) {
	return Promise.all(_ids.map((_id) => readImageById(ctx, { _id })));
}

export async function readImagesBySlugs(ctx: QueryCtx, { slugs }: Images["SlugRefs"]) {
	return Promise.all(slugs.map((slug) => readImageBySlug(ctx, { slug })));
}
