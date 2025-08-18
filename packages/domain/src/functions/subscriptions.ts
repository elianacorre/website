import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../convex/schema";
import type { Subscriptions } from "../schemas/subscriptions";
import { subscriptionEntriesFrom, subscriptionEntryFrom } from "../utils/subscriptions";

export async function createSubscription(ctx: MutationCtx, args: Subscriptions["Create"]) {
	return await ctx.db.insert("subscriptions", args);
}

export async function updateSubscription(ctx: MutationCtx, { _id, ...patch }: Subscriptions["Update"]) {
	await ctx.db.patch(_id, patch);
	const subscription = await readSubscriptionById(ctx, { _id });
	if (!subscription) throw new ConvexError("NOT_FOUND");
	return subscription;
}

export async function removeSubscription(ctx: MutationCtx, { _id }: Subscriptions["Remove"]) {
	return await ctx.db.delete(_id);
}

export async function readAllSubscriptions(ctx: QueryCtx) {
	const docs = await ctx.db.query("subscriptions").collect();
	return subscriptionEntriesFrom(docs, ctx);
}

export async function readSubscriptionById(ctx: QueryCtx, { _id }: Subscriptions["Ref"]) {
	const doc = await ctx.db.get(_id);
	return doc ? subscriptionEntryFrom(doc, ctx) : undefined;
}
