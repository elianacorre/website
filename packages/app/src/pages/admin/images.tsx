import { Page, type PageProps } from "@ec/ui/components/admin/page";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function AdminImagesPage({ children, upsertForm }: AdminImagesPageProps) {
	return (
		<Page label="image" table="images" upsertForm={upsertForm}>
			{children}
		</Page>
	);
}
export type AdminImagesPageProps = PropsWithChildren<{
	upsertForm: PageProps<"images">["upsertForm"];
}>;
