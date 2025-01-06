import React from "react";
// import { API } from "@/config";
// import { cookies } from "next/headers";
import FormAddUser from "@/components/home/add-user/form-add-user";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const Createhome = async ({ searchParams }) => {
  // const token = cookies().get("access_token")?.value;

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
            <h2 className="text-xl font-semibold mb-[2px]">Add New User</h2>
            <p className="text-sm text-[#828282]">Fill form to create user</p>
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
          <FormAddUser />
        </div>
      </div>
    </div>
  );
};

export default Createhome;
