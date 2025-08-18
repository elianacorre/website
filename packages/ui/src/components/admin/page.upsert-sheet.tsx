"use client";

import type { TableNames } from "@ec/domain/convex/schema";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ec/ui/components/sheet";
import { setUpsertOpen, useCollection } from "@ec/ui/lib/stores";
import type { PropsWithChildren } from "react";

// ROOT ************************************************************************************************************************************
export function PageUpsertSheet<T extends TableNames>({ children, table }: PageUpsertSheetProps<T>) {
	const { selected, upsertOpen } = useCollection(table);

	return (
		<Sheet open={upsertOpen} onOpenChange={(open) => setUpsertOpen(table, open)}>
			<SheetContent side="right" className="p-6">
				<SheetHeader>
					<SheetTitle>{selected ? "Modifier" : "Ajouter"}</SheetTitle>
				</SheetHeader>
				{children}
			</SheetContent>
		</Sheet>
	);
}
export type PageUpsertSheetProps<T extends TableNames> = PropsWithChildren<{ table: T }>;
