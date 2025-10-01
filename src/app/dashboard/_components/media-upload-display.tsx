"use client";

import { Box, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadDropzone } from "@/utils/uploadthing";

interface MediaFile {
  name: string;
  size: number;
  type: string;
  ufsUrl: string;
}

interface UploadThingFile {
  name: string;
  size: number;
  type: string;
  ufsUrl: string;
}

interface MediaUploadDisplayProps {
  imageUrls: MediaFile[];
  videoUrls: MediaFile[];
  handleMediaUploadComplete: (res: UploadThingFile[]) => void;
  removeImage: (fileToRemove: MediaFile) => void;
  removeVideo: (fileToRemove: MediaFile) => void;
}

export function MediaUploadDisplay({
  imageUrls,
  videoUrls,
  handleMediaUploadComplete,
  removeImage,
  removeVideo,
}: MediaUploadDisplayProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Upload Media</h3>
      <UploadDropzone
        className="ut-button:bg-primary ut-label:text-primary"
        endpoint="mediaUploader"
        onClientUploadComplete={handleMediaUploadComplete}
        onUploadError={(error: Error) => {
          if (error.message.includes("FileCountMismatch")) {
            toast.error("You can only upload up to 4 files at once");
          } else {
            toast.error(`Upload failed: ${error.message}`);
          }
        }}
      />
      {(imageUrls.length > 0 || videoUrls.length > 0) && (
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images">
              Images ({imageUrls.length})
            </TabsTrigger>
            <TabsTrigger value="videos">
              Videos ({videoUrls.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-4">
            {imageUrls.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Box className="w-12 h-12 mb-2" />
                <p>
                  No images uploaded yet. Upload some images to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageUrls.map((file: MediaFile) => (
                  <div key={file.ufsUrl} className="relative group">
                    <Image
                      src={file.ufsUrl}
                      alt={file.name}
                      width={160}
                      height={160}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(file)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            {videoUrls.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <Box className="w-12 h-12 mb-2" />
                <p>
                  No videos uploaded yet. Upload some videos to see them here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {videoUrls.map((file: MediaFile) => (
                  <div key={file.ufsUrl} className="relative group">
                    <video
                      src={file.ufsUrl}
                      controls
                      className="w-full h-40 object-cover rounded-lg"
                    >
                      <track
                        kind="captions"
                        srcLang="en"
                        label="English captions"
                      />
                    </video>
                    <button
                      type="button"
                      onClick={() => removeVideo(file)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
