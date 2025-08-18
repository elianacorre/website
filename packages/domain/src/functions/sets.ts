import { ConvexError } from "convex/values";
import { kebabCase } from "es-toolkit";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Sets } from "../schemas/sets";
import { setEntriesFrom, setEntryFrom } from "../utils/sets";
import { readImageBySlug } from "./images";

export async function createSet(ctx: MutationCtx, args: Sets["Create"]) {
	return ctx.db.insert("sets", { ...args, slug: kebabCase(args.title) });
}

export async function importSet(ctx: MutationCtx, { content, id: slug, image, title }: Sets["Json"]) {
	const imageEntry = await readImageBySlug(ctx, { slug: image });
	if (imageEntry) await ctx.db.insert("sets", { content, imageId: imageEntry._id, slug, title });
}

export async function importSets(ctx: MutationCtx, sets: Sets["Json"][]) {
	await Promise.all(sets.map((set) => importSet(ctx, set)));
}

export async function removeSet(ctx: MutationCtx, { _id }: Sets["Remove"]) {
	return ctx.db.delete(_id);
}

export async function updateSet(ctx: MutationCtx, { _id, ...patch }: Sets["Update"]) {
	await ctx.db.patch(_id, patch);
	const set = await readSetById(ctx, { _id });
	if (!set) throw new ConvexError("NOT_FOUND");
	return set;
}

export async function readAllSets(ctx: QueryCtx) {
	const docs = await ctx.db.query("sets").collect();
	return setEntriesFrom(docs, ctx);
}

export async function readSetById(ctx: QueryCtx, { _id }: Sets["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? setEntryFrom(doc, ctx) : undefined;
}

export async function readSetBySlug(ctx: QueryCtx, args: { slug: string }) {
	const doc = await ctx.db
		.query("sets")
		.withIndex("by_slug", (q) => q.eq("slug", args.slug))
		.unique();
	return doc ? setEntryFrom(doc, ctx) : undefined;
}

export async function readSetsByIds(ctx: QueryCtx, { _ids }: Sets["Refs"]) {
	return Promise.all(_ids.map((_id) => readSetById(ctx, { _id })));
}
