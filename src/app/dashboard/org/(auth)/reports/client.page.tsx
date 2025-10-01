"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";
import type { serverClient } from "@/app/_trpc/server-client";
import SingleReportClientPage from "@/app/dashboard/user/reports/[id]/client.page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReportsClientPage = ({
  initialReports,
}: {
  initialReports: Awaited<ReturnType<typeof serverClient.report.getAllReports>>;
}) => {
  const router = useRouter();
  const { data: reports } = trpc.report.getAllReports.useQuery(undefined, {
    initialData: initialReports,
  });

  const utils = trpc.useUtils();
  const updateReportMutation = trpc.report.updateReport.useMutation({
    onSuccess: () => {
      utils.report.getAllReports.invalidate();
    },
  });

  const handleStatusUpdate = (id: string, status: "claimed") => {
    updateReportMutation.mutate({ id, status });
    toast.success(`Status updated to ${status}`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Reports [{reports.length}]</CardTitle>
          <CardDescription>
            View and manage all submitted environmental reports. Track
            incidents, monitor responses, and analyze environmental data.
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {reports.map((report) => (
          <AccordionItem key={report.id} value={report.id}>
            <AccordionTrigger className="hover:no-underline p-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span className="font-semibold">#{report.reportNumber}</span>
                  <span>{report.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{report.status}</Badge>
                  <Badge
                    variant={
                      report.priority === "high"
                        ? "destructive"
                        : report.priority === "medium"
                          ? "pending"
                          : "default"
                    }
                  >
                    {report.priority}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex w-full flex-col gap-3">
              <Card>
                <CardHeader>
                  <CardTitle>Report Actions</CardTitle>
                  <CardDescription>
                    Available actions to manage and update this report's status
                  </CardDescription>
                  <CardAction>
                    {report.status === "escalated" && (
                      <Button
                        onClick={() => handleStatusUpdate(report.id, "claimed")}
                        disabled={updateReportMutation.isPending}
                      >
                        {updateReportMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Claim"
                        )}
                      </Button>
                    )}
                    {report.status === "claimed" && (
                      <Button
                        onClick={() =>
                          router.push(
                            `/dashboard/org/reports/${report.id}/resolve`,
                          )
                        }
                      >
                        Resolve
                      </Button>
                    )}
                  </CardAction>
                </CardHeader>
              </Card>
              <SingleReportClientPage singleReport={report} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ReportsClientPage;
