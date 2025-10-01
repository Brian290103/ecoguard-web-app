"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth-client";
import { UploadDropzone } from "@/utils/uploadthing";

interface UploadThingFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

const formSchema = z.object({
  orgName: z.string().min(2, "Organization name is required"),
  orgDescription: z.string().min(10, "Description is required"),
  orgLogo: z.string().min(1, "Logo is required"),
});

type UserFormValues = z.infer<typeof formSchema>;

const ClientPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: "",
      orgDescription: "",
      orgLogo: "",
    },
  });

  const orgLogo = form.watch("orgLogo");

  const handleMediaUploadComplete = (res: UploadThingFile[]) => {
    if (res.length > 0) {
      form.setValue("orgLogo", res[0].url);
      toast.success("Logo uploaded successfully");
    }
  };

  const removeImage = () => {
    form.setValue("orgLogo", "");
  };

  const { mutate: generateEmbeddings, isPending } =
    trpc.embeddings.generateOrgEmbeddings.useMutation({
      onSuccess: () => {
        toast.success("Organization profile created successfully!");
        router.push("/dashboard/org");
      },
      onError: (error) => {
        toast.error(`Failed to create organization: ${error.message}`);
      },
    });

  async function onSubmit(values: UserFormValues) {
    if (!session?.user) {
      toast.error("You must be logged in to create an organization.");
      return;
    }

    try {
      await authClient.updateUser({
        orgName: values.orgName,
        orgDescription: values.orgDescription,
        orgLogo: values.orgLogo,
      });
      generateEmbeddings({ orgDescription: values.orgDescription });
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update user:", error);
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Complete Your Organization's Profile
          </AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Complete Your Organization's Profile
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter organization name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orgDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="orgLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Logo</FormLabel>
                  <FormControl>
                    <div>
                      {orgLogo ? (
                        <div className="relative group w-40 h-40">
                          <Image
                            src={orgLogo}
                            alt="Organization Logo"
                            width={160}
                            height={160}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <UploadDropzone
                          className="ut-button:bg-primary ut-label:text-primary"
                          endpoint="singleImageUploader"
                          onClientUploadComplete={handleMediaUploadComplete}
                          onUploadError={(error: Error) => {
                            if (error.message.includes("FileCountMismatch")) {
                              toast.error(
                                "You can only upload up to 1 file at once",
                              );
                            } else {
                              toast.error(`Upload failed: ${error.message}`);
                            }
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClientPage;
