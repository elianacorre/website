import type { GenericId } from "convex/values";
import type { MutationCtx, TableNames } from "./schema";

export async function generateUploadUrlFor(ctx: MutationCtx) {
	return ctx.storage.generateUploadUrl();
}

export function mapFrom<T extends TableNames, E extends { _id: GenericId<T> }>(entries: (E | null | undefined)[]): EntryMap<T, E> {
	return new Map(entries.filter(Boolean).map((entry) => [entry._id, entry]));
}

// TYPES ***********************************************************************************************************************************
export type EntryMap<T extends TableNames, E extends { _id: GenericId<T> }> = Map<E["_id"], E>;
