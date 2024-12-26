"use client";

import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SideNav } from "@/components/layout/side-nav";
import { useMenuParent } from "../hooks/useMenuParent";
import { Separator } from "../ui/separator";
import { useSidebar } from "../hooks/useSidebar";
import Image from "next/image";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { menuParent } = useMenuParent();
  const { isOpen, toggle } = useSidebar();

  const handleOpen = () => {
    setOpen(!open);
    toggle(!isOpen);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpen} className="">
        <SheetTrigger asChild>
          <div className="flex items-center justify-center gap-2">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 bg-[#f5f6fa]">
          <div className="px-1 py-6 ">
            <Image
              priority
              alt="logo"
              src={"/images/logo.png"}
              width={80}
              height={80}
            />
            <div className="pb-10">
              <Separator className="mt-2" />
            </div>
            <SideNav items={menuParent} setOpen={setOpen} isMobile={true} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};