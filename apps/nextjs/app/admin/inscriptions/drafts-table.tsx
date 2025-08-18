"use client";

import { AdminSubscriptionsDraftsTable } from "@ec/app/pages/admin/subscriptions.drafts-table";
import { api } from "@ec/convex/api";
import type { Preloaded } from "convex/react";
import { useMutation, usePreloadedQuery } from "convex/react";

// ROOT ************************************************************************************************************************************
export function SubscriptionsDraftsTable({ preloaded }: SubscriptionsDraftsTableProps) {
	const entries = usePreloadedQuery(preloaded);
	const remove = useMutation(api.subscriptions.remove);

	return <AdminSubscriptionsDraftsTable entries={entries} remove={remove} />;
}

// TYPES ***********************************************************************************************************************************
export type SubscriptionsDraftsTableProps = {
	preloaded: Preloaded<typeof api.subscriptions.readAll>;
};
