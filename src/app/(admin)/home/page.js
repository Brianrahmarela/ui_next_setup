import React from "react";
import { API } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { formatAngka } from "@/lib/helper";
import Link from "next/link";

// const getProfile = async (token) => {
// 	const response = await API.GET("/me", token);
// 	return response;
// };

const getData = async (token, params) => {
	console.log(token)
	const response = await API.GET("/users", token, params);
	console.log(response)
	return response;
};
// const getDataComponents = async (token, params) => {
// 	const response = await API.GET("/review/components", token, params);
// 	return response.data;
// };

// const getDataStores = async (token, params) => {
// 	const response = await API.GET("/stores", token, params);
// 	return response.data;
// };

// const getDataBrands = async (token, params) => {
// 	const response = await API.GET("/brands", token, params);
// 	return response.data;
// };

// const getDataChannels = async (token, params) => {
// 	const response = await API.GET("/channels", token, params);
// 	return response.data;
// };

const dashboard = async ({ searchParams }) => {
	// const params = {
	// 	data: Number(searchParams.data) || 10,
	// 	page: Number(searchParams.page) || 1,
	// 	sort_key: "reviews.id",
	// 	sort_value: "DESC",
	// 	...(
    //   searchParams.start_date && searchParams.end_date ? 
    //   { from_reviewed_at: searchParams.start_date, until_reviewed_at: searchParams.end_date } 
    // : { from_reviewed_at: null,
	// 	until_reviewed_at: null, }
    // ),
	// 	...(searchParams.sumber && searchParams.sumber !== ''
    // ? { source: searchParams.sumber } : null),
	// 	...(searchParams.kategori && searchParams.kategori !== ''
    // ? { dashboard_category_id: searchParams.kategori } : null),
	// 	...(searchParams.sub_kategori && searchParams.sub_kategori !== ''
    // ? { dashboard_sub_category_id: searchParams.sub_kategori } : null),
	// 	...(searchParams.brand_id && searchParams.brand_id !== ''
    // ? { brand_id: searchParams.brand_id } : null),
	// 	...(searchParams.store_id && searchParams.store_id !== ''
    // ? { store_id: searchParams.store_id } : null),
	// 	...(searchParams.channel_id && searchParams.channel_id !== ''
    // ? { channel_id: searchParams.channel_id } : null),
	// 	...(searchParams.punya_komentar && searchParams.punya_komentar !== ''
    // ? { is_have_comment: searchParams.punya_komentar === 'Ya' ? true : false } : null),
	// 	...(searchParams.search && searchParams.search !== ''
    // ? { comment_term: searchParams.search } : null),
	// 	...(searchParams.validasi && searchParams.validasi !== ''
    // ? { is_need_validation_only: searchParams.validasi ? true : false } : {is_need_validation_only: false}),
	// };

	const token = cookies().get("access_token")?.value;
	// if (token) {
	// 	const data = await getProfile(token);
	// 	if (!data.success) {
	// 		redirect("/login");
	// 	}
	// } else {
	// 	redirect("/login");
	// }

	const data = await getData(token, null);
	console.log(data)
	// const dataComponents = await getDataComponents(token, null);

	// const paramsStoreBrandPlatform = {
	// 	page: 1,
	// 	data: 50,
	// 	sort_key: "id",
	// 	sort_value: "ASC",
	// };

	// const paramsStore = {
    // ...paramsStoreBrandPlatform,
    // ...(searchParams.store && searchParams.store !== '' ? { term: searchParams.store } : null),
	// };
	
	// const dataStores = await getDataStores(token, paramsStore);

	// const paramsBrands = {
    // ...paramsStoreBrandPlatform,
    // ...(searchParams.brand && searchParams.brand !== '' ? { term: searchParams.brand } : null),
	// };
	// const dataBrands = await getDataBrands(token, paramsBrands);
	
	// const paramsChannels = {
    // ...paramsStoreBrandPlatform,
    // ...(searchParams.channel && searchParams.channel !== '' ? { term: searchParams.channel } : null),
	// };
	// const dataChannels = await getDataChannels(token, paramsChannels);

	return (
		<div className="flex flex-col ">
				<div className="flex-1 ">
					Home page
					{/* <div className="grid grid-cols-12 items-center space-y-2 mb-2">
						<div className="col-span-12 sm:col-span-6">
							<h2 className="text-xl font-semibold mb-1">dashboard</h2>
							<p className="text-sm text-[#828282]">
								You have {data ? formatAngka(data?.total_data) : 0} comments
							</p>
						</div>
						<div className="col-span-12 sm:pt-0 sm:col-span-6 items-center">
						<div className="flex flex-col justify-start lg:flex-row lg:justify-end lg:mt-0 mt-2 lg:mb-0 mb-5 ">
								<Button asChild className="shadow-lg shadow-primary/50 ">
									<Link asChild href="/dashboard/create-dashboard">
										<PenLine className="w-4 mr-2 " /> 
										<span className="mr-2">Create dashboard</span>
									</Link>
								</Button>
						</div>
						</div>
					</div> */}
					<div className="relative">
						<DataTable
							// isPerluValidasi={searchParams.validasi === 'perlu_validasi' ? true : false}
							columns={columns}
							data={data}
							totalData={data.length}
							totalContent={10}
							limit={10}
							token={token}
		
						/>
					</div>
			</div>
		</div>
	);
};

export default dashboard;
