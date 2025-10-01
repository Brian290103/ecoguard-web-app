"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import SocialAuth from "../social-auth";

const roles = [
  {
    key: "user",
    value: "Regular User",
    image: "/images/user.png",
    description:
      "Sign up as a regular user to report and track environmental issues",
  },
  {
    key: "authority",
    value: "Authority",
    image: "/images/authority.png",
    description:
      "Sign up as an authority to manage and respond to environmental reports",
  },
  {
    key: "org",
    value: "Organization Representative",
    image: "/images/organization.png",
    description:
      "Sign up as an organization representative to collaborate on environmental initiatives",
  },
] as const;

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters long",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters long",
    }),
    email: z.email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
    role: z.enum(["user", "authority", "org"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords you entered do not match. Please try again.",
    path: ["confirmPassword"],
  });

export const SignUpForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isLoading, setIsLoading] = useState(false);
  const createPrefs =
    trpc.notificationPreferences.createPreferences.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
        callbackURL: "/dashboard",
        role: values.role,
        isApproved: false,
      });

      if (error) {
        console.error("error", error);
        toast.error(error.message);
        return;
      }

      if (data?.user) {
        await createPrefs.mutateAsync({
          userId: data.user.id,
        });
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="overflow-hidden rounded-xl bg-background shadow-lg">
        <div className="w-full p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-4 sm:p-6 md:p-8 flex flex-col gap-6"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className=" text-xl sm:text-2xl font-bold">
                  Create an account
                </h1>
                <p className="text-muted-foreground text-balance">
                  Create an account to get started
                </p>
              </div>

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose your account type</FormLabel>
                    <FormControl>
                      <div className="grid  grid-cols-3 gap-1 sm:gap-4">
                        {roles.map((role) => (
                          <Card
                            key={role.key}
                            className={cn(
                              "cursor-pointer transition-all",
                              field.value === role.key
                                ? "border-primary bg-primary/5 border-2"
                                : "hover:border-primary/50",
                            )}
                            onClick={() => field.onChange(role.key)}
                          >
                            <CardHeader className="flex flex-col items-center">
                              <Image
                                src={role.image}
                                alt={role.value}
                                width={32}
                                height={32}
                              />
                              <CardTitle className="mt-2 text-center text-xs sm:text-sm">
                                {role.value}
                              </CardTitle>
                              <CardDescription className="text-center hidden sm:flex text-xs">
                                {role.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Sign Up"}
              </Button>
              <SocialAuth />
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
