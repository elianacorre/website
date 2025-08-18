import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminAttendeesPage({ children, upsertForm }: AdminAttendeesPageProps) {
	return (
		<Page label="participant" table="attendees" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminAttendeesPageProps = PropsWithChildren<{
	upsertForm: PageProps<"attendees">["upsertForm"];
}>;
