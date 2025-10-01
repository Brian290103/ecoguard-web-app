import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const userRole = session?.user.role;
  console.log("userRole", userRole === "authority");
  if (userRole === "admin") {
    redirect("/dashboard/admin");
  } else if (userRole === "org") {
    redirect("/dashboard/org");
  } else if (userRole === "user") {
    redirect("/dashboard/user");
  } else if (userRole === "authority") {
    redirect("/dashboard/authority");
  } else {
    redirect("/dashboard/user");
  }
};

export default DashboardPage;
