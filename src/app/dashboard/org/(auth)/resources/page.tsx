import { getResources } from "@/actions/resource.actions";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResourcesList } from "./ResourcesList";
import { ResourcesForm } from "./resources-form";
import { SiteHeaderSetter } from "@/app/dashboard/_components/SiteHeaderSetter";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="container mx-auto  flex flex-col gap-3">
      {" "}
      <SiteHeaderSetter title="Organisation: Resources" />
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>
            Explore a variety of resources to enhance your skills and knowledge.
          </CardDescription>

          <CardAction>
            <ResourcesForm />
          </CardAction>
        </CardHeader>
      </Card>
      <ResourcesList resources={resources} />
    </div>
  );
}
