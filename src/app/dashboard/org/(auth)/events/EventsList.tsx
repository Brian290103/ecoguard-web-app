import type { Event } from "@/db/schema";
import { EventCard } from "./EventCard";

type EventsListProps = {
  events: Event[];
};

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 gap-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
