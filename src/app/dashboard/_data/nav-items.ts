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
      {
        name: "History",
        url: "/dashboard/user/history",
        icon: IconHistory,
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        name: "Community",
        url: "/dashboard/user/community",
        icon: IconUsersGroup,
      },
      {
        name: "Events",
        url: "/dashboard/user/events",
        icon: IconCalendarEvent,
      },
    ],
  },
  {
    label: "Engagement",
    items: [
      {
        name: "Resources",
        url: "/dashboard/user/resources",
        icon: IconBook,
      },
      {
        name: "Daily Quizzes",
        url: "/dashboard/user/quizzes",
        icon: IconQuestionMark,
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
    ],
  },
  {
    label: "Organization",
    items: [
      {
        name: "Reports",
        url: "/dashboard/org/reports",
        icon: IconFiles,
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
    ],
  },
  {
    label: "Reports",
    items: [
      {
        name: "All Reports",
        url: "/dashboard/authority/reports",
        icon: IconFiles,
      },
    ],
  },
];
