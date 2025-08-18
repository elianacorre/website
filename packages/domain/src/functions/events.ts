import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Events } from "../schemas/events";
import { eventEntriesFrom, eventEntryFrom } from "../utils/events";

export async function readAllEvents(ctx: QueryCtx) {
	const docs = await ctx.db.query("events").collect();
	return eventEntriesFrom(docs, ctx);
}

export async function readEventById(ctx: QueryCtx, { _id }: Events["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? eventEntryFrom(doc, ctx) : undefined;
}

export async function readEventsByIds(ctx: QueryCtx, { _ids }: Events["Refs"]) {
	return Promise.all(_ids.map((_id) => readEventById(ctx, { _id })));
}

export async function createEvent(ctx: MutationCtx, args: Events["Create"]) {
	return ctx.db.insert("events", args);
}

export async function updateEvent(ctx: MutationCtx, { _id, ...patch }: Events["Update"]) {
	await ctx.db.patch(_id, patch);
	const event = await readEventById(ctx, { _id });
	if (!event) throw new ConvexError("NOT_FOUND");
	return event;
}

export async function removeEvent(ctx: MutationCtx, { _id }: Events["Remove"]) {
	return ctx.db.delete(_id);
}
