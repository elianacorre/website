"use client";

import type { TableNames } from "@ec/domain/convex/schema";
import { collections, type For } from "@ec/domain/index";
import { Alert, AlertDescription } from "@ec/ui/components/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@ec/ui/components/alert-dialog";
import { Button } from "@ec/ui/components/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ec/ui/components/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ec/ui/components/tooltip";
import { closeConfirmDelete, openConfirmDelete, openUpsert, setConfirmDeleteOpen, useCollection } from "@ec/ui/lib/stores";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { AlertCircleIcon, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

// ROOT ************************************************************************************************************************************
export function DraftsTable<T extends TableNames>({ columns, drafts, invalid = [], remove, table: tableName }: DraftsTableProps<T>) {
	const table = useReactTable({
		data: drafts ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="flex flex-col gap-4">
			{invalid.length > 0 && (
				<Alert variant="destructive">
					<AlertCircleIcon />
					<AlertDescription>
						Il existe {invalid.length} {invalid.length > 1 ? "éléments invalides" : "élément invalide"}.
					</AlertDescription>
				</Alert>
			)}
			<div className="overflow-x-auto rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="p-2 text-left font-semibold">
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
								<TableHead className="p-2 text-left font-semibold">Actions</TableHead>
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="p-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
								<TableCell className="flex gap-2 p-2">
									<div className="flex gap-1">
										<Tooltip>
											<TooltipTrigger asChild>
												<Button size="icon" variant="outline" onClick={() => openUpsert(tableName, row.original)}>
													<Pencil className="size-4" />
												</Button>
											</TooltipTrigger>
											<TooltipContent>Modifier</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button size="icon" variant="destructive" onClick={() => openConfirmDelete(tableName, row.original)}>
													<Trash className="size-4" />
												</Button>
											</TooltipTrigger>
											<TooltipContent>Supprimer</TooltipContent>
										</Tooltip>
										<ConfirmDelete table={tableName} remove={remove} />
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
export type DraftsTableProps<T extends TableNames> = {
	columns: ColumnDef<For<T>["Draft"], any>[];
	drafts: For<T>["Draft"][] | undefined;
	invalid?: For<T>["Draft"][];
	remove: (args: For<T>["Remove"]) => Promise<null>;
	table: T;
};

// CONFIRM *********************************************************************************************************************************
export function ConfirmDelete<T extends TableNames>({ remove, table }: ConfirmDeleteProps<T>) {
	const { confirmDeleteOpen, selected } = useCollection(table);

	const handleConfirmRemove = async () => {
		if (!selected) return;
		try {
			await remove(collections[table].zRemove.parse(selected));
		} catch {
			toast.error("Impossible de supprimer l'élément");
		} finally {
			closeConfirmDelete(table);
		}
	};

	return (
		<AlertDialog open={confirmDeleteOpen} onOpenChange={(open) => setConfirmDeleteOpen(table, open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
					<AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirmRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						Supprimer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export type ConfirmDeleteProps<T extends TableNames> = {
	remove: (args: For<T>["Remove"]) => Promise<null>;
	table: T;
};
