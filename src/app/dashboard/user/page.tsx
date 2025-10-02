import { SiteHeaderSetter } from "../_components/SiteHeaderSetter";
import { ClientPage } from "./client.page";
import CreateReportPage from "./create-report/page";
import EventsPage from "./events/page";
import ReportsPage from "./reports/page";
import ResourcesPage from "./resources/page";

const Page = () => {
  const tabs = [
    {
      title: "Create Report",
      value: "create-report",
      content: <CreateReportPage />,
    },
    {
      title: "Reports",
      value: "reports",
      content: <ReportsPage />,
    },
    {
      title: "Resources",
      value: "resources",
      content: <ResourcesPage />,
    },
    {
      title: "Events",
      value: "events",
      content: <EventsPage />,
    },
  ];

  return (
    <div>
      {" "}
      <SiteHeaderSetter title="User: Dashboard" />
      <ClientPage tabs={tabs} />
    </div>
  );
};

export default Page;
