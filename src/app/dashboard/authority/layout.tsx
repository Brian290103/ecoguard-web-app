import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/lib/auth";

const AuthorityLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "authority") {
    redirect("/auth/un-authorized");
  }
  return <>{children}</>;
};

export default AuthorityLayout;
