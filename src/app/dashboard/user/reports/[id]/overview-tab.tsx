"use client";

import type { serverClient } from "@/app/_trpc/server-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapOverview } from "./map-overview";

type SingleReport = Awaited<
  ReturnType<typeof serverClient.report.getReportById>
>;

export const OverviewTab = ({
  singleReport,
}: {
  singleReport: SingleReport;
}) => {
  if (!singleReport) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No report data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{singleReport.title}</CardTitle>
        <p className="text-sm text-gray-500">
          Report Number:{" "}
          <span className="font-medium">{singleReport.reportNumber}</span>
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p>{singleReport.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Priority</h3>
            <Badge className="capitalize">{singleReport.priority}</Badge>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            <Badge className="capitalize">{singleReport.status}</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Location</h3>
          {singleReport.location ? (
            <MapOverview
              latitude={singleReport.location.lat}
              longitude={singleReport.location.long}
            />
          ) : (
            <p>No location data available.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {singleReport.categories?.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Created At</h3>
            <p>{new Date(singleReport.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
            <p>{new Date(singleReport.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
