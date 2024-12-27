"use client";

import React, { useState, useEffect } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "@/components/ui/sonner"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

export function DataTable({
	isPerluValidasi, columns, data, totalData, totalContent, limit, token,
}) {
	
	console.log(data)
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({ actions: true });	
	const [rowSelection, setRowSelection] = useState({});
	const [dataUpdateRow, setdataUpdateRow] = useState([]);
	const debouncedName = useDebouncedCallback(async (val, id) => {
		const params = {
			name : val
		};
		
		const existingDataIndex = dataUpdateRow.findIndex(item => item.id === id);
		if (existingDataIndex !== -1) {
			setdataUpdateRow(prevData => {
				const newData = [...prevData];
				newData[existingDataIndex].name = params.name;
				return newData;
			});
		} else {
			setdataUpdateRow(prevData => [...prevData, { id, ...params }]);
		}
		
	}, 1000);

	const [editingRowId, setEditingRowId] = useState(null);
	
	const [tableData, setTableData] = useState(data);
	console.log(tableData)
  
	const handleSaveRow = (updatedRow) => {
		console.log('updatedRow', updatedRow)
	  setTableData((prevData) =>
		prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
	  );
	  setEditingRowId(null);
	};
  
	const handleCancelEdit = () => {
	  setEditingRowId(null);
	};

	const table = useReactTable({
		// data,
		// columns: columns({
		// 	isPerluValidasi, token, debouncedName
		// }),
		data: tableData,
		columns: columns({ editingRowId, setEditingRowId, handleSaveRow, handleCancelEdit }),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
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
			<div className="pb-7 pt-3 grid grid-cols-12 md:gap-y-0 gap-y-4">
				<div className="md:col-span-8 col-span-12 gap-5 flex">
					<Button
						onClick={() => {}}
						variant="outline"
						className="border-none"
					>
					</Button>
					<Button
						variant="outline"
						onClick={() => {}}
						className="border-none"
					>
					</Button>
				</div>
				<div className="md:col-span-4 col-span-12 flex md:justify-end justify-start">
				<div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns
						</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent 
						
						align="end" className="max-h-[250px] overflow-auto md:m-0 m-3 pt-3">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
							return (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) =>
										column.toggleVisibility(!!value)
									}
								>
								{column.id }
								</DropdownMenuCheckboxItem>
							);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				</div>
			</div>
			<div className="rounded-lg border max-h-[70vh] scrollxshow">
				<div className="relative">
					<Table>
						<TableHeader className="sticky top-0 bg-white z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} className="py-2 text-black text-[13.5px]">
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
							{data === null || !totalData ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="font-light">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<>{skeletonTableRow}</>
								)}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="mt-5">
				<DataTablePagination table={table} totalData={totalData} />
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