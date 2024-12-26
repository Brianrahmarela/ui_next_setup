import React from "react";
import { API } from "@/config";
import { cookies } from "next/headers";
import FormCreatehome from "@/components/home/create-home/form-create-home";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const getProfile = async (token) => {
  const response = await API.GET("/me", token);
  return response;
};

const getDataStores = async (token, params) => {
  const response = await API.GET("/stores", token, params);
  return response.data;
};
const getDataBrands = async (token, params) => {
  const response = await API.GET("/brands", token, params);
  return response.data;
};
const getDataChannels = async (token, params) => {
  const response = await API.GET("/channels", token, params);
  return response.data;
};
const getDataComponents = async (token, params) => {
  const response = await API.GET("/review/components", token, params);
  return response.data;
};

const Createhome = async ({ searchParams }) => {
  const token = cookies().get("access_token")?.value;

  if (token) {
    const data = await getProfile(token);
    if (!data.success) {
      redirect("/login");
    }
  } else {
    redirect("/login");
  }

  const paramsStoreBrandPlatform = {
    page: 1,
    data: 10,
    sort_key: "id",
    sort_value: "ASC",
  };

  const paramsStore = {
    ...paramsStoreBrandPlatform,
    ...(searchParams.store && searchParams.store !== ""
      ? { term: searchParams.store }
      : null),
  };
  const dataStores = await getDataStores(token, paramsStore);

  const paramsBrands = {
    ...paramsStoreBrandPlatform,
    ...(searchParams.brand && searchParams.brand !== ""
      ? { term: searchParams.brand }
      : null),
  };

  const dataBrands = await getDataBrands(token, paramsBrands);
  // console.log(dataBrands);

  const paramsChannels = {
    ...paramsStoreBrandPlatform,
    ...(searchParams.channel && searchParams.channel !== ""
      ? { term: searchParams.channel }
      : null),
  };

  const dataChannels = await getDataChannels(token, paramsChannels);
  const dataComponents = await getDataComponents(token, null);

  return (
    <div className="flex flex-col ">
      <div className="flex-1 ">
        <div className="col-span-12 sm:pt-0 sm:col-span-6 items-center sm:hidden mb-6">
          <div className="flex justify-start ">
            <Button
              type="outline"
              asChild
              className="text-primary border border-primary bg-white hover:bg-primary/10 hover:text-primary">
              <Link asChild href="/home">
                <MoveLeft className="w-6" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12  space-y-2 mb-2">
          <div className="col-span-12 sm:col-span-6">
            <h2 className="text-xl font-semibold mb-[2px]">
              Create New home
            </h2>
            <p className="text-sm text-[#828282]">
              Fill form to create home
            </p>
          </div>
          <div className="col-span-12 sm:pt-0 sm:col-span-6 items-center sm:block hidden">
            <div className="flex justify-end ">
              <Button
                type="outline"
                asChild
                className="w-[110px] text-primary border border-primary bg-white hover:bg-primary/10 hover:text-primary">
                <Link asChild href="/home">
                  <MoveLeft className="w-5 mr-3 " />
                  <span className="mr-1">Back</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      <div className="mt-10 relative">
        <FormCreatehome
          token={token}
          outletOpt={dataStores.data}
          brandOpt={dataBrands.data}
          channelOpt={dataChannels.data}
		      sumberOpt={dataComponents.sources}
          kategoriOpt={dataComponents.review_home_categories}
          subKategoriOpt={dataComponents.review_home_sub_categories}
          solusiOpt={dataComponents.review_solutions}
          responsibleDeptOpt={dataComponents.review_responsible_departments}
        />
      </div>
      </div>
    </div>
  );
};

export default Createhome;
