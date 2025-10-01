import {
  IconBook, // New icon for Community
  IconCalendarEvent,
  IconChartBar,
  IconDashboard,
  IconFilePencil,
  IconFiles,
  IconHistory,
  IconQuestionMark,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { CirclePlus } from "lucide-react";

export const userNavItems = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        url: "/dashboard/user",
        icon: IconDashboard,
      },
    ],
  },
  {
    label: "Reports",
    items: [
      {
        name: "My Reports",
        url: "/dashboard/user/reports",
        icon: IconFiles,
      },
      {
        name: "Create Report",
        url: "/dashboard/user/create-report",
        icon: IconFilePencil,
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        name: "Resources",
        url: "/dashboard/user/resources",
        icon: IconBook,
      },
      {
        name: "Events",
        url: "/dashboard/user/events",
        icon: IconCalendarEvent,
      },
    ],
  },
];

export const adminNavItems = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        url: "/dashboard/admin",
        icon: IconDashboard,
      },
      {
        name: "Analytics",
        url: "/dashboard/admin/analytics",
        icon: IconChartBar,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        name: "Manage Users",
        url: "/dashboard/admin/users",
        icon: IconUsers,
      },
    ],
  },
];

export const orgNavItems = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        url: "/dashboard/org",
        icon: IconDashboard,
      },
      {
        name: "Reports",
        url: "/dashboard/org/reports",
        icon: IconFiles,
      },
      {
        name: "Resources",
        url: "/dashboard/org/resources",
        icon: IconBook,
      },
      {
        name: "Events",
        url: "/dashboard/org/events",
        icon: IconCalendarEvent,
      },
    ],
  },
];

export const authorityNavItems = [
  {
    label: "Dashboard",
    items: [
      {
        name: "Overview",
        url: "/dashboard/authority",
        icon: IconDashboard,
      },
      {
        name: "Reports",
        url: "/dashboard/authority/reports",
        icon: IconFiles,
      },
      {
        name: "Resources",
        url: "/dashboard/authority/resources",
        icon: IconBook,
      },
      {
        name: "Events",
        url: "/dashboard/authority/events",
        icon: IconCalendarEvent,
      },
    ],
  },
];
