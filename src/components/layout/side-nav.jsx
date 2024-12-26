import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "../hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/layout/subnav-accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import IconSubMenu from "../menu/IconSubMenu";

export function SideNav({ setOpen, className, isMobile }) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  let dummyMenu = [
    {
      id: 1,
      title: "home",
      icon: "Icons.home",
      href: "/home",
      hasChildren: false,
      description: "menu grosir",
      children: [],
    },
    // {
    //   id: 3,
    //   title: "Dashboard",
    //   icon: "Icons.dashboard",
    //   href: "/dashboard/tasks",
    //   hasChildren: true,
    //   description: "menu agent",
    //   children: [
    //     {
    //       id: 7,
    //       title: "Tasks",
    //       icon: "Icons.tasks",
    //       href: "/dashboard/tasks",
    //       hasChildren: false,
    //       description: "menu task",
    //       children: [],
    //     },
    //     {
    //       id: 11,
    //       title: "Report",
    //       icon: "Icons.report",
    //       href: "/dashboard/report",
    //       hasChildren: false,
    //       description: "menu report",
    //       children: [],
    //     },
    //   ],
    // },
  ];

  return (
    <nav className="space-y-2">
      {dummyMenu.map((item) =>
        item.hasChildren ? (
          <Accordion
            type="single"
            collapsible
            className="space-y-2"
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "group relative flex h-12 justify-between px-4 py-2 text-md text-[#6E82A5] duration-200  hover:text-[#6E82A5] hover:bg-white hover:no-underline"
                )}
              >
                <div className="md:block hidden">
                  {item.icon && (
                    <IconSubMenu subMenu={item} className={cn("h-5 w-5 text-[#6E82A5]", path.includes(item.href) ? "group-hover:text-white" : item.color)} />
                  )}
                </div>
                <div className={cn("block md:!hidden")}>
                  {item.icon && (
                      <IconSubMenu subMenu={item} className={cn("h-5 w-5 text-[#6E82A5]", path.includes(item.href) ? "group-hover:text-white" : item.color)} />
                    )}
                </div>
                <div
                  className={cn(
                    `absolute left-12 text-[#6E82A5] duration-200  ${path.includes(item.href) && 'group-hover:text-white '}`,
                    !isOpen && className
                  )}
                >
                  {item.title}
                </div>
                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-[#6E82A5] transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="ml-4 mt-2 space-y-4 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                      // customRevalidatePath(child.href);
                    }}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "group flex h-12 justify-start gap-x-3  hover:bg-white text-[#6E82A5]",
                      path === child.href && "bg-primary text-white font-semibold hover:bg-primary hover:text-white",
                      !isOpen && 'm-0 p-0 pl-2'
                    )}
                  >
                    {child.icon && (
                      <IconSubMenu subMenu={child} path={path}/>
                    )}
                    <div
                      className={cn(
                        `text-[#6E82A5] text-[15.5px] duration-200 group-hover:text-[#6E82A5] ${path === child.href && 'group-hover:text-white text-[15.5px]'}`,
                        (!isOpen && !isMobile) && `${className} absolute group-hover:ml-10` 
                      )}
                    >  
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
              // customRevalidatePath(item.href);
            }}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "group relative flex h-12 justify-start group-hover:text-white hover:bg-primary ",
              path.includes(item.href) && "bg-white text-primary font-semibold hover:bg-primary hover:text-white rounded-lg"
            )}
          >
            {item.icon && <IconSubMenu subMenu={item} path={path} />}
            <span
              className={cn(
                `absolute left-12 text-base duration-200 ${path.includes(item.href) && 'group-hover:text-white'}`,
                !isOpen && className
              )}
            >
              {item.title}
            </span>
          </Link>
        )
      )}
    </nav>
  );
}