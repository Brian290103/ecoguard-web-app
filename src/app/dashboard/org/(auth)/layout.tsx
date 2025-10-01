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
    !session.user.orgName ||
    !session.user.orgDescription ||
    !session.user.orgLogo
  ) {
    redirect("/dashboard/org/complete-profile");
  }
  // if (!session.user.isApproved) {
  // redirect("/dashboard/org/not-approved");
  // }
  return <>{children}</>;
};

export default Layout;
