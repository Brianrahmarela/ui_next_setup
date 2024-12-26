"use client";

import React, { useState, useEffect } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { API } from "@/config";
import { customRevalidatePath } from "@/lib/action";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import { Search, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

export function DataTable({
	isPerluValidasi, columns, data, totalData, totalContent, limit, token, kategoriOpt,
	subKategoriOpt, solusiOpt, responsibleDeptOpt, sumberOpt, storeOpt, brandOpt, channelOpt
}) {
	
	console.log(data)
	const table = useReactTable({
		data,
		columns: columns({
			
		}),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		// onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		// onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		// onColumnVisibilityChange: setColumnVisibility,
		// onRowSelectionChange: setRowSelection,
		// state: { sorting, columnFilters, columnVisibility, rowSelection },
		pageCount: Math.ceil(totalData / limit)
	});

	const skeletonTableRow = new Array(totalContent)
		.fill(null)
		.map((_, index) => (
			<TableRow key={index}>
				<TableCell><Skeleton className="h-4 w-4 bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[200px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[200px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[150px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[150px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[90px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[90px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[150px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[100px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[200px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[200px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[70px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[100px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[100px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[180px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[140px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[140px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[120px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[100px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[150px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[100px] bg-gray-200" /></TableCell>
				<TableCell><Skeleton className="h-5 w-[150px] bg-gray-200" /></TableCell>
			</TableRow>
		));

	return (
		<>
				
			<div className="mt-5">
			<div className="rounded-md border max-h-[200px] overflow-auto">
				<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
						return (
							<TableHead key={header.id}>
							{header.isPlaceholder
								? null
								: flexRender(
									header.column.columnDef.header,
									header.getContext()
								)}
							</TableHead>
						);
						})}
					</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
						key={row.id}
						data-state={row.getIsSelected() && "selected"}
						>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
							{flexRender(
								cell.column.columnDef.cell,
								cell.getContext()
							)}
							</TableCell>
						))}
						</TableRow>
					))
					) : (
					<TableRow>
						<TableCell
						colSpan={columns.length}
						className="h-24 text-center"
						>
						No results.
						</TableCell>
					</TableRow>
					)}
				</TableBody>
				</Table>
			</div>
				{/* <DataTablePagination table={table} totalData={totalData} /> */}
			</div>
			<Toaster 
			 toastOptions={{
				classNames: {
					success: 'text-green-600 bg-[#edfcf2] border-1 border-green-400 text-[14.5px]',
					error: 'text-red-600 bg-[#fbe9e9] border-1 border-red-400 text-[14.5px]',
				},
			  }}
			/>
		</>
	);
}