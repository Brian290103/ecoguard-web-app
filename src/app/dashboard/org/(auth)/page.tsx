import { SiteHeaderSetter } from "../../_components/SiteHeaderSetter";
import { ClientPage } from "./client.page";
import EventsPage from "./events/page";
import ReportsPage from "./reports/page";
import ResourcesPage from "./resources/page";

const Page = () => {
  const tabs = [
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
      <SiteHeaderSetter title="Organisation: Dashboard" />

      <ClientPage tabs={tabs} />
    </div>
  );
};

export default Page;
