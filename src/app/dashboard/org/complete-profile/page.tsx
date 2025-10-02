import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ClientPage from "./client.page";

const CompleteProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (
    session?.user.orgName &&
    session?.user.orgDescription &&
    session?.user.orgLogo
  ) {
    redirect("/dashboard/org/");
  }

  return (
    <div>
      <ClientPage />
    </div>
  );
};

export default CompleteProfilePage;
