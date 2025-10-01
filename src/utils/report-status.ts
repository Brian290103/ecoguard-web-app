import type { reportStatusEnum } from "@/db/schemas/report";

type ReportStatus = (typeof reportStatusEnum.enumValues)[number];

export const getReportStatusInfo = (status: ReportStatus) => {
  switch (status) {
    case "submitted":
      return {
        title: "Report Submitted",
        description:
          "Your report has been successfully submitted and is awaiting review.",
      };
    case "acknowledged":
      return {
        title: "Report Acknowledged",
        description:
          "Your report has been acknowledged by an authority and is pending action.",
      };
    case "inprogress":
      return {
        title: "Resolution in Progress",
        description:
          "A team has been assigned and is actively working on resolving the issue.",
      };
    case "escalated":
      return {
        title: "Report Escalated",
        description:
          "The report has been escalated to a higher authority for further action.",
      };
    case "claimed":
      return {
        title: "Report Claimed",
        description:
          "An organization has claimed the responsibility to resolve this report.",
      };
    case "resolved":
      return {
        title: "Report Resolved",
        description:
          "The issue has been resolved. Thank you for your contribution!",
      };
    default:
      return {
        title: "Unknown Status",
        description: "The report status is unknown.",
      };
  }
};
