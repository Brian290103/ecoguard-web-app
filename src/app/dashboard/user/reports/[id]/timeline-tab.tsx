"use client";

import type { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import type { selectReportHistorySchema } from "@/db/schemas/report-history";
import { getReportStatusInfo } from "@/utils/report-status";

type ReportHistory = z.infer<typeof selectReportHistorySchema>;

export const TimelineTab = ({
  reportHistory,
}: {
  reportHistory: ReportHistory[] | undefined;
}) => {
  if (!reportHistory || reportHistory.length === 0) {
    return <div>No history found.</div>;
  }

  return (
    <Card>
      <CardContent>
        <Timeline>
          {reportHistory.map((item, index) => {
            const statusInfo = getReportStatusInfo(item.status as any);
            return (
              <TimelineItem key={item.id} step={index + 1} className=" ">
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineDate className="">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TimelineDate>
                  <TimelineTitle className="sm:-mt-0.5">
                    {statusInfo.title}
                  </TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent>{statusInfo.description}</TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </CardContent>
    </Card>
  );
};
