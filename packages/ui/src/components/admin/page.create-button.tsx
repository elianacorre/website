"use client";

import type { TableNames } from "@ec/domain/convex/schema";
import { Button } from "@ec/ui/components/button";
import { openUpsert } from "@ec/ui/lib/stores";
import { PlusCircleIcon } from "lucide-react";

// ROOT ************************************************************************************************************************************
export function PageCreateButton<T extends TableNames>({ table }: PageCreateButtonProps<T>) {
	return (
		<Button onClick={() => openUpsert(table)}>
			<PlusCircleIcon />
			Ajouter
		</Button>
	);
}
export type PageCreateButtonProps<T extends TableNames> = { table: T };
