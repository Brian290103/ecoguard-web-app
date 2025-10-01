// "use server";

import type { z } from "zod";
import type {
  insertCommunitySchema,
  insertCommunityUserSchema,
  selectCommunitySchema,
  selectCommunityUserSchema,
} from "@/db/schemas/community";

type CreateCommunity = z.infer<typeof insertCommunitySchema>;
type SelectCommunity = z.infer<typeof selectCommunitySchema>;
type CreateCommunityUser = z.infer<typeof insertCommunityUserSchema>;
type SelectCommunityUser = z.infer<typeof selectCommunityUserSchema>;

export const createCommunity = async (
  data: CreateCommunity,
): Promise<SelectCommunity> => {
  const response = await fetch(`/api/community`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getCommunities = async (): Promise<SelectCommunity[]> => {
  const response = await fetch(`/api/community`);
  return await response.json();
};

export const getCommunityById = async (
  id: string,
): Promise<SelectCommunity> => {
  const response = await fetch(`/api/community/${id}`);
  return await response.json();
};

export const updateCommunity = async (
  id: string,
  data: Partial<CreateCommunity>,
): Promise<SelectCommunity> => {
  const response = await fetch(`/api/community/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const deleteCommunity = async (id: string): Promise<void> => {
  await fetch(`/api/community/${id}`, {
    method: "DELETE",
  });
};

export const addCommunityMember = async (
  communityId: string,
  data: Omit<CreateCommunityUser, "communityId">,
): Promise<SelectCommunityUser> => {
  const response = await fetch(`/api/community/${communityId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const getCommunityMembers = async (
  communityId: string,
): Promise<SelectCommunityUser[]> => {
  const response = await fetch(`/api/community/${communityId}/members`);
  return await response.json();
};

export const updateCommunityMember = async (
  communityId: string,
  userId: string,
  role: "admin" | "member",
): Promise<SelectCommunityUser> => {
  const response = await fetch(
    `/api/community/${communityId}/members/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    },
  );
  return await response.json();
};

export const removeCommunityMember = async (
  communityId: string,
  userId: string,
): Promise<void> => {
  await fetch(`/api/community/${communityId}/members/${userId}`, {
    method: "DELETE",
  });
};
