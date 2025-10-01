import type { z } from "zod";
import type {
  insertResourcesSchema,
  selectResourcesSchema,
} from "@/db/schemas/resources";

type CreateResource = z.infer<typeof insertResourcesSchema>;
type SelectResource = z.infer<typeof selectResourcesSchema>;

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const createResource = async (
  data: CreateResource,
): Promise<SelectResource> => {
  const response = await fetch(`${baseUrl}/api/resources`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getResources = async (): Promise<SelectResource[]> => {
  const response = await fetch(`${baseUrl}/api/resources`);
  return await response.json();
};

export const getResourceById = async (id: string): Promise<SelectResource> => {
  const response = await fetch(`${baseUrl}/api/resources/${id}`);
  return await response.json();
};

export const updateResource = async (
  id: string,
  data: Partial<CreateResource>,
): Promise<SelectResource> => {
  const response = await fetch(`${baseUrl}/api/resources/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteResource = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/api/resources/${id}`, {
    method: "DELETE",
  });
};
