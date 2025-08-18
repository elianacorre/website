import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminWorksPage({ children, upsertForm }: AdminWorksPageProps) {
	return (
		<Page label="collection" table="works" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminWorksPageProps = PropsWithChildren<{
	upsertForm: PageProps<"works">["upsertForm"];
}>;
