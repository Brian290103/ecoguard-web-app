import { format } from "date-fns";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Event } from "@/db/schema";
import { DeleteEventButton } from "./DeleteEventButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type EventCardProps = {
  event: Event;
};

export async function EventCard({ event }: EventCardProps) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return (
    <Card key={event.id} className="flex flex-col">
      <CardContent>
        {event.posterUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={event.posterUrl}
              alt={event.title}
              // @ts-expect-error
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </CardContent>
      <CardHeader className="flex-grow">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>

      <CardFooter className="pt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Starts: {format(new Date(event.startDateTime), "PPP p")}
          </p>
          <p className="text-sm text-muted-foreground">
            Ends: {format(new Date(event.endDateTime), "PPP p")}
          </p>
        </div>
        {session?.user.role === "org" && (
          <div>
            <DeleteEventButton eventId={event.id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
