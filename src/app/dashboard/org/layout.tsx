import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/lib/auth";

const OrgLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "org") {
    redirect("/auth/un-authorized");
  }
  return <>{children}</>;
};

export default OrgLayout;
