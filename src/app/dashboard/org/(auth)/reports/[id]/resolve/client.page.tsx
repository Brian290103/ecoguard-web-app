"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { trpc } from "@/app/_trpc/client";
import { MediaUploadDisplay } from "@/app/dashboard/_components/media-upload-display";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrls: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        ufsUrl: z.string(),
      }),
    )
    .optional(),
  videoUrls: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        ufsUrl: z.string(),
      }),
    )
    .optional(),
});

const ResolutionReportClientPage = ({
  reportId,
  userId,
}: {
  reportId: string;
  userId: string;
}) => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrls: [],
      videoUrls: [],
    },
  });

  const imageUrls = form.watch("imageUrls") || [];
  const videoUrls = form.watch("videoUrls") || [];

  const handleMediaUploadComplete = (res: UploadThingFile[]) => {
    res.forEach((file) => {
      const mediaFile: MediaFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        ufsUrl: file.ufsUrl,
      };

      if (file.type.startsWith("image/")) {
        const currentImages = form.getValues("imageUrls") || [];
        form.setValue("imageUrls", [...currentImages, mediaFile]);
      } else if (file.type.startsWith("video/")) {
        const currentVideos = form.getValues("videoUrls") || [];
        form.setValue("videoUrls", [...currentVideos, mediaFile]);
      }
    });
    toast.success("Media uploaded successfully");
  };

  const removeImage = (fileToRemove: MediaFile) => {
    const currentImages = form.getValues("imageUrls") || [];
    form.setValue(
      "imageUrls",
      currentImages.filter((file) => file.ufsUrl !== fileToRemove.ufsUrl),
    );
  };

  const removeVideo = (fileToRemove: MediaFile) => {
    const currentVideos = form.getValues("videoUrls") || [];
    form.setValue(
      "videoUrls",
      currentVideos.filter((file) => file.ufsUrl !== fileToRemove.ufsUrl),
    );
  };

  const updateReportMutation = trpc.report.updateReport.useMutation({
    onSuccess: () => {
      utils.report.getAllReports.invalidate();
      toast.success("Report status updated to resolved.");
      router.push("/dashboard/org/reports");
    },
    onError: (error) => {
      toast.error("Failed to update report status: " + error.message);
    },
  });

  const createResolutionReportMutation =
    trpc.resolutionReport.createResolutionReport.useMutation({
      onSuccess: () => {
        toast.success("Resolution report submitted successfully.");
        updateReportMutation.mutate({ id: reportId, status: "resolved" });
      },
      onError: (error) => {
        toast.error("Failed to submit resolution report: " + error.message);
      },
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      title: values.title,
      description: values.description,
      reportId,
      userId,
      imageUrls: (values.imageUrls || []).map((file) => file.ufsUrl),
      videoUrls: (values.videoUrls || []).map((file) => file.ufsUrl),
    };
    createResolutionReportMutation.mutate(formattedValues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Resolution Report</CardTitle>
        <CardDescription>
          Provide details about how the report was resolved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Resolution Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the resolution..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <MediaUploadDisplay
              imageUrls={imageUrls}
              videoUrls={videoUrls}
              handleMediaUploadComplete={handleMediaUploadComplete}
              removeImage={removeImage}
              removeVideo={removeVideo}
            />

            <Button
              type="submit"
              disabled={
                createResolutionReportMutation.isPending ||
                updateReportMutation.isPending
              }
            >
              {(createResolutionReportMutation.isPending ||
                updateReportMutation.isPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Resolution
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResolutionReportClientPage;
