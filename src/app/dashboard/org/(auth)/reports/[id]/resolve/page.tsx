import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { serverClient } from "@/app/_trpc/server-client";
import { auth } from "@/lib/auth";
import ResolutionReportClientPage from "./client.page";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth/login");
  }

  const report = await serverClient.report.getReportById({ id: params.id });

  if (!report || report.status !== "claimed") {
    redirect("/dashboard/org/reports");
  }

  return (
    <div>
      <h1>Resolve Report for: {report.title}</h1>
      <ResolutionReportClientPage
        reportId={report.id}
        userId={session.user.id}
      />
    </div>
  );
};

export default Page;
