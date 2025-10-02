import { IconPlant } from "@tabler/icons-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type React from "react";
import { Toaster } from "sonner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  // if (session) {
  //   redirect("/dashboard");
  // }
  return (
    <ScrollArea
      className="relative flex w-full  h-svh flex-col items-center justify-center bg-cover bg-center p-6 md:p-10"
      style={{
        backgroundImage: "url(/images/bg.jpg)",
      }}
    >
      <ScrollBar orientation="vertical" />
      <div className="absolute inset-0 -z-10 bg-black/50" />
      <div className="w-full max-w-sm md:max-w-3xl mx-auto flex flex-col gap-3">
        <div className="w-full  flex items-center justify-center">
          <Link
            href="/"
            className="flex group items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <IconPlant className="size-4" />
            </div>
            <span className="text-muted "> EcoGuard</span>
          </Link>
        </div>

        {children}

        <div className="text-muted *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </ScrollArea>
  );
};

export default AuthLayout;
