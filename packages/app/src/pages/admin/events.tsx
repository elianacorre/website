import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminEventsPage({ children, upsertForm }: AdminEventsPageProps) {
	return (
		<Page label="événement" table="events" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminEventsPageProps = PropsWithChildren<{
	upsertForm: PageProps<"events">["upsertForm"];
}>;
