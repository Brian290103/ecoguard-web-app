import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { db } from "@/db/drizzle";
import {
  community,
  communityUser,
  insertCommunitySchema,
} from "@/db/schemas/community";
import { auth } from "@/lib/auth";

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!,
);

export const POST = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("body", body);

    const newCommunityData = insertCommunitySchema.parse(body);
    console.log("newCommunityData", newCommunityData);

    const [createdCommunity] = await db
      .insert(community)
      .values(newCommunityData)
      .returning();

    await db.insert(communityUser).values({
      communityId: createdCommunity.id,
      userId: session.user.id,
      role: "admin",
    });

    revalidatePath("/dashboard/admin/communities");
    return NextResponse.json(createdCommunity, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create community",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const communities = await db.select().from(community);
    return NextResponse.json(communities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch communities" },
      { status: 500 },
    );
  }
};
