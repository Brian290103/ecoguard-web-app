"use client";
import { trpc } from "@/app/_trpc/client";
import type { serverClient } from "@/app/_trpc/server-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "./table";

const ReportsClientPage = ({
  initialReports,
}: {
  initialReports: Awaited<ReturnType<typeof serverClient.report.getAllReports>>;
}) => {
  const { data: reports } = trpc.report.getAllReports.useQuery(undefined, {
    initialData: initialReports,
  });

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Reports [{reports.length}]</CardTitle>
          <CardDescription>
            View and manage all submitted environmental reports. Track
            incidents, monitor responses, and analyze environmental data.
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full relative">
          <DataTable data={reports!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsClientPage;
