import type { z } from "zod";
import type {
  insertEventsSchema,
  selectEventsSchema,
} from "@/db/schemas/events";

type CreateEvent = z.infer<typeof insertEventsSchema>;
type SelectEvent = z.infer<typeof selectEventsSchema>;

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const createEvent = async (data: CreateEvent): Promise<SelectEvent> => {
  const response = await fetch(`${baseUrl}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getEvents = async (): Promise<SelectEvent[]> => {
  const response = await fetch(`${baseUrl}/api/events`);
  return await response.json();
};

export const getEventById = async (id: string): Promise<SelectEvent> => {
  const response = await fetch(`${baseUrl}/api/events/${id}`);
  return await response.json();
};

export const updateEvent = async (
  id: string,
  data: Partial<CreateEvent>,
): Promise<SelectEvent> => {
  const response = await fetch(`${baseUrl}/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/api/events/${id}`, {
    method: "DELETE",
  });
};
