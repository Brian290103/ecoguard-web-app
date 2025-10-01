import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { communityUser } from "@/db/schemas/community";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string; userId: string } },
) => {
  try {
    const body = await req.json();
    const result = await db
      .update(communityUser)
      .set({ role: body.role })
      .where(
        and(
          eq(communityUser.communityId, params.id),
          eq(communityUser.userId, params.userId),
        ),
      )
      .returning();
    revalidatePath(`/dashboard/admin/communities/${params.id}`);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update community member" },
      { status: 500 },
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string; userId: string } },
) => {
  try {
    await db
      .delete(communityUser)
      .where(
        and(
          eq(communityUser.communityId, params.id),
          eq(communityUser.userId, params.userId),
        ),
      )
      .returning();
    revalidatePath(`/dashboard/admin/communities/${params.id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove community member" },
      { status: 500 },
    );
  }
};
