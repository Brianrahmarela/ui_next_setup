"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { API } from "@/config";
import { customRevalidatePath } from "@/lib/action";
import { toast } from "sonner";
import Link from "next/link";
import { Plus } from "lucide-react";

export function DataTable({
	 columns, initialData, totalData, totalContent, limit, 
}) {
	// console.log('initialData =>', initialData)
	// console.log(totalData)
	// console.log(totalContent)
	const [sorting, setSorting] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [columnVisibility, setColumnVisibility] = useState({ actions: true });	
	const [rowSelection, setRowSelection] = useState({});

	const [tableData, setTableData] = useState(initialData);
	// console.log(tableData)
	const [editingRowId, setEditingRowId] = useState(null);
	const [originalData, setOriginalData] = useState(null);

	useEffect(() => {
		setTableData(initialData);
	  }, [initialData]);

	  const handleUpdateRow = useCallback(async (updatedRow) => {
		const { id, name, email, birth_date } = updatedRow;
		const filteredParams = { id, name, email, birth_date };
	
		try {
		  const response = await API.PUT(`/users`, id, filteredParams);
		  if (response.meta?.message === "User updated successfully") {
			await customRevalidatePath("/home");
			toast.success("Row updated successfully.");
		  } else {
			throw new Error(response.errors?.[0]?.detail || "Unknown error.");
		  }
		} catch (error) {
		  toast.error(`Failed to update row: ${error.message}`);
		}
	  }, []);

	  const handleSaveRow = useCallback(
		(updatedRow) => {
		  setTableData((prevData) =>
			prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
		  );
		  handleUpdateRow(updatedRow);
		  setEditingRowId(null);
		  setOriginalData(null);
		},
		[handleUpdateRow]
	  );
	
	  const handleCancelEdit = useCallback(() => {
		setTableData((prevData) =>
		  prevData.map((row) => (row.id === editingRowId ? originalData : row))
		);
		setEditingRowId(null);
		setOriginalData(null);
	  }, [editingRowId, originalData]);
	
	  const handleEditRow = useCallback((row) => {
		setOriginalData({ ...row });
		setEditingRowId(row.id);
	  }, []);
	
	  const handleDeleteRow = useCallback(
		async (rowId) => {
		  const originalData = [...tableData];
		  setTableData((prev) => prev.filter((row) => row.id !== rowId.id));
	
		  try {
			const response = await API.DELETE("/users/", rowId.id);
			if (response.meta?.message === "User deleted successfully") {
			  await customRevalidatePath("/home");
			  toast.success("Deleted successfully");
			} else {
			  throw new Error(response.errors?.[0]?.detail || "Unknown error");
			}
		  } catch (error) {
			setTableData(originalData);
			toast.error(`Error deleting row: ${error.message}`);
		  }
		},
		[tableData]
	  );
	

	const table = useReactTable({
		data: tableData,
		columns: columns({ editingRowId,
        setEditingRowId: handleEditRow,
        handleSaveRow,
        handleCancelEdit, handleDeleteRow}),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
		pageCount: useMemo(() => Math.ceil(totalData / limit), [totalData, limit])
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
			</TableRow>
		));
	
	return (
		<>	
			<div className="pb-7 pt-3 grid grid-cols-12 md:gap-y-0 gap-y-4">
				<div className="md:col-span-8 col-span-12 gap-5 ">
					<Button asChild className="shadow-lg shadow-primary/50 ">
						<Link asChild href="/home/add-user">
							<Plus className="h-5 w-5 mr-1 " /> 
							<span className="mr-2">Add New User</span>
						</Link>
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
							{initialData === null || !totalData ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)  : table.getRowModel().rows?.length ? (
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
							) }
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="mt-5">
				<DataTablePagination table={table} totalData={totalData} editingRowId={editingRowId}/>
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