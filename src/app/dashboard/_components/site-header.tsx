"use client";

import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavTitleStore } from "@/store/nav-title-store";

export function SiteHeader() {
  const { title } = useNavTitleStore();

  return (
    <header className="flex sticky z-50 top-0 bg-background left-0 right-0 h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-2" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* PAGE TITLE FROM ZUSTAND */}
        <h1 className="text-base font-medium">{title}</h1>
        {/* PAGE TITLE FROM ZUSTAND */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className=" ">
            <Bell />
          </Button>
          <Button variant="destructive" size="sm" className=" ">
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
}
