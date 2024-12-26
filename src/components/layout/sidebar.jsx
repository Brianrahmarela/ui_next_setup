"use client";

import React, { useState } from "react";
import { SideNav } from "@/components/layout/side-nav";
import { cn } from "@/lib/utils";
import { useSidebar } from "../hooks/useSidebar";
import { useMenuParent } from "../hooks/useMenuParent";
import Image from "next/image";

function Sidebar({ className }) {
  const { isOpen, toggle } = useSidebar();
  const [swith, setSwitch] = useState(false);
  const { menuParent } = useMenuParent();

  const handleToggle = () => {
    setSwitch(true);
    toggle();
    setTimeout(() => setSwitch(false), 500);
  };

  return (
    <nav
      className={cn(
        `relative hidden h-screen pt-10 md:block bg-[#F5F6FA] z-50`,
        swith && "duration-500",
        isOpen ? "w-60" : "w-[78px]",
        className
      )}>
      <div className="mt-34 absolute inset-y-0 right-[-60px] top-[22px]">
        <Image
          className="cursor-pointer"
          onClick={handleToggle}
          src="/icons/menu.svg"
          alt="icon menu"
          width={20}
          height={20}
        />
      </div>
      <div className={`${isOpen ? "px-5" : "px-3"}`}>
        <Image
          priority
          alt="logo"
          src={isOpen ? "/images/logo.png" : "/images/logo-small.png"}
          width={isOpen ? 100 : 60}
          height={isOpen ? 100 : 20}
        />
      </div>
      <div className="space-y-4 py-4">
        <div className={`${isOpen ? "px-5" : "px-3"} py-2`}>
          <div className="space-y-1">
            <SideNav
              className="text-background opacity-0 transition-all duration-200 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={menuParent}
              isMobile={false}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
