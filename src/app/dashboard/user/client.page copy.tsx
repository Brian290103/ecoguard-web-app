"use client";

import { useEffect } from "react";
import Alert from "@/components/alert";
import { useNavTitleStore } from "@/store/nav-title-store";
import Communities from "../_components/communities";
import CreateReport from "../_components/create-report";
import LatestResources from "../_components/latest-resources";
import StatisticCard from "../_components/statistics-card";
import WelcomeBanner from "../_components/welcome-banner";

const ClientPage = () => {
  const { setTitle } = useNavTitleStore();
  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Alert
        message="Your Report has been resolved"
        variant="success"
        link={{
          href: "/user/reports",
          text: "View Reports",
        }}
      />
      <WelcomeBanner />
      <StatisticCard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <CreateReport />
        <Communities />
      </div>

      <LatestResources />
    </div>
  );
};

export default ClientPage;
