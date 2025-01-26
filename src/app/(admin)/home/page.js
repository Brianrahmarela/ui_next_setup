import React from "react";
import { API } from "@/config";
import { cookies } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const getData = async (token, params) => {
  try {
    const response = await API.GET("/users", token, params);
    return response;
  } catch (error) {
    return error;
  }
};

const dashboard = async ({ searchParams }) => {
  const token = cookies().get("access_token")?.value;

  const params = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    sort: searchParams.sort || "id",
    order: searchParams.order || "desc",
  };

  const data = await getData(token, params);
  // console.log(data)

  return (
    <div className="flex flex-col">
      <div className="flex-1">
		<div className="grid grid-cols-12  space-y-2 mb-2">
          <div className="col-span-12 sm:col-span-6">
            <h2 className="text-xl font-semibold mb-[2px]">
              Home
            </h2>
          </div>
          <div className="col-span-12 sm:pt-0 sm:col-span-6 items-center sm:block hidden">
          </div>
        </div>
        <div className="relative">
          <DataTable
            columns={columns}
            initialData={data?.data.content}
            totalData={data?.data.total_data}
            totalContent={data?.data.total_content}
            limit={10}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
