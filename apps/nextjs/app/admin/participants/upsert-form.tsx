"use client";

import { AdminAttendeesUpsertForm } from "@ec/app/pages/admin/attendees.upsert-form";
import { api } from "@ec/convex/api";
import { useMutation } from "convex/react";

// ROOT ************************************************************************************************************************************
export function AttendeesUpsertForm() {
	const create = useMutation(api.attendees.create);
	const update = useMutation(api.attendees.update);

	return <AdminAttendeesUpsertForm create={create} update={update} />;
}
