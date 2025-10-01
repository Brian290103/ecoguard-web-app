"use client";

import Image from "next/image";
import type { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { selectResolutionReportSchema } from "@/db/schemas/resolution-report";

type ResolutionReport = z.infer<typeof selectResolutionReportSchema>;

export const ResolutionTab = ({
  resolutionReport,
  reportStatus,
}: {
  resolutionReport: ResolutionReport | undefined;
  reportStatus: string;
}) => {
  if (reportStatus !== "resolved") {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            The report has not yet been resolved.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!resolutionReport) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No resolution details available.
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasImages =
    resolutionReport.imageUrls && resolutionReport.imageUrls.length > 0;
  const hasVideos =
    resolutionReport.videoUrls && resolutionReport.videoUrls.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{resolutionReport.title}</CardTitle>
        <CardDescription>
          Resolved on:{" "}
          {new Date(resolutionReport.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{resolutionReport.description}</p>

        {(hasImages || hasVideos) && (
          <Tabs defaultValue={hasImages ? "images" : "videos"} className="mt-4">
            <TabsList>
              {hasImages && <TabsTrigger value="images">Images</TabsTrigger>}
              {hasVideos && <TabsTrigger value="videos">Videos</TabsTrigger>}
            </TabsList>

            {hasImages && (
              <TabsContent value="images" className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {resolutionReport.imageUrls!.map((url) => (
                    <div key={url} className="relative aspect-square">
                      <Image
                        src={url}
                        alt="Resolution report image"
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {hasVideos && (
              <TabsContent value="videos" className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  {resolutionReport.videoUrls!.map((url) => (
                    <div key={url}>
                      <video controls className="w-full h-auto rounded-md">
                        <source src={url} type="video/mp4" />
                        <track
                          kind="captions"
                          src={`${url}.vtt`}
                          srcLang="en"
                          label="English"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
