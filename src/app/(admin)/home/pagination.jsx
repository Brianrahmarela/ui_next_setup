import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import { formatAngka } from "@/lib/helper";
import { Input } from "@/components/ui/input";

export function DataTablePagination({ table, totalData, editingRowId }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const params = new URLSearchParams(searchParams);
	const limitQuery = params?.get("data");

	const [pageQuery, setPageQuery] = useState(params?.get("page"));
	const [pageState, setPageState] = useState(1);

	const createPageURL = (name, pageNumber) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, pageNumber.toString());
		replace(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		const newPageQuery = params.get("page") || "1";
		setPageQuery(newPageQuery);
		setPageState(parseInt(newPageQuery));
	  }, [pathname, searchParams]);

	useEffect(() => {
		createPageURL("page", pageState);
	}, [pageState]);

	return (
		<div className="grid grid-cols-12 lg:gap-y-0 gap-y-4">
			<div className="col-span-12 md:col-span-4 lg:col-span-2 xl:col-span-3 text-sm text-muted-foreground flex justify-start items-center">
				{formatAngka(totalData)} total data
			</div>
			<div className="col-span-12 md:col-span-8 lg:col-span-5 xl:col-span-5">
				<div className="flex justify-end items-center gap-4">
					<p className="text-sm font-medium">Rows per page</p>
					<Select
						className=""
						onValueChange={(value) => {
							params.delete("page");
							createPageURL("data", Number(value));
							table.setPageSize(Number(value));
						}}
						defaultValue={limitQuery || "10"}
					>
						<SelectTrigger className="h-8 w-[70px] font-medium">
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="col-span-12 md:col-span-12 lg:col-span-5 xl:col-span-4">
				<div className="grid grid-cols-12 items-center  text-sm font-medium gap-5">
					<div className="col-span-9 flex flex-row justify-end items-center gap-2 sm:gap-3">
						<div>Page</div>
						<Input
							className="w-20 h-8 font-medium"
							type="number"
							min={1}
							value={pageState}
							onChange={(e) => setPageState(Number(e.target.value === '' ? 1 : e.target.value))}
						/>
						<div>of </div>
						<div className="font-medium">{table.getPageCount()}</div>
					</div>
					<div className="col-span-3 flex justify-end">
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={(e) => {
								setPageState(Number(pageState - 1))
								table.previousPage();
							}}
							disabled={Number(pageQuery) === 1 || editingRowId}
						>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={(e) => {
								setPageState(Number(pageState + 1))
								table.nextPage();
							}}
							disabled={Number(pageQuery) === table.getPageCount() || editingRowId}
						>
							<span className="sr-only">Go to next page</span>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}