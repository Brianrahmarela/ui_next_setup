"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import UserMenu from "./user-menu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-1 supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-40 border-b bg-background/95 backdrop-blur h-16 ">
      <header className="w-full border-b-slate-200">
        <div className="flex items-center justify-between pr-[10px] lg:pr-12">
          <nav className="flex h-16 items-center justify-start px-4">
              <div className={cn("block md:!hidden")}>
                  <MobileSidebar />
              </div>
            </nav>
          <UserMenu className="h-full" isOpen={isOpen} />
        </div>
      </header>
    </div>
  );
}