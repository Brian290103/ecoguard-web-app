import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { serverClient } from "@/app/_trpc/server-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReportsClientPage from "./client.page";
import { SiteHeaderSetter } from "../../_components/SiteHeaderSetter";

const ReportsPage = async () => {
  const reports = await serverClient.report.getAllReports();
  return (
    <div className="flex flex-col gap-3">
      {" "}
      <SiteHeaderSetter title="User: Reports" />
      <Card>
        <CardHeader>
          <CardTitle>My Submittted Reports</CardTitle>
          <CardDescription>
            View and manage your submitted environmental incident reports. Track
            the status and details of each report you've created.
          </CardDescription>
          <CardAction>
            <Link href="/dashboard/user/create-report">
              <Button>
                <CirclePlus />
                Create a Report
              </Button>
            </Link>
          </CardAction>
        </CardHeader>
      </Card>
      <ReportsClientPage initialReports={reports} />
    </div>
  );
};

export default ReportsPage;
