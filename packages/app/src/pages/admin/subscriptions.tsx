import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminSubscriptionsPage({ children, upsertForm }: AdminSubscriptionsPageProps) {
	return (
		<Page label="image" table="subscriptions" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminSubscriptionsPageProps = PropsWithChildren<{
	upsertForm: PageProps<"subscriptions">["upsertForm"];
}>;
