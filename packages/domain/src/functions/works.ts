import { ConvexError } from "convex/values";
import { kebabCase } from "es-toolkit";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Sets } from "../schemas";
import type { Works } from "../schemas/works";
import { workEntriesFrom, workEntryFrom } from "../utils/works";
import { readImageBySlug } from "./images";
import { readSetBySlug } from "./sets";

export async function readAllWorks(ctx: QueryCtx) {
	const docs = await ctx.db.query("works").collect();
	return workEntriesFrom(docs, ctx);
}

export async function readSetWorks(ctx: QueryCtx, { _id }: Sets["Ref"]) {
	const docs = await ctx.db
		.query("works")
		.withIndex("by_set", (q) => q.eq("setId", _id))
		.collect();
	return workEntriesFrom(docs, ctx);
}

export async function readWorkById(ctx: QueryCtx, { _id }: Works["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? workEntryFrom(doc, ctx) : undefined;
}

export async function readWorkBySlug(ctx: QueryCtx, args: { slug: string }) {
	const doc = await ctx.db
		.query("works")
		.withIndex("by_slug", (q) => q.eq("slug", args.slug))
		.unique();
	return doc ? workEntryFrom(doc, ctx) : undefined;
}

export async function readWorksByIds(ctx: QueryCtx, { _ids }: Works["Refs"]) {
	return Promise.all(_ids.map((_id) => readWorkById(ctx, { _id })));
}

export async function createWork(ctx: MutationCtx, args: Works["Create"]) {
	return ctx.db.insert("works", { ...args, slug: kebabCase(args.title) });
}

export async function importWork(
	ctx: MutationCtx,
	{ date, height, id: slug, image, material, media, set, stripe, title, width }: Works["Json"],
) {
	const [imageEntry, setEntry] = await Promise.all([readImageBySlug(ctx, { slug: image }), readSetBySlug(ctx, { slug: set })]);
	if (imageEntry && setEntry)
		await ctx.db.insert("works", {
			date,
			height,
			imageId: imageEntry._id,
			material: material as Works["Material"],
			media: media as Works["Media"][],
			setId: setEntry._id,
			slug,
			stripe,
			title,
			width,
		});
}

export async function importWorks(ctx: MutationCtx, works: Works["Json"][]) {
	await Promise.all(works.map((work) => importWork(ctx, work)));
}

export async function removeWork(ctx: MutationCtx, { _id }: Works["Remove"]) {
	return ctx.db.delete(_id);
}

export async function updateWork(ctx: MutationCtx, { _id, ...patch }: Works["Update"]) {
	await ctx.db.patch(_id, patch);
	const work = await readWorkById(ctx, { _id });
	if (!work) throw new ConvexError("NOT_FOUND");
	return work;
}
