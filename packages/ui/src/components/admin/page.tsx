import type { TableNames } from "@ec/domain/convex/schema";
import { capitalize } from "es-toolkit";
import type { PropsWithChildren, ReactElement } from "react";
import { PageCreateButton } from "./page.create-button";
import { PageUpsertSheet } from "./page.upsert-sheet";
import type { UpsertFormProps } from "./upsert-form";

// ROOT ************************************************************************************************************************************
export function Page<T extends TableNames, R extends Record<string, any>>({ children, label, table, upsertForm }: PageProps<T, R>) {
	const plural = `${label}s`;

	return (
		<section>
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl font-semibold">{capitalize(plural)}</h2>
				<PageCreateButton table={table} />
			</div>
			{children}
			<PageUpsertSheet table={table}>{upsertForm}</PageUpsertSheet>
		</section>
	);
}
export type PageProps<T extends TableNames, R extends Record<string, any> = Record<string, any>> = PropsWithChildren<{
	label: string;
	table: T;
	upsertForm: ReactElement<UpsertFormProps<T, R>>;
}>;
