import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Resource } from "@/db/schema";
import { DeleteResourceButton } from "./DeleteResourceButton";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card key={resource.id} className="flex flex-col">
      <CardContent>
        {resource.posterUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={resource.posterUrl}
              alt={resource.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </CardContent>
      <CardHeader className="flex-grow">
        <CardTitle>{resource.title}</CardTitle>
        {resource.websiteUrl && (
          <CardDescription>
            <a
              href={resource.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {new URL(resource.websiteUrl).hostname}
            </a>
          </CardDescription>
        )}
      </CardHeader>

      <CardFooter className="pt-0 flex justify-between items-center">
        {resource.websiteUrl && (
          <a
            href={resource.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            Visit Website
          </a>
        )}
        <DeleteResourceButton resourceId={resource.id} />
      </CardFooter>
    </Card>
  );
}
