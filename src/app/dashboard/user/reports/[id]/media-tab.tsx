"use client";

import { BoxIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MediaTabProps {
  imageUrls: string[];
  videoUrls: string[];
}

const MediaTab = ({ imageUrls, videoUrls }: MediaTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            View all images attached to this report
          </CardDescription>
        </CardHeader>
        <CardContent>
          {imageUrls?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={url}
                    alt={`Report Image ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <BoxIcon className="h-10 w-10 mb-2" />
              <p>No images have been uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Videos</CardTitle>
          <CardDescription>
            View all videos attached to this report
          </CardDescription>
        </CardHeader>
        <CardContent>
          {videoUrls?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoUrls.map((url, index) => (
                <div key={index} className="relative aspect-video">
                  <video
                    controls
                    className="w-full h-full rounded-lg"
                    src={url}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <BoxIcon className="h-10 w-10 mb-2" />
              <p>No videos have been uploaded</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaTab;
