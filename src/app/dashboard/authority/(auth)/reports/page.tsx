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

const ReportsPage = async () => {
  const reports = await serverClient.report.getAllReports();
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Geo-Located Environmental Reports</CardTitle>
          <CardDescription>
            Access and manage environmental incident reports from your assigned
            geographical area. Monitor local environmental issues and track
            report statuses based on location data.
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
      </Card>
      <ReportsClientPage initialReports={reports} />
    </div>
  );
};

export default ReportsPage;
