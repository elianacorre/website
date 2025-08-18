import {
	createSubscription,
	readAllSubscriptions,
	readSubscriptionById,
	removeSubscription,
	updateSubscription,
} from "@ec/domain/functions/subscriptions";
import { zSubscriptionCreate, zSubscriptionRef, zSubscriptionRemove, zSubscriptionUpdate } from "@ec/domain/schemas/subscriptions";
import { convexArgsFrom } from "zod-convex";
import { mutation, query } from "./_generated/server";

// QUERIES *********************************************************************************************************************************
export const readAll = query({
	args: {},
	handler: readAllSubscriptions,
});

export const readById = query({
	args: convexArgsFrom(zSubscriptionRef),
	handler: readSubscriptionById,
});

// MUTATIONS *******************************************************************************************************************************
export const create = mutation({
	args: convexArgsFrom(zSubscriptionCreate),
	handler: createSubscription,
});

export const update = mutation({
	args: convexArgsFrom(zSubscriptionUpdate),
	handler: updateSubscription,
});

export const remove = mutation({
	args: convexArgsFrom(zSubscriptionRemove),
	handler: removeSubscription,
});
