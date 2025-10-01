import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { events, insertEventsSchema } from "@/db/schema";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newEvent = insertEventsSchema.parse(body);

    const [createdEvent] = await db.insert(events).values(newEvent).returning();

    revalidatePath("/events");
    return NextResponse.json(createdEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create event",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const allEvents = await db.select().from(events);
    return NextResponse.json(allEvents);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
};
