import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminWorkshopsPage({ children, upsertForm }: AdminWorkshopsPageProps) {
	return (
		<Page label="atelier" table="workshops" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminWorkshopsPageProps = PropsWithChildren<{
	upsertForm: PageProps<"workshops">["upsertForm"];
}>;
