"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function UserMenu({ className, open, isOpen, dataMe }) {
  const router = useRouter();
  const handleLogOut = () => {
    deleteCookie("access_token");
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a team"
          className={cn(
            " justify-between bg-transparent shadow-none border-none p-2 m-0",
            className
          )}>
          <div className="flex items-center  gap-x-3">
            <div className="flex flex-col items-start">
              <p className="text-[16px] font-bold">John</p>
              <p className="text-[13px] text-[#828282] font-light">
                Administrator
              </p>
            </div>
            <div>
              <Avatar className=" h-10 w-10">
                <AvatarImage src={`images/avatar.png`} alt={"label"} />
                <Skeleton className="bg-gray-200 h-10 w-10">
                  <AvatarFallback className="invisible">SC</AvatarFallback>
                  {/* <AvatarImage src={`images/avatar.png`} alt={"label"} /> */}
                </Skeleton>
              </Avatar>
              {(open || isOpen) && (
                <>
                  <p className="text-primary">{dataMe[0]?.email}</p>
                  <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50 text-primary" />
                </>
              )}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={!isOpen && "ml-[78px]"}
        style={{ width: "164px" }}
        align="end"
        forceMount>
        <DropdownMenuItem onClick={handleLogOut}>
          Log out
          <DropdownMenuShortcut>
            <LogOut className="ml-2 h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
