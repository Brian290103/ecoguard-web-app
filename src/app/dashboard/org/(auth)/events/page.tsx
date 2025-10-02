import { getEvents } from "@/actions/events.actions";
// @ts-expect-error
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventsForm } from "./EventsForm";
import { EventsList } from "./EventsList";
import { SiteHeaderSetter } from "@/app/dashboard/_components/SiteHeaderSetter";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto  flex flex-col gap-3">
      {" "}
      <SiteHeaderSetter title="Organisation: Events" />
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Explore and manage your events.</CardDescription>

          <CardAction>
            <EventsForm />
          </CardAction>
        </CardHeader>
      </Card>
      <EventsList events={events} />
    </div>
  );
}
