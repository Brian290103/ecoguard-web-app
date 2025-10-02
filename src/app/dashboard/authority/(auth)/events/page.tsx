import { getEvents } from "@/actions/events.actions";
import { SiteHeaderSetter } from "@/app/dashboard/_components/SiteHeaderSetter";
import { EventsList } from "@/app/dashboard/org/(auth)/events/EventsList";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto  flex flex-col gap-3">
      <SiteHeaderSetter title="Authority: Events" />
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Explore and manage your events.</CardDescription>
        </CardHeader>
      </Card>
      <EventsList events={events} />
    </div>
  );
}
