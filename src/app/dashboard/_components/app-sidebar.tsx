"use client";

import { IconHelp, IconPlant, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import type * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  adminNavItems,
  authorityNavItems,
  orgNavItems,
  userNavItems,
} from "../_data/nav-items";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const navSecondary = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: IconSettings,
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: IconHelp,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = user?.role;

  let mainNavItems = [];

  switch (userRole) {
    case "admin":
      mainNavItems = adminNavItems;
      break;
    case "user":
      mainNavItems = userNavItems;
      break;
    case "org":
      mainNavItems = orgNavItems;
      break;
    case "authority":
      mainNavItems = authorityNavItems;
      break;
    default:
      mainNavItems = [];
      break;
  }

  return (
    <Sidebar className="border-e" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconPlant className="!size-5" />
                <span className="text-base font-semibold">EcoGuard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {mainNavItems.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
