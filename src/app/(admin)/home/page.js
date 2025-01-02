import React from "react";
import { API } from "@/config";
import { cookies } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (token, params) => {
	const response = await API.GET("/users", token, params);
	console.log(response)
	return response;
};

const dashboard = async ({ searchParams }) => {
	console.log(searchParams)
	const token = cookies().get("access_token")?.value;

	const params = {
		page: Number(searchParams.page) || 1,
		limit: Number(searchParams.limit) || 10,
		// ...(searchParams.search && searchParams.search !== ''
		// ? { search: searchParams.search } : null),
		sort: searchParams.sort || 'id',
		order: searchParams.order || 'desc',
	  }
	console.log(params)

	const data = await getData(token, params);
	console.log(data)

	return (
		<div className="flex flex-col ">
				<div className="flex-1 ">
					Home page
					<div className="relative">
						<DataTable
							columns={columns}
							initialData={data.data.content}
							totalData={data.data.total_data}
							totalContent={data.data.total_content}
							limit={10}
							token={token}
						/>
					</div>
			</div>
		</div>
	);
};

export default dashboard;
