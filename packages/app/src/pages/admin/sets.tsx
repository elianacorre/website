import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminSetsPage({ children, upsertForm }: AdminSetsPageProps) {
	return (
		<Page label="collection" table="sets" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminSetsPageProps = PropsWithChildren<{
	upsertForm: PageProps<"sets">["upsertForm"];
}>;
