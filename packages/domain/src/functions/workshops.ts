import { ConvexError } from "convex/values";
import { kebabCase } from "es-toolkit";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Workshops } from "../schemas/workshops";
import { workshopEntriesFrom, workshopEntryFrom } from "../utils/workshops";

export async function createWorkshop(ctx: MutationCtx, args: Workshops["Create"]) {
	return ctx.db.insert("workshops", { ...args, slug: kebabCase(args.title) });
}

export async function removeWorkshop(ctx: MutationCtx, { _id }: Workshops["Remove"]) {
	const hasEvents = await ctx.db
		.query("events")
		.withIndex("by_workshop", (q) => q.eq("workshopId", _id))
		.first();

	if (hasEvents) throw new ConvexError("EXISTING_LINKED_EVENT");

	return ctx.db.delete(_id);
}

export async function updateWorkshop(ctx: MutationCtx, { _id, ...patch }: Workshops["Update"]) {
	await ctx.db.patch(_id, { ...patch, ...(patch.title ? { slug: kebabCase(patch.title) } : {}) });
	const workshop = await readWorkshopById(ctx, { _id });
	if (!workshop) throw new ConvexError("NOT_FOUND");
	return workshop;
}

export async function readAllWorkshops(ctx: QueryCtx) {
	const docs = await ctx.db.query("workshops").collect();
	return workshopEntriesFrom(docs, ctx);
}

export async function readWorkshopById(ctx: QueryCtx, { _id }: Workshops["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? workshopEntryFrom(doc) : undefined;
}

export async function readWorkshopBySlug(ctx: QueryCtx, args: { slug: string }) {
	const doc = await ctx.db
		.query("workshops")
		.withIndex("by_slug", (q) => q.eq("slug", args.slug))
		.unique();
	return doc ? workshopEntryFrom(doc) : undefined;
}

export async function readWorkshopsByIds(ctx: QueryCtx, { _ids }: Workshops["Refs"]) {
	return Promise.all(_ids.map((_id) => readWorkshopById(ctx, { _id })));
}
