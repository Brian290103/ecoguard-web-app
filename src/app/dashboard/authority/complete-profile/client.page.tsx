"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Alert from "@/components/alert";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { getCurrentLocation } from "../../../../utils/location";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^254[17]\d{8}$/,
      "Phone number must start with 254 followed by 1 or 7 and 8 more digits",
    ),
  county: z.string().min(2, "County is required"),
  subCounty: z.string().min(2, "Sub County is required"),
  jobTitle: z.string().min(2, "Job Title is required"),
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }),
});

interface County {
  name: string;
  sub_counties: string[];
}

const ClientPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [counties, setCounties] = useState<County[]>([]);
  const [subCounties, setSubCounties] = useState<string[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      county: "",
      subCounty: "",
      jobTitle: "",
      location: { lat: 0, long: 0 },
    },
  });

  const watchedCounty = form.watch("county");

  useEffect(() => {
    fetch("/counties.json")
      .then((res) => res.json())
      .then((data) => setCounties(data));
  }, []);

  useEffect(() => {
    if (watchedCounty) {
      const selected = counties.find((c) => c.name === watchedCounty);
      setSubCounties(selected?.sub_counties || []);
      form.resetField("subCounty");
    }
  }, [watchedCounty, counties, form]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { lat, long } = await getCurrentLocation();
        form.setValue("location", { lat, long });
        setLocationError(null);
      } catch (error: any) {
        setLocationError(error.message);
        toast.error(error.message);
      }
    };
    fetchLocation();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.location.lat === 0 && values.location.long === 0) {
      toast.error("Please allow location permission first to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      await authClient.updateUser({
        phoneNumber: values.phoneNumber,
        county: values.county,
        subCounty: values.subCounty,
        jobTitle: values.jobTitle,
        location: values.location,
      });
      setIsOpen(false);
      toast.success("Profile updated successfully");
      router.replace("/dashboard/authority");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update user:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        {locationError && (
          <Alert message={locationError} variant="destructive" />
        )}
        <AlertDialogHeader>
          <AlertDialogTitle>Complete Your Profile</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            Complete Your Profile
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="county"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>County</FormLabel>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? counties.find(
                                  (county) => county.name === field.value,
                                )?.name
                              : "Select a county"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                        <Command>
                          <CommandInput placeholder="Search county..." />
                          <CommandList>
                            <CommandEmpty>No county found.</CommandEmpty>
                            <CommandGroup>
                              {counties.map((county) => (
                                <CommandItem
                                  value={county.name}
                                  key={county.name}
                                  onSelect={(value) => {
                                    form.setValue("county", value);
                                    setPopoverOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      county.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {county.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCounty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub County</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!watchedCounty}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a sub-county" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCounties.map((subCounty) => (
                          <SelectItem key={subCounty} value={subCounty}>
                            {subCounty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || locationError !== null}
            >
              {isSubmitting ? (
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
