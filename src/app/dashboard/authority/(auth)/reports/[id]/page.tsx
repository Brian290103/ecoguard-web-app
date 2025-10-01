import { serverClient } from "@/app/_trpc/server-client";
import SingleReportClientPage from "@/app/dashboard/user/reports/[id]/client.page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SingleReportPage = async ({ params }: { params: { id: string } }) => {
  const singleReport = await serverClient.report.getReportById({
    id: params.id,
  });
  console.log(singleReport);

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>{singleReport.title}</CardTitle>
          <CardDescription>
            {new Date(singleReport.createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}

            <Badge className="capitalize ms-2">{singleReport.status}</Badge>
          </CardDescription>
          <CardAction>
            <Button>{}</Button>
          </CardAction>
        </CardHeader>
      </Card>

      <SingleReportClientPage singleReport={singleReport} />
    </div>
  );
};

export default SingleReportPage;
