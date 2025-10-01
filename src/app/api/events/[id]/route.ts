import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { events, insertEventsSchema } from "@/db/schema";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const eventList = await db
      .select()
      .from(events)
      .where(eq(events.id, params.id));

    if (eventList.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(eventList[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 },
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await req.json();
    const updatedEvent = insertEventsSchema.partial().parse(body);

    const [result] = await db
      .update(events)
      .set(updatedEvent)
      .where(eq(events.id, params.id))
      .returning();

    revalidatePath(`/events`);
    revalidatePath(`/events/${params.id}`);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await db.delete(events).where(eq(events.id, params.id)).returning();
    revalidatePath("/events");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
};
