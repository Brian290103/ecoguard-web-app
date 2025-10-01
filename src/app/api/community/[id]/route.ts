import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import {
  community,
  communityUser,
  insertCommunitySchema,
} from "@/db/schemas/community";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const communityRows = await db
      .select({
        community: community,
        communityUser: communityUser, // Assumed to be imported schema for 'community_users' table
        user: user, // Assumed to be imported schema for 'users' table
      })
      .from(community)
      .leftJoin(communityUser, eq(community.id, communityUser.communityId))
      .leftJoin(user, eq(communityUser.userId, user.id))
      .where(eq(community.id, params.id));

    // Define the type for the final structured data to match db.query.community.findFirst's output type
    type CommunityWithUsers = typeof community.$inferSelect & {
      communityUsers: (typeof communityUser.$inferSelect & {
        user: typeof user.$inferSelect;
      })[];
    };

    let communityData: CommunityWithUsers | null = null;

    if (communityRows.length > 0) {
      const firstRow = communityRows[0];
      // Ensure the community itself was found (i.e., not just nulls from left joins if no community matches)
      if (firstRow.community) {
        communityData = {
          ...firstRow.community,
          communityUsers: [], // Initialize with an empty array
        };

        communityRows.forEach((row) => {
          // Only add if both communityUser and user data exist for this row (from the left joins)
          if (row.communityUser && row.user) {
            communityData!.communityUsers.push({
              ...row.communityUser,
              user: row.user,
            });
          }
        });
      }
    }
    if (!communityData) {
      return NextResponse.json(
        { error: "Community not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(communityData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch community" },
      { status: 500 },
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await req.json();
    const updatedCommunity = insertCommunitySchema.parse(body);
    const result = await db
      .update(community)
      .set(updatedCommunity)
      .where(eq(community.id, params.id))
      .returning();
    revalidatePath(`/dashboard/admin/communities/${params.id}`);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update community" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await db.delete(community).where(eq(community.id, params.id)).returning();
    revalidatePath("/dashboard/admin/communities");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete community" },
      { status: 500 },
    );
  }
};
