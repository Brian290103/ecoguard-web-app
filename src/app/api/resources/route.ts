import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { insertResourcesSchema, resources } from "@/db/schema";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const newResource = insertResourcesSchema.parse(body);

    const [createdResource] = await db
      .insert(resources)
      .values(newResource)
      .returning();

    revalidatePath("/resources");
    return NextResponse.json(createdResource, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create resource",
      },
      { status: 500 },
    );
  }
};

export const GET = async () => {
  try {
    const allResources = await db.select().from(resources);
    return NextResponse.json(allResources);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 },
    );
  }
};
