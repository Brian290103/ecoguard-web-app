"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { trpc } from "@/app/_trpc/client";
import Alert from "@/components/alert";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/use-debounce";
import { authClient } from "@/lib/auth-client";
import { generateReportNumber } from "@/lib/utils";
import { MediaUploadDisplay } from "./media-upload-display";

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

const DEFAULT_CATEGORIES: string[] = [];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high"]),
  imageUrls: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        ufsUrl: z.string(),
      }),
    )
    .min(1, "At least 1 images are required"),
  videoUrls: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        ufsUrl: z.string(),
      }),
    )
    .min(1, "At least 1 video is required"),
});

type ReportFormValues = z.infer<typeof formSchema>;

export function ReportForm() {
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  const [isGeneratingCategories, setIsGeneratingCategories] = useState(false);
  const [generatedCategories, setGeneratedCategories] = useState<string[]>([]);

  const { data: session } = authClient.useSession();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Illegal Dumping of Waste Near River",
      location: { lat: -1.286389, long: 36.817223 }, // Nairobi city center coords
      categories: ["Waste Management", "Pollution"], // realistic categories
      description:
        "A large pile of waste has been dumped near the Nairobi River, posing a threat to local wildlife and water quality.",
      priority: "medium",
      imageUrls: [
        {
          name: "nairobi-river-waste.jpg",
          size: 204800,
          type: "image/jpeg",
          ufsUrl:
            "https://via.placeholder.com/600x400?text=Nairobi+River+Waste",
        },
      ],
      videoUrls: [
        {
          name: "waste-video.mp4",
          size: 1048576,
          type: "video/mp4",
          ufsUrl:
            "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        },
      ],
    },

    // defaultValues: {
    //   title: "",
    //   location: { lat: 0, long: 0 },
    //   categories: [],
    //   description: "",
    //   priority: "low",
    //   imageUrls: [] as MediaFile[],
    //   videoUrls: [] as MediaFile[],
    // },
  });

  const title = form.watch("title");
  const description = form.watch("description");
  const imageUrls = form.watch("imageUrls") || [];
  const videoUrls = form.watch("videoUrls") || [];

  const debouncedTitle = useDebounce(title, 500);
  const debouncedDescription = useDebounce(description, 500);

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

  const generateCategories = async () => {
    if (!debouncedTitle || !debouncedDescription) {
      return;
    }

    setIsGeneratingCategories(true);
    try {
      const response = await fetch("/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Title: ${debouncedTitle}\nDescription: ${debouncedDescription}`,
          prompt: `Based on the following title and description, suggest minimum of 10 relevant environmental categories or tags. Provide them as a comma-separated list. For example: "Waste Management, Pollution, Deforestation".\nTitle: ${debouncedTitle}\nDescription: ${debouncedDescription}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate categories");
      }

      const data = await response.json();
      const newCategories = data.response
        .split(",")
        .map((cat: string) => cat.trim())
        .filter(Boolean);
      setGeneratedCategories(newCategories);
      form.setValue("categories", newCategories);
    } catch (error) {
      console.error("Error generating categories:", error);
      toast.error("Failed to generate categories. Please try again.");
    } finally {
      setIsGeneratingCategories(false);
    }
  };

  useEffect(() => {
    if (debouncedTitle && debouncedDescription) {
      // generateCategories();
    }
  }, [debouncedTitle, debouncedDescription]);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("location.lat", position.coords.latitude);
          form.setValue("location.long", position.coords.longitude);
          setLocationError(null);
          setLocationPermissionGranted(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationPermissionGranted(false);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError(
                "User denied the request for Geolocation. Please enable location services in your browser settings to use this feature.",
              );
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setLocationError("The request to get user location timed out.");
              break;
            default:
              setLocationError("An unknown error occurred.");
              break;
          }
        },
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
      setLocationPermissionGranted(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const { mutate: createReport, isPending } =
    trpc.report.createReport.useMutation({
      onMutate: async (variables) => {
        console.log("📤 Report values being submitted:", variables);
      },
      onSuccess: (data) => {
        console.log("✅ Report successfully created:", data);
        toast.success("Report submitted successfully!");
      },
      onError: (error, variables) => {
        console.error("❌ Failed report submission:", variables, error);
        toast.error(`Failed to submit report: ${error.message}`);
      },
    });
  function onSubmit(values: ReportFormValues) {
    if (!session) {
      toast.error("You are not authenticated");
      return;
    }

    if (values.location.lat === 0 && values.location.long === 0) {
      toast.error("Please allow location permission first to continue.");
      return;
    }

    const formattedValues = {
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      submittedByUserId: session.user.id,
      reportNumber: generateReportNumber(),

      // ✅ ensure location is a JSON object (not a string)
      location: {
        lat: values.location.lat,
        long: values.location.long,
      },

      // ✅ make sure categories is an array
      categories: Array.isArray(values.categories) ? values.categories : [],

      // ✅ plain arrays of strings
      imageUrls: (values.imageUrls || []).map((file) => file.ufsUrl),
      videoUrls: (values.videoUrls || []).map((file) => file.ufsUrl),
    };

    console.log("📤 Submitting formatted report:", formattedValues);
    createReport(formattedValues);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {" "}
        <Card>
          <CardHeader>
            <CardTitle>Submit Environmental Report</CardTitle>
            <CardDescription>
              Report environmental issues in your area to help protect our
              ecosystem
            </CardDescription>
            <CardAction>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    Submitting...
                    <Loader className="ml-2  h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit
                    <SendIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Report Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {locationError && !locationPermissionGranted && (
              <Alert
                variant="destructive"
                message="Location access is required to submit a report. Please enable location services for this site by clicking the lock icon in your browser's address bar and updating the site permissions."
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the report..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        ...DEFAULT_CATEGORIES,
                        ...generatedCategories.filter(
                          (cat) => !DEFAULT_CATEGORIES.includes(cat),
                        ),
                      ]}
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Select categories"
                      disabled={isGeneratingCategories}
                    />
                  </FormControl>
                  <FormDescription>
                    Select from predefined categories or add your own.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["low", "medium", "high"].map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          <span className="capitalize">{priority}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(form.formState.errors.imageUrls ||
              form.formState.errors.videoUrls) && (
              <Alert
                variant="destructive"
                message="Please upload at least 2 images and 1 video to submit the report."
              />
            )}

            <MediaUploadDisplay
              imageUrls={imageUrls}
              videoUrls={videoUrls}
              handleMediaUploadComplete={handleMediaUploadComplete}
              removeImage={removeImage}
              removeVideo={removeVideo}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
