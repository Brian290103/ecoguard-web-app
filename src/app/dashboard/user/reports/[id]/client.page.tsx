"use client";

import {
  ChartBar,
  Clock,
  Image,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import type { serverClient } from "@/app/_trpc/server-client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MediaTab from "./media-tab";
import { OverviewTab } from "./overview-tab";
import { ResolutionTab } from "./resolution-tab";
import { TimelineTab } from "./timeline-tab";

const SingleReportClientPage = ({
  singleReport,
}: {
  singleReport: Awaited<ReturnType<typeof serverClient.report.getReportById>>;
}) => {
  console.log("singleReport", singleReport);
  return (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <Card>
          <CardContent>
            <TabsList className="min-w-3/4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Media
              </TabsTrigger>
              {/*<TabsTrigger value="results" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Results
              </TabsTrigger>*/}
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger
                value="resolution"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Resolution
              </TabsTrigger>
              {/*<TabsTrigger value="comments" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Comments
              </TabsTrigger>*/}
            </TabsList>
          </CardContent>
        </Card>
        <TabsContent value="overview">
          <OverviewTab singleReport={singleReport} />
        </TabsContent>
        <TabsContent value="media">
          <MediaTab
            imageUrls={singleReport?.imageUrls!}
            videoUrls={singleReport?.videoUrls!}
          />
        </TabsContent>
        {/*<TabsContent value="results">
          <div className="py-4">Results content goes here</div>
        </TabsContent>*/}
        <TabsContent value="timeline">
          <TimelineTab reportHistory={singleReport?.history} />
        </TabsContent>
        <TabsContent value="resolution">
          <ResolutionTab
            resolutionReport={singleReport?.resolutionReport}
            reportStatus={singleReport?.status!}
          />
        </TabsContent>
        {/*<TabsContent value="comments">
          <div className="py-4">Comments content goes here</div>
        </TabsContent>*/}
      </Tabs>
    </div>
  );
};

export default SingleReportClientPage;
