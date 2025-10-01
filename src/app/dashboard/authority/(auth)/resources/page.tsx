import { getResources } from "@/actions/resource.actions";
import { ResourcesList } from "@/app/dashboard/org/(auth)/resources/ResourcesList";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="container mx-auto  flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>
            Explore a variety of resources to enhance your skills and knowledge.
          </CardDescription>
        </CardHeader>
      </Card>

      <ResourcesList resources={resources} />
    </div>
  );
}
