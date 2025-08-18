import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Attendees } from "../schemas/attendees";
import { attendeeEntryFrom } from "../utils/attendees";

export async function readAllAttendees(ctx: QueryCtx) {
	const docs = await ctx.db.query("attendees").collect();
	return docs.map(attendeeEntryFrom);
}

export async function readAttendeeById(ctx: QueryCtx, { _id }: Attendees["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? attendeeEntryFrom(doc) : undefined;
}

export async function readAttendeesByIds(ctx: QueryCtx, { _ids }: Attendees["Refs"]) {
	return Promise.all(_ids.map((_id) => readAttendeeById(ctx, { _id })));
}

export async function createAttendee(ctx: MutationCtx, args: Attendees["Create"]) {
	return ctx.db.insert("attendees", args);
}

export async function removeAttendee(ctx: MutationCtx, { _id }: Attendees["Remove"]) {
	const hasSubscriptions = await ctx.db
		.query("subscriptions")
		.withIndex("by_attendee", (q) => q.eq("attendeeId", _id))
		.first();

	if (hasSubscriptions) throw new ConvexError("EXISTING_LINKED_SUBSCRIPTION");

	return ctx.db.delete(_id);
}

export async function updateAttendee(ctx: MutationCtx, { _id, ...patch }: Attendees["Update"]) {
	await ctx.db.patch(_id, patch);
	const attendee = await readAttendeeById(ctx, { _id });
	if (!attendee) throw new ConvexError("NOT_FOUND");
	return attendee;
}
