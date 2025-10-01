import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/lib/auth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/auth/login");
  }
  if (
    !session.user.phoneNumber ||
    !session.user.county ||
    !session.user.subCounty ||
    !session.user.jobTitle
  ) {
    redirect("/dashboard/authority/complete-profile");
  }
  if (!session.user.isApproved) {
    redirect("/dashboard/authority/not-approved");
  }
  return <>{children}</>;
};

export default Layout;
