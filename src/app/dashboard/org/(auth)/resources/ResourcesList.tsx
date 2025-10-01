import type { Resource } from "@/db/schema";
import { ResourceCard } from "./ResourceCard";

type ResourcesListProps = {
  resources: Resource[];
};

export function ResourcesList({ resources }: ResourcesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 gap-3">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
