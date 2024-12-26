"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

export default function UserNav({ className, open, isOpen, dataMe }) {
  const router = useRouter();
  const handleLogOut = () => {
     deleteCookie("access_token");
    router.push("/login");
    // window.location.reload();
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
            " justify-between bg-white shadow-sm",
            className
          )}>
          <div className="flex items-center gap-x-3">
						<div>
							<b>John</b>
							<p className="text-xs text-[#828282]">Administrator</p>
						</div>
            <Avatar className=" h-10 w-10">
            <AvatarImage
              src={`images/avatar.png`}
              alt={"label"}
            />
            <Skeleton className="bg-gray-200">
              <AvatarFallback className="invisible">SC</AvatarFallback>
            </Skeleton>
          </Avatar>
          {(open || isOpen) && (
            <>
              <p className="text-primary">{dataMe[0]?.email}</p>
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50 text-primary" />
            </>
          )}
					</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={!isOpen && "ml-[78px]"}
        style={{ width: "264px" }}
        align="end"
        forceMount>
        <DropdownMenuLabel className="font-normal">
    
          {/* <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {dataMe[1]?.username}
            </p>
            <p className="text-xs leading-none text-primary">
              {dataMe[0]?.email}
            </p>
          </div> */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          Log out
          <DropdownMenuShortcut>
            <LogOut className="ml-2 h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <p>Exit</p>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}