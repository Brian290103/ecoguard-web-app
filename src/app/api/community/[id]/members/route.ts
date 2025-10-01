import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import {
  communityUser,
  insertCommunityUserSchema,
} from "@/db/schemas/community";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const body = await req.json();
    const newMember = insertCommunityUserSchema.parse({
      communityId: params.id,
      ...body,
    });
    const result = await db.insert(communityUser).values(newMember).returning();
    revalidatePath(`/dashboard/admin/communities/${params.id}`);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add member to community" },
      { status: 500 },
    );
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const members = await db.query.communityUser.findMany({
      where: eq(communityUser.communityId, params.id),
      with: {
        user: true,
      },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch community members" },
      { status: 500 },
    );
  }
};
