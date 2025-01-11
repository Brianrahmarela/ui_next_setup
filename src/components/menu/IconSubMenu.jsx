"use client";
import React from "react";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";

const IconSubMenu = ({ subMenu, path }) => {
  const IconComponent = Icons[subMenu.icon.split(".")[1]];

  return <IconComponent className={cn("h-5 w-5 group-hover:text-white", path === subMenu.href ? "group-hover:text-white" : subMenu.color)}/>;
};

export default IconSubMenu;